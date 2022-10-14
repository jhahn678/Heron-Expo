import React from 'react'
import { StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../types/navigation'
import { TextInput, Button } from 'react-native-paper'
import { useRegistrationStore } from '../../store/auth/useRegistrationStore'

const RegisterAuthScreenOne = ({ navigation }: RootStackScreenProps<'RegisterAuthScreenOne'>): JSX.Element => {
  
  const { 
    firstName, 
    lastName, 
    setFirstName, 
    setLastName 
  } = useRegistrationStore(state => ({ 
    firstName: state.firstname, 
    lastName: state.lastname,
    setFirstName: state.setFirstName,
    setLastName: state.setLastName
  }))

  const handleNext = () => navigation.navigate('RegisterAuthScreenTwo')
  
  return (
    <View style={styles.container}>
      <TextInput autoFocus
        autoCapitalize='words'
        mode='outlined'
        value={firstName} 
        onChangeText={setFirstName} 
        label='First Name'
        style={styles.input}
      />
      <TextInput style={styles.input}
        autoCapitalize='words'
        mode='outlined'
        value={lastName} 
        onChangeText={setLastName} 
        label='Last Name'
      />
      <Button 
        disabled={firstName.length === 0 || lastName.length === 0}
        onPress={handleNext}
        mode='contained-tonal' 
        style={styles.button} 
        theme={{ roundness: 2 }}
      >Next</Button>
    </View>
  )
}

export default RegisterAuthScreenOne;

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
  button: {
    marginVertical: 8,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
  }
})