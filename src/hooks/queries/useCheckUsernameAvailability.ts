import { useState, useEffect } from "react";
import { axios } from "../../config/axios";
import * as yup from 'yup'

interface UsernameState {
    /** If input has been used yet */
    touched: boolean, 
    /** If check username query is in progress */
    loading: boolean, 
    /** If check username query returns avaiable */
    available: boolean, 
    /** If input is valid username */
    valid: boolean, 
    /** If query returns error */
    error: boolean
}

interface CheckUsernameAvailabilityRes {
    username: string,
    available: boolean
}

/**
 * @param username
 * #### Best order to check result in
 * - loading
 * - touched
 * - error
 * - valid
 * - available
 */ 
export const useCheckUsernameAvailability = (value: string): UsernameState => {

    const schema = yup.string().trim().min(6).max(36)
 
    const [valid, setValid] = useState(false)
    const [error, setError] = useState(false)
    const [touched, setTouched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [available, setAvailable] = useState(false) 

    const queryUsername = async (username: string) => {
        const { data } = await axios.get<CheckUsernameAvailabilityRes>(
            `/auth/username?username=${username}`);
        return data;
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if(value.length) setTouched(true)
            if(schema.isValidSync(value)){
                try{
                    setLoading(true)
                    const { available } = await queryUsername(value);
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
    },[value])

    return { touched, loading, available, valid, error }
}