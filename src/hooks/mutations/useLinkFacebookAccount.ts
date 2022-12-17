import * as WebBrowser from 'expo-web-browser'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { AuthSessionResult, ResponseType } from 'expo-auth-session';
import { useEffect } from 'react';
import { useModalStore } from '../../store/modal/useModalStore';
import { FACEBOOK_CLIENT_ID } from '@env'
import { SecureStoreKeys } from '../../types/SecureStore';
import { axios } from '../../config/axios';
import * as SecureStore from 'expo-secure-store'
import { AxiosError } from 'axios';
import { RestError } from '../../types/errors';

WebBrowser.maybeCompleteAuthSession();

export const useLinkFacebookAccount = (args: { onSuccess: () => void }) => {

    const setSnack = useModalStore(store => store.setSnack)

    const [request, response, promptFacebookLogin] = Facebook.useAuthRequest({
        clientId: FACEBOOK_CLIENT_ID,
        responseType: ResponseType.Token,
        redirectUri: 'https://auth.expo.io/@jhahn678/heron'
    });

    const handleFacebookAuthRequest = async (result: AuthSessionResult) => {
        if(result.type === 'success'){  
            if(!result.authentication) return;
            const { accessToken } = result.authentication;
            try{
                const token = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
                await axios.post("/auth/link/facebook", { accessToken },
                    { headers: { "Authorization": `Bearer ${token}`} }
                );
                args.onSuccess();
            }catch(err){
                console.error(err)
                const error = err as AxiosError<RestError>;
                if(error?.response?.data?.code === 'FACEBOOK_ACCOUNT_IN_USE'){
                    setSnack('This Facebook account is already in use')
                }else{
                    setSnack("Something went wrong..")
                }
            }

        }
    }

    useEffect(() => {
        if(response) handleFacebookAuthRequest(response)
    }, [response]);

    return { promptFacebookLogin }

}