import { useState } from 'react'
import { axios } from "../../config/axios";

export const useForgotPassword = () => {

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const forgotPassword = async (email: string) => {
        try{
            setLoading(true)
            const { data } = await axios.post('/auth/forgot-password', { email })
            return data;
        }catch(err){
            setError(true)
        }finally{
            setLoading(false)
        }
    }
    
    return { forgotPassword, loading, error }
}