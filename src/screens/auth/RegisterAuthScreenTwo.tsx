import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { TextInput, Button, Text } from 'react-native-paper'
import { RootStackScreenProps } from '../../types/navigation'
import { useCheckEmailAvailability } from '../../hooks/queries/useCheckEmailAvailability'
import { useRegistrationStore } from '../../store/auth/useRegistrationStore'
import { useValidatePassword } from '../../hooks/utils/useValidatePassword'

const RegisterAuthScreenTwo = ({ navigation }: RootStackScreenProps<'RegisterAuthScreenTwo'>) => {

  const { 
    email, 
    password,
    setEmail,
    setPassword
  } = useRegistrationStore(state => ({
    email: state.email,
    password: state.password,
    setEmail: state.setEmail,
    setPassword: state.setPassword
  }))

  const { isAvailable, isLoading } = useCheckEmailAvailability(email)
  const passwordValid = useValidatePassword(password)

  const handleNext = () => navigation.navigate('RegisterAuthScreenThree')

  return (
    <View style={styles.container}>
      <TextInput autoFocus 
        mode='outlined' 
        label='Email' 
        value={email} 
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput 
        mode='outlined'
        label='Password' 
        value={password} 
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button 
        disabled={!isAvailable || !passwordValid}
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