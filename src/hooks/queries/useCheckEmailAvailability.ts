import { axios } from "../../config/axios";
import { useState, useEffect } from 'react'
import * as yup from 'yup'

interface CheckEmailAvailabilityRes {
    email: string,
    valid: boolean,
    available: boolean
}

export const useCheckEmailAvailability = (value: string) => {

    const [isAvailable, setIsAvailable] = useState<Boolean | null>(null)
    const [touched, setTouched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const schema = yup.string().min(8).email()

    const queryEmail = async (email: string) => {
        const res = await axios.get<CheckEmailAvailabilityRes>(`/auth/email?email=${email}`)
        return res.data;
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if(schema.isValidSync(value)){
                setIsLoading(true)
                setTouched(true)
                try{
                    const res = await queryEmail(value)
                    setIsLoading(false)
                    setIsAvailable(res.available)
                    setIsError(!res.valid)
                }catch(err){
                    setIsLoading(false)
                    setIsAvailable(null)
                    setIsError(true)
                }
            }else if(touched){
                setIsError(true)
                setIsAvailable(null)
            }else{
                setIsAvailable(null)
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