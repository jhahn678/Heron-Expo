import { axios } from "../../config/axios";
import { SecureStoreKeys } from "../../types/SecureStore";
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

interface Args {
    onError: () => void
}

export const useCheckAccountHasPassword = ({ onError }: Args) => {

    const focused = useIsFocused()
    const [hasPassword, setHasPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        (async (): Promise<{ hasPassword: boolean } | void> => {
            try{
                setLoading(true)
                const token = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
                const res = await axios.get<{ hasPassword: boolean }>('/auth/has-password', {
                    headers: { 'Authorization': `Bearer ${token}`}
                })
                setLoading(false); setError(false); setSuccess(true)
                setHasPassword(res.data.hasPassword)
            }catch(err){
                setLoading(false); setError(true); 
                setSuccess(false); setHasPassword(false)
                console.error('useCheckAccountHasPassword', err)
                onError()
            }
        })()
    },[focused])

    return { hasPassword, loading, success, error }

}