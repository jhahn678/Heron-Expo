import { useState, useEffect } from "react";
import { axios } from "../../config/axios";


interface CheckUsernameAvailabilityRes {
    username: string,
    available: boolean
}

export const useCheckUsernameAvailability = (value: string) => {

    const [isAvailable, setIsAvailable] = useState<boolean | null>(null) 
    const [touched, setTouched] = useState(false)
    const [isLoading, setIsLoading] = useState(false) 
    const [isError, setIsError] = useState(false) 

    const queryUsername = async (username: string) => {
        const result = await axios.get<CheckUsernameAvailabilityRes>(`/auth/username?username=${username}`)
        return result.data;
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if(value.length > 5){
                setTouched(true)
                setIsLoading(true)
                try{
                    const { available } = await queryUsername(value);
                    setIsAvailable(available)
                    setIsLoading(false)
                    setIsError(!available)
                }catch(err){
                    setIsAvailable(null)
                    setIsLoading(false)
                    setIsError(true)
                }
            }else if(touched){
                setIsAvailable(null)
                setIsError(true)
            }else{
                setIsAvailable(null)
            }
        }, 500)

        return () => clearTimeout(timer)
    },[value])

    return {
        isAvailable,
        isLoading,
        isError
    }
}