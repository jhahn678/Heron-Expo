import { 
    from,
    ApolloClient, 
    InMemoryCache,
    createHttpLink, 
} from "@apollo/client";
import { axios } from "./axios";
import { API_GRAPH_URL } from "@env";
import * as SecureStore from 'expo-secure-store'
import { onError } from '@apollo/client/link/error'
import { TokenResponse } from "../store/auth/useAuth";
import { RetryLink } from "@apollo/client/link/retry";
import { SecureStoreKeys } from "../types/SecureStore";
import { RefreshTokenLink } from "../utils/RefreshTokenLink";
import jwtDecode, { JwtPayload } from "jwt-decode";

const ACCESS_TOKEN_BUFFER = 1000 * 60 // 1 minute
const REFRESH_TOKEN_BUFFER = 1000 * 5 // 5 seconds

const validateTokenExp = (token: string | null, msBuffer: number): boolean => {
    if(token === null) return false
    const { exp } = jwtDecode<JwtPayload>(token)
    if(typeof exp !== 'number') return false;
    const buffer = Date.now() + msBuffer
    const expiration = exp * 1000
    if(buffer > expiration) return false;
    return true;
}

const getAndValidateAccessToken = async (): Promise<string | null> => {
    const token = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
    if(!token) return null
    const valid = validateTokenExp(token, ACCESS_TOKEN_BUFFER)
    if(!valid) return null;
    return token
}

const getAndValidateRefreshToken = async (): Promise<string | null> => {
    const token = await SecureStore.getItemAsync(SecureStoreKeys.REFRESH_TOKEN)
    if(!token) return null
    const valid = validateTokenExp(token, REFRESH_TOKEN_BUFFER)
    if(!valid) return null;
    return token
}

const fetchNewAccessToken = async (token: string): Promise<string | null> => {
    try{
        const { data } = await axios.post<TokenResponse>('/auth/token', { token })
        const { refreshToken, accessToken } = data;
        await SecureStore.setItemAsync(SecureStoreKeys.REFRESH_TOKEN, refreshToken)
        await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, accessToken)
        return accessToken
    }catch(err){
        await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
        await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN)
        console.warn('AUTHLINK: refresh failure', err)
        return null
    }
}

const tokenLink = new RefreshTokenLink({
    fetchNewAccessToken,
    getAndValidateAccessToken,
    getAndValidateRefreshToken
})

const httpLink = createHttpLink({ uri: API_GRAPH_URL });

const errorLink = onError(({ graphQLErrors }) => {
    if(graphQLErrors){    
        graphQLErrors.forEach(x => {
            console.log({ graphQLError: x.extensions.code })
        })
    }
})

export const apolloClient = new ApolloClient({
    link: from([errorLink, tokenLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    waterbodies: {
                        keyArgs: [
                            'sort',
                            'value', 
                            'adminOne', 
                            'queryLocation', 
                            'classifications'
                        ],
                        merge: (existing = [], incoming) => {
                            return [...existing, ...incoming];
                        }
                    }
                }
            },
            Waterbody: {
                fields: {
                    classification: {
                        read(value){
                            if(value){
                                return value.charAt(0).toUpperCase() + value.slice(1)
                            }
                        }
                    }
                }
            }
        }
    })
})
