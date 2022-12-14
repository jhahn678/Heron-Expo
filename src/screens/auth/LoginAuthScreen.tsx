import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation'
import { TextInput, Text, Button } from 'react-native-paper'
import AppleLoginButton from '../../components/buttons/AppleLoginButton'
import GoogleLoginButton from '../../components/buttons/GoogleLoginButton'
import FacebookLoginButton from '../../components/buttons/FacebookLoginButton'
import { useLogin } from '../../hooks/mutations/useLogin'
import { useAuth } from '../../store/auth/useAuth'
import { useModalStore } from '../../store/modal/useModalStore'
import { theme } from '../../config/theme'
const { width } = Dimensions.get('screen')

const LoginAuthScreen = ({ navigation }: RootStackScreenProps<'LoginAuthScreen'>): JSX.Element => {
  
  const setUser = useAuth(state => state.setUser)

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const setSnack = useModalStore(store => store.setSnack)

  const { loginUser, isError, isLoading } = useLogin({ 
    onSuccess: data => setUser(data).then(() => {
      setSnack('Sign in successful')
      navigation.replace("MainTabs", { 
        screen: "ExploreStack",
        params: { screen: "ExploreScreen" }
      })
    }),
    onError: () => { setIdentifier(''); setPassword('') }
  })

  const handleLogin = () => {
    if(identifier.trim().length < 5){
      setSnack('Username/Email invalid')
    }else if(password.length < 7){
      setSnack('Password invalid')
    }else{
      loginUser({ 
        identifier: identifier.trim(), 
        password 
      })
    }
  }

  const handleForgotPassword = () => navigation.navigate("ForgotPasswordScreen")

  return (
    <View style={styles.container}>
      <TextInput autoFocus
        error={isError}
        value={identifier}
        onChangeText={setIdentifier}
        label='Email or Username' 
        mode='outlined' 
        style={styles.input}
      />
      <TextInput 
        error={isError}
        value={password}
        onChangeText={setPassword}
        label='Password' 
        mode='outlined' 
        style={styles.input}
      />
      <Button onPress={handleLogin}
        mode={'contained'}
        style={styles.button} 
        theme={{ roundness: 2 }}
        loading={isLoading}
      >Sign in</Button>
      <Button onPress={handleForgotPassword}
        mode={'outlined'}
        style={[styles.button, styles.outlined]} 
        theme={{ roundness: 2 }}
      >Forgot Password</Button>
      <Text style={{ alignSelf: 'center', marginTop: 16, marginBottom: 12}}>Or</Text>
      <GoogleLoginButton navigation={navigation}/>
      {/* <FacebookLoginButton navigation={navigation}/> */}
      <AppleLoginButton navigation={navigation}/>
      <Button 
        onPress={() => navigation.navigate('RegisterAuthScreenOne')}
        buttonColor={"white"}
        theme={{ roundness: 2 }}
        style={styles.button}
        icon={'email'}
      >
        Create a new account
      </Button>
    </View>
  )
}

export default LoginAuthScreen

const styles = StyleSheet.create({
  skipButton: {
    alignSelf: 'flex-start',
    marginBottom: 32
  },
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 0
  },
  input: {
    marginBottom: 8
  },
  button: {
    marginTop: 8,
    width: width - 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
  },
  outlined: {
    borderColor: theme.colors.primary,
    borderWidth: 2
  }
})