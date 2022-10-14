import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { FACEBOOK_CLIENT_ID } from '@env'
const { width } = Dimensions.get('screen')

WebBrowser.maybeCompleteAuthSession();

const FacebookLoginButton = () => {

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      //do something with response
      }
  }, [response]);


  return (
    <Button disabled={!request}
        buttonColor='white'
        theme={{ roundness: 2 }}
        style={styles.container}
        icon='facebook'
        onPress={() => promptAsync()}
        >
        Continue with Facebook
    </Button>
  )
}

export default FacebookLoginButton

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        width: width - 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
    }
})