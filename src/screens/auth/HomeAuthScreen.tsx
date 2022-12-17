import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { RootStackScreenProps } from '../../types/navigation'
import { Button, Text } from 'react-native-paper'
import GoogleLoginButton from '../../components/buttons/GoogleLoginButton'
import FacebookLoginButton from '../../components/buttons/FacebookLoginButton'
import AppleLoginButton from '../../components/buttons/AppleLoginButton'
const DEFAULT_IMAGE = Image.resolveAssetSource(require('../../../assets/heron-dark.png'))
const { width, height } = Dimensions.get('screen')

const HomeAuthScreen = ({ navigation, route }: RootStackScreenProps<'HomeAuthScreen'>): JSX.Element => {
  
  // @ts-ignore
  const handleSkipAuthentication = () => navigation.replace('MainTabs')
  const handleRegisterScreen = () => navigation.navigate('RegisterAuthScreenOne')
  const handleLoginScreen = () => navigation.navigate('LoginAuthScreen')

  return (
    <View style={styles.container}>
      {
        route?.params?.showBack === true ? 
          <Button icon='arrow-left' onPress={navigation.goBack}
            style={styles.backButton}
          >Back</Button>
        :
          <Button icon='arrow-right' onPress={handleSkipAuthentication}
            contentStyle={{ flexDirection: 'row-reverse'}}
            style={styles.skipButton}
          >Skip</Button>
      }
      <Image source={DEFAULT_IMAGE} style={styles.image}/>
      <View style={styles.buttonContainer}>
        <GoogleLoginButton navigation={navigation} style={styles.button}/>
        {/* <FacebookLoginButton navigation={navigation}/> */}
        <AppleLoginButton navigation={navigation} style={styles.button}/>
        <Button 
          icon={'email'} 
          mode={'contained'}
          style={styles.button} 
          theme={{ roundness: 1 }}
          onPress={handleLoginScreen}
        >Sign in with Password</Button>
        <Text 
          onPress={handleRegisterScreen}
          variant={'titleSmall'} 
          style={styles.caption}>
          First time here? Create an account
        </Text>
      </View>
    </View>
  )
}

export default HomeAuthScreen

const styles = StyleSheet.create({
  container: {
    height,
    justifyContent: 'space-between',
    padding: 16
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
    width: width - 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center'
  },
  caption: {
    marginTop: 16,
    marginBottom: 8
  },
  image: {
    alignSelf: 'center',
    height: 300, 
    width: 300,
    transform: [{ translateY: -30 },{ translateX: 10 }]
  },
  ellipse: {
    position: 'absolute',
    top: height * .45,
    zIndex: -1,
  },
  ellipse2: {
    position: 'absolute',
    top: height * .45,
    zIndex: -1
  },
  ellipse3: {
     position: 'absolute',
      top: 0,
      zIndex: -1
  }
})