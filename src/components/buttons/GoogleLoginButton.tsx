import { StyleSheet, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Button } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { 
  GOOGLE_ANDROID_CLIENT_ID, 
  GOOGLE_EXPO_CLIENT_ID, 
  GOOGLE_IOS_CLIENT_ID, 
  GOOGLE_WEB_CLIENT_ID
} from '@env'
import { ResponseType } from 'expo-auth-session'
import { useGoogleLogin } from '../../hooks/mutations/useGoogleLogin'
import { useAuth } from '../../store/auth/useAuth'
import { RootStackParams, RootStackScreenProps } from '../../types/navigation'
const { width } = Dimensions.get('screen')
WebBrowser.maybeCompleteAuthSession();

interface Props {
  navigation: RootStackScreenProps<keyof RootStackParams>['navigation']
}

const GoogleLoginButton = ({ navigation }: Props) => {

  const signInUser = useGoogleLogin()
  const setUser = useAuth(store => store.setUser)

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
    responseType: ResponseType.IdToken
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      if(!id_token) return;
      (async() => {
        const res = await signInUser({ idToken: id_token })
        if(res) setUser(res, !res.account_created)
        if(res && res.account_created) navigation.navigate('UsernameAuthScreen')
      })()
    }
  }, [response]);

  return (
    <Button 
      icon='google'
      disabled={!request}
      onPress={() => promptAsync()}
      theme={{ roundness: 2 }}
      style={styles.container}
      mode="contained-tonal"
      elevation={0}
    >
        Continue with Google
    </Button>
  )
}

export default GoogleLoginButton

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        width: width - 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
    }
})