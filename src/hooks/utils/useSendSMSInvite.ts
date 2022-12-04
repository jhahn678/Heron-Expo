import { useState, useEffect } from 'react'
import { isAvailableAsync, sendSMSAsync } from 'expo-sms'

interface UseSendSMSObj {
    sendSMSInvite: (phoneNumber: number | string) => Promise<void>
}

export const useSendSMSInvite = (): UseSendSMSObj => {

    const [isAvailable, setIsAvailable] = useState(false)

    useEffect(() => {
        if(!isAvailable){
            isAvailableAsync()
                .then(res => setIsAvailable(res))
                .catch(err => console.error(err))
        }
    },[])

    const sendSMSInvite = async (phoneNumber: number | string ) => {
        sendSMSAsync(phoneNumber.toString(), "Here's an invite to join me on Heron!")
            .catch((err) => console.error(err))
    }

    return {
        sendSMSInvite
    }
}