import { 
    ApolloClient, 
    createHttpLink, 
    InMemoryCache,
    from
} from "@apollo/client";
import { onError } from '@apollo/client/link/error'
import { setContext } from "@apollo/client/link/context";
import { API_GRAPH_URL } from "@env";
import * as SecureStore from 'expo-secure-store'
import { SecureStoreKeys } from "../types/SecureStore";
import { axios } from "./axios";
import { TokenResponse } from "../store/auth/useAuth";

const httpLink = createHttpLink({ uri: API_GRAPH_URL });

const authLink = setContext(async (_, { headers }) => {
    const accessToken = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : null
        }
    }
})

const onErrorLink = onError(({ 
    graphQLErrors, operation, forward 
}) => {
    if(graphQLErrors){
        graphQLErrors.forEach(x => console.log('gql error', x.extensions.code))
        for(let err of graphQLErrors){
            if(err.extensions.code === "ACCESS_TOKEN_EXPIRED"){
                operation.setContext(async () => {
                    const headers = operation.getContext().headers;
                    try{
                        const token = await SecureStore.getItemAsync(SecureStoreKeys.REFRESH_TOKEN)
                        if(!token) throw new Error('Refresh token not stored')
                        const { data } = await axios.post<TokenResponse>('/auth/token', { token })
                        const { refreshToken, accessToken } = data;
                        await SecureStore.setItemAsync(SecureStoreKeys.REFRESH_TOKEN, refreshToken)
                        await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, accessToken)
                        return { headers: { ...headers, authorization: `Bearer ${accessToken}` } }
                    }catch(err){
                        console.error(err)
                        //Should be an extremely rare occurence -- refresh token expired after app launch
                        console.warn('Access token refresh failed via Apollo Client')
                        await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN)
                        await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
                        return { headers: { ...headers, authorization: null } }
                    }
                })
                return forward(operation)
            }
        }
    }
})

export const apolloClient = new ApolloClient({
    link: from([onErrorLink, authLink, httpLink]),
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
                            return value.charAt(0).toUpperCase() + value.slice(1)
                        }
                    }
                }
            }
        }
    })
})