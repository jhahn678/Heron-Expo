import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation'
import { TextInput, Text, Button, ActivityIndicator, IconButton } from 'react-native-paper'
import AppleLoginButton from '../../components/buttons/AppleLoginButton'
import GoogleLoginButton from '../../components/buttons/GoogleLoginButton'
import FacebookLoginButton from '../../components/buttons/FacebookLoginButton'
import { useLogin } from '../../hooks/mutations/useLogin'
import { useAuth } from '../../store/auth/useAuth'


const LoginAuthScreen = ({ navigation }: RootStackScreenProps<'LoginAuthScreen'>): JSX.Element => {
  
  const setUser = useAuth(state => state.setUser)

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const { loginUser, isError, isLoading } = useLogin({
    onSuccess: data => setUser(data).then(() => navigation.replace('MainTabs')),
    onError: () => { setIdentifier(''); setPassword('') }
  })

  const handleLogin = () => loginUser({ identifier, password })

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
        disabled={identifier.length === 0 || password.length < 7}
        mode='contained-tonal' 
        style={styles.button} 
        theme={{ roundness: 2 }}
      >Sign in</Button>
      <Text style={{ alignSelf: 'center', marginVertical: 12}}>Or</Text>
      <GoogleLoginButton/>
      <FacebookLoginButton/>
      <AppleLoginButton/>
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
    padding: '5%',
    paddingBottom: 0
  },
  input: {
    marginBottom: 8
  },
  button: {
    marginVertical: 8,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
  }
})