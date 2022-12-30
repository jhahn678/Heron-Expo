import create from 'zustand'
import { axios } from '../../config/axios'
import * as SecureStore from 'expo-secure-store'
import { SecureStoreKeys } from '../../types/SecureStore'

export interface TokenResponse {
    accessToken: string,
    refreshToken: string, 
}

export interface AuthResponse extends TokenResponse{
    id: number,
    bio: string | null
    city: string | null
    state: string | null
    avatar: string | null, 
    username: string,
    lastname: string | null 
    firstname: string | null,
}

export interface AuthStore {
    id: number | null
    bio: string | null
    city: string | null
    state: string | null
    avatar: string | null
    username: string | null
    lastname: string | null
    firstname: string | null
    isAuthenticated: boolean,
    setUser: (data: AuthResponse, isAuthenticated?: boolean) => Promise<void>,
    setDetails: (args: { firstname?: string, username?: string, avatar?: string }) => void,
    setAuthenticated: (authenticated: boolean) => void
    /**
     * ### Function for logging user out
     * Pulls refresh token from SecureStore and calls API to have it removed from DB.
     * Removes tokens from SecureStore and resets auth state
     * #### Makes call to API to delete refresh token
     */
    signOut: () => Promise<void>,
    /**
     * Takes a refresh token and calls to API to get a new pair of tokens
     * @param token refreshToken 
     * @success Stores access and refresh token in SecureStore - sets authentication
     * @failure Removes access and refresh token from SecureStore
     */
    autoSignIn: (token: string) => Promise<void>,
    /**
     * ### Function for non graphql related authenticated requests
     * When invoked will pull access token from SecureStore
     * @success Returns access token - updates SecureStore if token was refreshed
     * @failure Clears SecureStore, set authenticated to false, and return null 
     * @returns Either an access token on success or null if unsuccessful
     */
    getAccessToken: () => Promise<string | null>,
    /**
     * ### Function for non graphql related authenticated requests
     * When invoked will attempt to refresh access token with the stored refresh token
     * @success will update SecureStore and return access token
     * @failure will update SecureStore, set authenticated to false, and return null 
     * @returns Either an access token on success or null if unsuccessful
     */
    refreshAccessToken: () => Promise<string | null>,
    /**
     * ### Function for resetting authentication store
     * - Removes tokens from secure store but does not make any API calls
     * - Originally added to be used after user deletes account since 
     * PostgreSQL delete cascades to refresh token 
     * #### Does not make logout API call
     * - For normal logout functionality use store.signOut
     */
    resetAuth: () => Promise<void>,
}


export const useAuth = create<AuthStore>((set) => ({
    id: null,
    bio: null,
    city: null,
    state: null,
    avatar: null,
    username: null,
    lastname: null,
    firstname: null,
    isAuthenticated: false,
    setUser: async (data: AuthResponse, isAuthenticated=true) => {
        const { accessToken, refreshToken, ...user } = data;
        await SecureStore.setItemAsync(SecureStoreKeys.REFRESH_TOKEN, refreshToken)
        await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, accessToken)
        set({ isAuthenticated, ...user })
    },
    setAuthenticated: isAuthenticated => set({ isAuthenticated }),
    setDetails: details => set({ ...details }),
    signOut: async () => {
        try{
            const refreshToken = await SecureStore.getItemAsync(SecureStoreKeys.REFRESH_TOKEN)
            if(refreshToken) await axios.delete('/auth/token', { data: { refreshToken } })
            await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
            await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN)
        }catch(err){
            console.error('Sign out failed', err);
        }finally{
            set({
                id: null,
                bio: null,
                city: null,
                state: null,
                avatar: null,
                username: null,
                lastname: null,
                firstname: null,
                isAuthenticated: false
            })
        }
    },
    autoSignIn: async (token: string) => {
        try{
            const { data } = await axios
                .post<AuthResponse>('/auth/token', { token, includeUser: true })
            const { accessToken, refreshToken, ...user } = data;
            await SecureStore.setItemAsync(SecureStoreKeys.REFRESH_TOKEN, refreshToken)
            await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, accessToken)
            set({ isAuthenticated: true, ...user })
        }catch(err){
            console.error('auto sign in failed', err);
            await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
            await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN)
        }
    },
    getAccessToken: async () => {
        try{
            const existing = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            if(existing) return existing;
            const token = await SecureStore.getItemAsync(SecureStoreKeys.REFRESH_TOKEN)
            const { data } = await axios.post<TokenResponse>('/auth/token', { token })
            const { refreshToken, accessToken } = data;
            await SecureStore.setItemAsync(SecureStoreKeys.REFRESH_TOKEN, refreshToken)
            await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, accessToken)
            return data.accessToken
        }catch(err){
            await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
            console.error('error getting/refreshing access token', err)
            set({ isAuthenticated: false })
            return null;
        }
    },
    refreshAccessToken:  async (): Promise<string | null> => {
        try{
            const token = await SecureStore.getItemAsync(SecureStoreKeys.REFRESH_TOKEN)
            if(!token) throw new Error('No refresh token available')
            const { data } = await axios.post<TokenResponse>('/auth/token', { token })
            await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, data.accessToken)
            await SecureStore.setItemAsync(SecureStoreKeys.REFRESH_TOKEN, data.refreshToken)
            return data.accessToken;
        }catch(err){
            console.error('error refreshing access token', err)
            await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
            set({ isAuthenticated: false })
            return null;
        }
    },
    resetAuth: async () => {
        try{
            await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
        }catch(err){
            console.error('error removing items from secure store', err)
        }finally{
            set({
                id: null,
                bio: null,
                city: null,
                state: null,
                avatar: null,
                username: null,
                lastname: null,
                firstname: null,
                isAuthenticated: false
            })
        }
    }
}))
