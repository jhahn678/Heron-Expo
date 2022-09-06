import { axios } from "../../config/axios";
import { AuthResponse } from "../../store/auth/useAuth";
import { useState } from 'react'

interface UseLoginArgs {
    onSuccess: (data: AuthResponse) => void,
    onError: (err: any) => void
}

interface LoginParams {
    identifier: string,
    password: string
}

export const useLogin = ({ onSuccess, onError}: UseLoginArgs) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const loginUser = async (params: LoginParams): Promise<AuthResponse | void> => {
        setIsLoading(true)
        
        axios.post<AuthResponse>('/auth/login', params)
            .then(({ data }) => {
                setIsLoading(false)
                onSuccess(data)
                return data;
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
                setIsError(true)
                onError(err)
            })
        
    }

    return {
        loginUser,
        isLoading,
        isError
    }

}

