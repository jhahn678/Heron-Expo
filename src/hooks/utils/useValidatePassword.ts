import * as yup from 'yup'
import { useState, useEffect } from 'react'

export const useValidatePassword = (value: string): Boolean => {

    const [isValid, setIsValid] = useState(false)
    const schema = yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)

    useEffect(() => {
        const timer = setTimeout(async () => {
            const result = await schema.isValid(value)
            setIsValid(result)
        }, 300)

        return () => clearTimeout(timer)
    }, [value])

    return isValid;
}