import create from 'zustand'
import { axios } from '../../config/axios'
import * as SecureStore from 'expo-secure-store'

interface Credentials {
    identifier: string | number,
    password: string
}

export interface AuthResponse {
    id: number
    token: string, 
    firstname: string
    username: string
    avatar: string
}

export interface AuthStore {
    id: number | null
    firstname: string | null
    username: string | null
    avatar: string | null
    token: string | null
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
    token: null,
    isAuthenticated: false,
    setUser: async (data: AuthResponse) => {
        await SecureStore.setItemAsync('AUTH_TOKEN', data.token)
        set({ isAuthenticated: true, ...data})
    },
    signOut: async () => {
        await SecureStore.deleteItemAsync('AUTH_TOKEN')
        set({
            id: null,
            firstname: null,
            username: null,
            avatar: null,
            token: null,
            isAuthenticated: false
        })
    },
    autoSignIn: async (token: string) => {
        const res = await axios.get<AuthResponse>('/auth', {
            headers: {
            'authorization': `Bearer ${token}`
            }
        })
        const { data } = res;
        await SecureStore.setItemAsync('AUTH_TOKEN', data.token)
        set({ isAuthenticated: true, ...data })
    }
}))