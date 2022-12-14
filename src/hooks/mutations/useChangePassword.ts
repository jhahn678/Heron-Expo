import Axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { axios } from '../../config/axios'
import * as SecureStore from 'expo-secure-store'
import { SecureStoreKeys } from '../../types/SecureStore'

interface Args {
    onSuccess: () => void
    onError: (err: AxiosError) => void
}

export const useChangePassword = ({ onSuccess, onError }: Args) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const changePassword = async (password: string) => {
        setLoading(true)
        try{
            const accessToken = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN) 
            await axios.post("/auth/change-password", { password }, { 
                headers: { "Authorization": `Bearer ${accessToken}`} 
            })
            onSuccess()
        }catch(err){
            setError(true)
            if(Axios.isAxiosError(err)) onError(err)
        }finally{
            setLoading(false)
        }
    }

    return { error, loading, changePassword }

}