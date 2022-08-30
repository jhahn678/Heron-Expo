import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation'
import { useRegistrationStore } from '../../store/auth/useRegistrationStore'
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper'
import { useAuth } from '../../store/auth/useAuth'
import { useCheckUsernameAvailability } from '../../hooks/queries/useCheckUsernameAvailability'
import { useCreateAccount } from '../../hooks/mutations/useCreateAccount'

const RegisterAuthScreenThree = ({ navigation }: RootStackScreenProps<'RegisterAuthScreenThree'>) => {

  const [username, setUsername] = useState('')
  const { firstName, lastName, email, password, reset } = useRegistrationStore()
  const setUser = useAuth(state => state.setUser);
  const { isAvailable, isLoading: usernameIsLoading } = useCheckUsernameAvailability(username)

  const { createAccount, isLoading } = useCreateAccount({
    onSuccess: data => setUser(data).then(() => navigation.navigate('MainTabs')),
    onError: () => alert('Account Creation Failed')
  });

  const handleCreateAccount = () => createAccount({ firstName, lastName, username, email, password})
  
  return (
    <View style={styles.container}>
      <TextInput autoFocus
        mode='outlined'
        label='Username' 
        value={username} 
        onChangeText={setUsername}
        style={styles.input}
      />
      <Button 
        mode='contained-tonal' 
        style={styles.button} 
        theme={{ roundness: 2 }} 
        disabled={!Boolean(isAvailable)} 
        onPress={handleCreateAccount}
      >Get Started</Button>
    </View>
  )
}

export default RegisterAuthScreenThree

const styles = StyleSheet.create({
  container: {
    height: '80%',
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