import { axios } from '../../config/axios'
import * as SecureStore from 'expo-secure-store'
import { SecureStoreKeys } from '../../types/SecureStore'
import { useState } from 'react'
import { useModalStore } from '../../store/modal/useModalStore'

interface Args {
    onSuccess: () => void
    onError: () => void
}

export const useAddAccountPassword = (args: Args) => {

    const showAuthModal = useModalStore(store => store.setReauthenticate)

    const [loading, setLoading] = useState(false)

    const addAccountPassword = async (password: string) => {
        try{
            setLoading(true)
            const token = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            if(!token){
                setLoading(false)
                return showAuthModal(true)
            }
            await axios.post('/auth/add-password',{ password }, {
                headers: { 'Authorization': `Bearer ${token}`},
            })
            setLoading(false)
            args.onSuccess()
        }catch(err){
            setLoading(false)
            console.error('useUnlinkSocial', err)
            args.onError()
        }
    }

    return { loading, addAccountPassword }
}