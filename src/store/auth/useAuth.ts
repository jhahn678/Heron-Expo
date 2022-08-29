import { API_BASE_URL } from '@env'
import create from 'zustand'
import { axios } from '../../config/axios'
import * as SecureStore from 'expo-secure-store'

interface Credentials {
    identifier: string | number,
    password: string
}

interface AuthResponse {
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
    signIn: (credentials: Credentials) => Promise<void>
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
    signIn: async (credentials: Credentials) => {
        try{
            const res = await axios.post<AuthResponse>('/auth/login', credentials)
            const { data } = res;
            await SecureStore.setItemAsync('AUTH_TOKEN', data.token)
            set({ isAuthenticated: true, ...data })
        }catch(err){
            alert('Could not authenticate')
        }
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