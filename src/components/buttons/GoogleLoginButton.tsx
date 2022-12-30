import { StyleProp, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import { Button } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { useGoogleLogin } from '../../hooks/mutations/useGoogleLogin'
import { useAuth } from '../../store/auth/useAuth'
import { RootStackParams, RootStackScreenProps } from '../../types/navigation'
import { 
  GOOGLE_ANDROID_CLIENT_ID, 
  GOOGLE_EXPO_CLIENT_ID, 
  GOOGLE_IOS_CLIENT_ID, 
  GOOGLE_WEB_CLIENT_ID
} from "@env"

WebBrowser.maybeCompleteAuthSession();

interface Props {
  style?: StyleProp<ViewStyle>
  navigation: RootStackScreenProps<keyof RootStackParams>['navigation']
}

const GoogleLoginButton = ({ navigation, style }: Props) => {

  const signInUser = useGoogleLogin()
  const setUser = useAuth(store => store.setUser)
 
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if(!authentication) return;
      signInUser({ accessToken: authentication.accessToken })
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
      icon={'google'}
      disabled={!request}
      onPress={() => promptAsync()}
      theme={{ roundness: 1 }}
      style={style}
      mode={"contained-tonal"}
    >
      Continue with Google
    </Button>
  )
}

export default GoogleLoginButton
