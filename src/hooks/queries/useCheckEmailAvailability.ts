import { axios } from "../../config/axios";
import { useState, useEffect } from 'react'
import * as yup from 'yup'

interface CheckEmailAvailabilityRes {
    email: string,
    available: boolean
}

interface EmailState {
    /** If input has been used yet */
    touched: boolean, 
    /** If check email query is in progress */
    loading: boolean, 
    /** If check email query returns avaiable */
    available: boolean, 
    /** If input is valid email */
    valid: boolean, 
    /** If query returns error */
    error: boolean
}

/**
 * @param email
 * #### Best order to check result in
 * - loading
 * - touched
 * - error
 * - valid
 * - available
 */ 
export const useCheckEmailAvailability = (value: string): EmailState => {

    const [error, setError] = useState(false)
    const [valid, setValid] = useState(false)
    const [touched, setTouched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [available, setAvailable] = useState(false)

    const schema = yup.string().trim().min(8).email()

    const queryEmail = async (email: string) => {
        const { data } = await axios.get<CheckEmailAvailabilityRes>(
            `/auth/email?email=${email}`);
        return data;
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if(value.length) setTouched(true);
            if(schema.isValidSync(value)){
                try{
                    setLoading(true)
                    const { available } = await queryEmail(value)
                    setAvailable(available)
                    setError(false)
                }catch(err){
                    setError(true)
                    setAvailable(false)
                }finally{
                    setValid(true)
                    setLoading(false)
                }
            }else{
                setError(false)
                setValid(false)
                setAvailable(false)
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [value])

    return { touched, loading, valid, available, error }
}