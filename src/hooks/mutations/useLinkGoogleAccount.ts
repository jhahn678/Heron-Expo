import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'
import { axios } from '../../config/axios'
import { AxiosError } from 'axios'
import { RestError } from '../../types/errors'
import * as SecureStore from 'expo-secure-store'
import { AuthSessionResult } from 'expo-auth-session'
import { SecureStoreKeys } from '../../types/SecureStore'
import * as Google from 'expo-auth-session/providers/google'
import { useModalStore } from '../../store/modal/useModalStore'
import { 
  GOOGLE_ANDROID_CLIENT_ID, 
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID, 
  GOOGLE_WEB_CLIENT_ID
} from "@env"

WebBrowser.maybeCompleteAuthSession()

export const useLinkGoogleAccount = (args: { onSuccess: () => void }) => {

    const setSnack = useModalStore(store => store.setSnack)
 
    const [request, response, promptGoogleLogin] = Google.useAuthRequest({
        expoClientId: GOOGLE_EXPO_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        webClientId: GOOGLE_WEB_CLIENT_ID
    });

    const handleGoogleAuthRequest = async (result: AuthSessionResult) => {
        if(result.type === 'success'){  
            if(!result.authentication) return;
            const { accessToken } = result.authentication;
            try{
                const token = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
                await axios.post("/auth/link/google", { accessToken },
                    { headers: { "Authorization": `Bearer ${token}`} }
                );
                args.onSuccess();
            }catch(err){
                console.error(err)
                const error = err as AxiosError<RestError>;
                if(error?.response?.data?.code === "GOOGLE_ACCOUNT_IN_USE"){
                    setSnack("This Google account is already in use")
                }else{
                    setSnack("Something went wrong..")
                }
            }

        }
    }

    useEffect(() => {
        if(response) handleGoogleAuthRequest(response)
    }, [response]);

    
    return { promptGoogleLogin };
}