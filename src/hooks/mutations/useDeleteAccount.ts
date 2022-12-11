import Axios, { AxiosError } from "axios"
import { useState } from "react"
import { axios } from "../../config/axios"
import * as SecureStore from 'expo-secure-store'
import { SecureStoreKeys } from "../../types/SecureStore"

interface Args {
    onSuccess: () => void
    onError: (err: AxiosError) => void
}

export const useDeleteAccount = ({ onError, onSuccess }: Args) => {

    const [loading, setLoading] = useState(false)

    const deleteAccount = async () => {
        setLoading(true)
        try{
            const accessToken = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN) 
            const res = await axios.delete<{ message: string }>('/auth/delete-account', { 
                headers: { "Authorization": `Bearer ${accessToken}`}
            })
            onSuccess()
            return res.data;
        }catch(err){
            if(Axios.isAxiosError(err)) onError(err)
        }finally{
            setLoading(false)
        }
    }

    return { deleteAccount, loading }
}