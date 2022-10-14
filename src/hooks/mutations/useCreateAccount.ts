import { useState } from 'react'
import { axios } from '../../config/axios'
import { AuthResponse, useAuth } from '../../store/auth/useAuth'

interface CreateAccountParams {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    city: string | undefined
    state: string | undefined
    bio: string | undefined
}

export const useCreateAccount = () => {

    const setUser = useAuth(store => store.setUser)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const createAccount = async (params: CreateAccountParams): Promise<AuthResponse | void> => {
        setIsLoading(true)
        try{
            const { data } = await axios.post<AuthResponse>('/auth/register', params)
            setUser(data); 
            setIsLoading(false); 
            return data;
        }catch(err){
            console.log(err)
            setIsLoading(false)
            setIsError(true)
        }
    }

    return {
        createAccount,
        isLoading,
        isError
    }
}