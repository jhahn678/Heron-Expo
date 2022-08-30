import { useState } from 'react'
import { axios } from '../../config/axios'
import { AuthResponse } from '../../store/auth/useAuth'

interface useCreateAccountArgs {
    onSuccess: (res: AuthResponse) => void,
    onError: (err: unknown) => void
}

interface CreateAccountParams {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
}

export const useCreateAccount = ({ onSuccess, onError}: useCreateAccountArgs) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const createAccount = async (params: CreateAccountParams): Promise<AuthResponse | void> => {
        setIsLoading(true)
        axios.post<AuthResponse>('/auth/register', {
            firstname: params.firstName,
            lastname: params.lastName,
            username: params.username,
            email: params.email,
            password: params.password
        }).then(({ data }) => {
            setIsLoading(false)
            onSuccess(data)
            return data;
        }).catch(err => {
            setIsLoading(false)
            setIsError(true)
            onError(err)
        })
    }

    return {
        createAccount,
        isLoading,
        isError
    }
}