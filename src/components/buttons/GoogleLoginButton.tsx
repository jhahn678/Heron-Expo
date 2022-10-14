import { StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { 
  GOOGLE_ANDROID_CLIENT_ID, 
  GOOGLE_EXPO_CLIENT_ID, 
  GOOGLE_IOS_CLIENT_ID, 
  GOOGLE_WEB_CLIENT_ID
} from '@env'
const { width } = Dimensions.get('screen')

WebBrowser.maybeCompleteAuthSession();

const GoogleLoginButton = () => {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      //Do something with token
      }
  }, [response]);

  return (
    <Button 
      disabled={!request}
      onPress={() => promptAsync()}
      buttonColor='white'
      theme={{ roundness: 2 }}
      style={styles.container}
      icon='google'
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