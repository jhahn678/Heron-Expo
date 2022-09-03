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
    signOut: () => void,
    autoSignIn: (token: string) => Promise<void>
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
            await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
            await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            console.error(err)
        }
        
    }
}))