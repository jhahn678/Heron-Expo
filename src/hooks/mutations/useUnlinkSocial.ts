import { axios } from '../../config/axios'
import * as SecureStore from 'expo-secure-store'
import { SecureStoreKeys } from '../../types/SecureStore'
import { useState } from 'react'
import { LinkedAccount } from '../../types/User'
import { useModalStore } from '../../store/modal/useModalStore'

interface Args {
    onSuccess: () => void
    onError: () => void
}

export const useUnlinkSocial = (args: Args) => {

    const showAuthModal = useModalStore(store => store.setReauthenticate)

    const [loading, setLoading] = useState(false)

    const unlinkAccount = async (account: LinkedAccount) => {
        try{
            setLoading(true)
            const token = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            if(!token){
                setLoading(false)
                return showAuthModal(true)
            }
            await axios.post('/auth/unlink-account', { account }, {
                headers: { 'Authorization': `Bearer ${token}`}
            })
            setLoading(false)
            args.onSuccess()
        }catch(err){
            setLoading(false)
            console.error('useUnlinkSocial', err)
            args.onError()
        }
    }

    return { loading, unlinkAccount }
}