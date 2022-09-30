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
    firstname: string,
    username: string, 
    avatar: string, 
}

export interface AuthStore {
    id: number | null
    firstname: string | null
    username: string | null
    avatar: string | null
    isAuthenticated: boolean,
    setUser: (data: AuthResponse) => Promise<void>,
    signOut: () => Promise<void>,
    autoSignIn: (token: string) => Promise<void>,
    getAccessToken: () => Promise<string | null>,
    refreshAccessToken: () => Promise<string | null>,
    setDetails: (args: { firstname?: string, username?: string, avatar?: string }) => void
}


export const useAuth = create<AuthStore>((set) => ({
    id: null,
    firstname: null,
    username: null,
    avatar: null,
    isAuthenticated: false,
    setUser: async (data: AuthResponse) => {
        const { accessToken, refreshToken, ...user } = data;
        await SecureStore.setItemAsync(SecureStoreKeys.REFRESH_TOKEN, refreshToken)
        await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, accessToken)
        set({ isAuthenticated: true, ...user })
    },
    setDetails: details => set({ ...details }),
    signOut: async () => {
        await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
        await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN)
        set({
            id: null,
            avatar: null,
            username: null,
            firstname: null,
            isAuthenticated: false
        })
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
    /**
     * ### Function for non graphql related authenticated requests
     * When invoked will attempt to refresh access token with the stored refresh token
     * @success will update SecureStore and return access token
     * @failure will update SecureStore, set authenticated to false, and return null 
     * @returns Either an access token on success or null if unsuccessful
     */
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
}
}))