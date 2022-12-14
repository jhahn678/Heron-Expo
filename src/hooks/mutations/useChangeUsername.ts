import Axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { axios } from '../../config/axios'
import { SecureStoreKeys } from '../../types/SecureStore'
import * as SecureStore from 'expo-secure-store'

interface ChangeUsernameRes {
    id: number
    username: string
}

interface Args {
    onSuccess: (res: ChangeUsernameRes) => void
    onError: (err: AxiosError) => void
}

export const useChangeUsername = ({ onSuccess, onError }: Args) => {

    const [loading, setLoading] = useState(false)

    const changeUsername = async (username: string) => {
        try{
            setLoading(true)
            const accessToken = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            const res = await axios.post<ChangeUsernameRes>('/auth/change-username', { username }, {
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

    return { changeUsername, loading }
}