import Axios, { AxiosError } from "axios"
import { useState } from "react"
import { axios } from "../../config/axios"

interface Args {
    onSuccess: () => void
    onError: (err: AxiosError<unknown, any>) => void
}

interface ResetPasswordArgs {
    token: string
    password: string
}

export const useResetPassword = ({ onSuccess, onError }: Args) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const resetPassword = async (args: ResetPasswordArgs) => {
        try{
            await axios.post("/auth/reset-password", args)
            onSuccess()
        }catch(err){
            setError(true)
            if(Axios.isAxiosError(err)){
                onError(err)
            }
        }finally{
            setLoading(false)
        }
    }

    return { resetPassword, loading, error }
}
