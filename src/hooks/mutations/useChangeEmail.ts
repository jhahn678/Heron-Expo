import Axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { axios } from '../../config/axios'
import { SecureStoreKeys } from '../../types/SecureStore'
import * as SecureStore from 'expo-secure-store'

interface ChangeEmailRes {
    id: number
    email: string
}

interface Args {
    onSuccess: (res: ChangeEmailRes) => void
    onError: (err: AxiosError) => void
}

export const useChangeEmail = ({ onSuccess, onError }: Args) => {

    const [loading, setLoading] = useState(false)

    const changeEmail = async (email: string) => {
        try{
            setLoading(true)
            const accessToken = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            const res = await axios.post<ChangeEmailRes>('/auth/change-email', { email }, {
                headers: { "Authorization": `Bearer ${accessToken}`} 
            })
            onSuccess(res.data)
            return res.data;
        }catch(err){
            if(Axios.isAxiosError(err)) onError(err)
        }finally{
            setLoading(false)
        }
    }

    return { changeEmail, loading }
}