import React, { useEffect } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Button } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { FACEBOOK_CLIENT_ID } from '@env'
import { RootStackParams, RootStackScreenProps } from '../../types/navigation'
import { ResponseType } from 'expo-auth-session'
import { useAuth } from '../../store/auth/useAuth'
import { useFacebookLogin } from '../../hooks/mutations/useFacebookLogin'

WebBrowser.maybeCompleteAuthSession();

interface Props {
  style?: StyleProp<ViewStyle>
  navigation: RootStackScreenProps<keyof RootStackParams>['navigation']
}

const FacebookLoginButton = ({ navigation, style }: Props) => {

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_CLIENT_ID,
    responseType: ResponseType.Token,
    redirectUri: 'https://auth.expo.io/@jhahn678/heron'
  });

  const setUser = useAuth(store => store.setUser)
  const signInUser = useFacebookLogin()

  useEffect(() => {
    if (response?.type === 'success') {
      if(!response.authentication?.accessToken) return;
      const { accessToken } = response.authentication;
      signInUser({ accessToken })
        .then((res) => {
          if(!res) return;
          if(res.account_created || res.username.startsWith('u-')){
            setUser(res, false);
            navigation.navigate('UsernameAuthScreen');
          }else{
            setUser(res, true)
          }
        })
    }
  }, [response]);


  return (
    <Button 
      disabled={!request}
      icon={'facebook'}
      mode={'contained-tonal'}
      theme={{ roundness: 1 }}
      style={style}
      onPress={() => promptAsync()}
    >
      Continue with Facebook
    </Button>
  )
}

export default FacebookLoginButton
