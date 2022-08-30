import { axios } from "../../config/axios";
import { useState, useEffect } from 'react'
import * as yup from 'yup'

interface CheckEmailAvailabilityRes {
    email: string,
    available: boolean
}

export const useCheckEmailAvailability = (value: string) => {
    const [isAvailable, setIsAvailable] = useState<Boolean | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const schema = yup.string().email()

    const queryEmail = async (email: string) => {
        const res = await axios.get<CheckEmailAvailabilityRes>(`/auth/email?email=${email}`)
        return res.data;
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if(schema.isValidSync(value)){
                setIsLoading(true)
                try{
                    const { available } = await queryEmail(value)
                    setIsLoading(false)
                    setIsAvailable(available)
                }catch(err){
                    setIsLoading(false)
                    setIsError(true)
                }
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [value])

    return {
        isAvailable,
        isLoading,
        isError
    }
}