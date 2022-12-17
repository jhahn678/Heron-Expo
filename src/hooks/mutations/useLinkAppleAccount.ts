import { AxiosError } from 'axios';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store'
import { axios } from '../../config/axios';
import { useModalStore } from '../../store/modal/useModalStore';
import { RestError } from '../../types/errors';
import { SecureStoreKeys } from '../../types/SecureStore';

export const useLinkAppleAccount = (args: { onSuccess: () => void }) => {

    const setSnack = useModalStore(store => store.setSnack)

    const promptAppleLogin = async () => {
        try{
            const available = await AppleAuthentication.isAvailableAsync()
            if(!available) return setSnack('Something went wrong..');
            const token = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            const { user } = await AppleAuthentication.signInAsync()
            await axios.post("/auth/link/apple", { apple_id: user }, 
                { headers: { "Authorization": `Bearer ${token}` }}
            );
            args.onSuccess()
        }catch(err){
            console.error(err)
            const error = err as AxiosError<RestError>;
            if(error?.response?.data?.code === 'APPLE_ACCOUNT_IN_USE'){
                setSnack("This Apple account is already in use")
            }else{
                setSnack("Something went wrong..")
            }
        }
    }

    return { promptAppleLogin }
}