import { useEffect, useState } from "react";

interface Args {
    input: string
    delay?: number
}

export const useThrottleInputValue = ({ input, delay=500 }: Args): string => {
    
    const [value, setValue] = useState('')
    const [isThrottling, setIsThrottling] = useState(false)

    useEffect(() => {
        if(input.length > 0 && !isThrottling){
            setValue(input)
            setIsThrottling(true)
            setTimeout(() => {
                setIsThrottling(false)
            }, delay)
        }
    },[input])
    
    return value; 
}