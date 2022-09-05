import { StyleSheet, View } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../types/navigation'
import { Button, Text } from 'react-native-paper'
import GoogleLoginButton from '../../components/buttons/GoogleLoginButton'
import FacebookLoginButton from '../../components/buttons/FacebookLoginButton'
import AppleLoginButton from '../../components/buttons/AppleLoginButton'

const HomeAuthScreen = ({ navigation, route }: RootStackScreenProps<'HomeAuthScreen'>): JSX.Element => {

  const handleSkipAuthentication = () => navigation.replace('MainTabs')
  const handleRegisterScreen = () => navigation.navigate('RegisterAuthScreenOne')
  const handleLoginScreen = () => navigation.navigate('LoginAuthScreen')

  return (
    <View style={styles.container}>
      {
        route?.params?.showBack === true ? 
          <Button icon='arrow-right' onPress={handleSkipAuthentication}
            contentStyle={{ flexDirection: 'row-reverse'}}
            style={styles.skipButton}
          >Skip</Button>
        :
          <Button icon='arrow-left' onPress={navigation.goBack}
            style={styles.backButton}
          >Back</Button>
      }
      <View style={styles.buttonContainer}>
        <GoogleLoginButton/>
        <FacebookLoginButton/>
        <AppleLoginButton/>
        <Button onPress={handleLoginScreen}
          theme={{ roundness: 2 }}
          buttonColor='white' 
          icon='email' 
          style={styles.button} 
        >Sign in with Password</Button>
        <Text onPress={handleRegisterScreen}
          style={styles.caption}
        >First time here? Create an account</Text>
      </View>
    </View>
  )
}

export default HomeAuthScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    padding: '5%'
  },
  skipButton: {
    marginTop: 36,
    alignSelf: 'flex-end'
  },
  backButton: {
    marginTop: 36,
    alignSelf: 'flex-start'
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: 8,
    width: '100%',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
  },
  caption: {
    marginTop: 16,
    marginBottom: 8
  }
})