import { useState, useEffect } from 'react'
import { isAvailableAsync, sendSMSAsync } from 'expo-sms'

interface UseSendSMSObj {
    sendSMSInvite: (phoneNumber: number | string) => Promise<void>
}

export const useSendSMSInvite = (): UseSendSMSObj => {

    const [isAvailable, setIsAvailable] = useState(false)

    useEffect(() => {
        if(!isAvailable){
            (async () => {
                const result = await isAvailableAsync()
                setIsAvailable(result)
            })()
        }
    },[])

    const sendSMSInvite = async (phoneNumber: number | string ) => {
        await sendSMSAsync(phoneNumber.toString(), "Here's an invite to join me on Mayfly!")
    }

    return {
        sendSMSInvite
    }
}