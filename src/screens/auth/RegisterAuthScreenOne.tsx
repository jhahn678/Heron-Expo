import React from 'react'
import { StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../types/navigation'
import { TextInput, Button, Card, Text } from 'react-native-paper'
import { useRegistrationStore } from '../../store/auth/useRegistrationStore'
import { theme } from '../../config/theme'

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
      <Card style={styles.card}>
          <Card.Content>
              <Text variant={"titleMedium"} style={styles.title}>
                Please enter your name
              </Text>
              <TextInput 
                autoFocus={true}
                mode={'flat'}
                value={firstName} 
                label={'First Name'}
                style={styles.input}
                autoCapitalize={'words'}
                onChangeText={setFirstName} 
              />
              <TextInput 
                value={lastName} 
                mode={'flat'}
                label={'Last Name'}
                style={styles.input}
                autoCapitalize={'words'}
                onChangeText={setLastName} 
              />
              <Button 
                onPress={handleNext}
                style={styles.button} 
                mode={'contained'}
                disabled={firstName.length === 0 || lastName.length === 0}
                theme={{ 
                  roundness: 1, 
                  colors: {
                    surfaceDisabled: theme.colors.surfaceVariant, 
                    onPrimary: (firstName.length === 0 || lastName.length === 0) ? 
                      theme.colors.surfaceVariant : "#fff"
                  } 
                }}
              >Next</Button>
          </Card.Content>
      </Card>
    </View>
  )
}

export default RegisterAuthScreenOne;

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  card: {
    borderColor: theme.colors.primaryContainer,
    borderWidth: 1
  },
  input: {
    marginBottom: 12,
  },
  title: {
    marginBottom: 16,
    marginTop: 4
  },
  button: {
    marginTop: 8
  },
})