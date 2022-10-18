import { StyleSheet, View } from 'react-native'
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper'
import { RootStackScreenProps } from '../../types/navigation'
import { useCheckEmailAvailability } from '../../hooks/queries/useCheckEmailAvailability'
import { useRegistrationStore } from '../../store/auth/useRegistrationStore'
import { useValidatePassword } from '../../hooks/utils/useValidatePassword'
import { theme } from '../../config/theme'
import { useCheckUsernameAvailability } from '../../hooks/queries/useCheckUsernameAvailability'

const RegisterAuthScreenTwo = ({ navigation }: RootStackScreenProps<'RegisterAuthScreenTwo'>) => {

  const setEmail = useRegistrationStore(state => state.setEmail)
  const setUsername = useRegistrationStore(state => state.setUsername)
  const setPassword = useRegistrationStore(state => state.setPassword)

  const store = useRegistrationStore(store => ({
    email: store.email,
    password: store.password,
    username: store.username,
  }))

  const email = useCheckEmailAvailability(store.email)
  const username = useCheckUsernameAvailability(store.username)
  const passwordValid = useValidatePassword(store.password)

  const handleNext = () => navigation.navigate('RegisterAuthScreenThree')
  
  return (
    <View style={styles.container}>
      {
        email.isAvailable === false ?
          <Text style={styles.error}>Email is already in use</Text>
        : email.isError ?
          <Text style={styles.error}>Email is invalid</Text>
        : null
      }
      <TextInput autoFocus 
        mode='outlined' 
        label='Email' 
        value={store.email} 
        onChangeText={setEmail}
        style={styles.input}
        error={email.isAvailable === false || email.isError}
        right={<TextInput.Icon icon={() => <ActivityIndicator animating={email.isLoading}/>}/>}
      />
      {
        username.isAvailable === false ?
          <Text style={styles.error}>Username is already in use</Text>
        : store.username.length < 6 ?
          <Text style={styles.tip}>Username must be at least 6 characters</Text>
        : null
      }
      <TextInput 
        autoFocus={true}
        mode='outlined'
        label='Username' 
        value={store.username} 
        onChangeText={setUsername}
        style={styles.input}
        error={username.isAvailable === false || username.isError}
        left={<TextInput.Affix text="@" textStyle={{ color: theme.colors.primary }}/>}
        right={<TextInput.Icon icon={() => <ActivityIndicator animating={username.isLoading}/>}/>}
      />
      { !passwordValid &&
        <Text style={styles.tip}>Minimum of 8 characters – One uppercase character</Text>
      }
      <TextInput 
        mode='outlined'
        label='Password' 
        value={store.password} 
        onChangeText={setPassword}
        style={styles.input}
        error={!passwordValid && store.password.length > 0}
      />
      <Button 
        disabled={
          !username.isAvailable
          || username.isError
          || !passwordValid
        }
        mode='contained-tonal' 
        style={styles.button} 
        theme={{ roundness: 2 }}
        onPress={handleNext}
      >Next</Button>
    </View>
  )
}

export default RegisterAuthScreenTwo

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 48,
    paddingBottom: 0
  },
  input: {
    marginBottom: 12
  },
  error: {
    marginTop: 4,
    marginBottom: 12,
    color: theme.colors.error
  },
  tip: {
    marginTop: 4,
    marginBottom: 12,
  },
  button: {
    marginVertical: 12,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
  },
})