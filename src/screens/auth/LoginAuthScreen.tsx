import { Dimensions, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation'
import { TextInput, Text, Button, Card } from 'react-native-paper'
import AppleLoginButton from '../../components/buttons/AppleLoginButton'
import GoogleLoginButton from '../../components/buttons/GoogleLoginButton'
import FacebookLoginButton from '../../components/buttons/FacebookLoginButton'
import LoadingBackdrop from '../../components/loaders/LoadingBackdrop'
import { useLogin } from '../../hooks/mutations/useLogin'
import { useAuth } from '../../store/auth/useAuth'
import { useModalStore } from '../../store/modal/useModalStore'
import { theme } from '../../config/theme'

const LoginAuthScreen = ({ navigation }: RootStackScreenProps<'LoginAuthScreen'>): JSX.Element => {
  
  const setUser = useAuth(state => state.setUser)

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(false)
  const handleSecureText = () => setSecureTextEntry(x => !x)
  const setSnack = useModalStore(store => store.setSnack)

  const { loginUser, isError, isLoading } = useLogin({ 
    onSuccess: data => setUser(data).then(() => {
      setSnack('Sign in successful')
      navigation.replace("MainTabs", { 
        screen: "ExploreStack",
        params: { screen: "ExploreScreen" }
      })
    }),
    onError: () => { 
      setIdentifier(''); 
      setPassword(''); 
      setSnack('Sign in failed') 
    }
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
  const handleCreateAccount = () => navigation.navigate('RegisterAuthScreenOne')

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant={"titleMedium"} style={styles.title}>
            Sign in with credentials
          </Text>
          <TextInput 
            autoFocus={true}
            error={isError}
            value={identifier}
            style={styles.input}
            onChangeText={setIdentifier}
            label={"Email or Username"}
            placeholder={"Email or Username"}
          />
          <TextInput 
            error={isError}
            value={password}
            label={'Password'} 
            style={styles.input}
            placeholder={"Password"}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            right={<TextInput.Icon 
              icon={secureTextEntry ? 'eye' : 'eye-off'}
              onPress={handleSecureText}/>}/>
          <Button 
            onPress={handleLogin}
            mode={'contained'}
            style={styles.button} 
            theme={{ roundness: 1 }}
          >Sign in</Button>
          <Button 
            mode={'outlined'}
            theme={{ roundness: 1 }}
            onPress={handleForgotPassword}
            style={[styles.button, styles.outlined]} 
          >Forgot Password</Button>
          <Text style={styles.or}variant={"titleSmall"}>Or</Text>
          <GoogleLoginButton navigation={navigation} style={styles.button}/>
          {/* <FacebookLoginButton navigation={navigation} style={styles.button}/> */}
          <AppleLoginButton navigation={navigation} style={styles.button}/>
          <Button 
            icon={'email'}
            style={styles.button}
            mode={'contained-tonal'}
            theme={{ roundness: 1 }}
            onPress={handleCreateAccount}
          >Create a new account</Button>
        </Card.Content>
      </Card>
      {isLoading && <LoadingBackdrop loaderStyle={styles.loader}/>}
    </View>
  )
}

export default LoginAuthScreen

const styles = StyleSheet.create({
  input: {
    marginBottom: 8
  },
  outlined: {
    borderColor: theme.colors.primary,
    borderWidth: 2
  },
  or: { 
    alignSelf: 'center', 
    marginTop: 16, 
    marginBottom: 24
  },
  container: {
    padding: 16
  },
  card: {
    borderColor: theme.colors.primaryContainer,
    borderWidth: 1
  },
  title: {
    marginBottom: 24,
    marginTop: 4
  },
  button: {
    marginBottom: 8
  },
  loader: {
    position: 'absolute',
    top: 150
  }
})