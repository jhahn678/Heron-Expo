import { theme } from '../../config/theme'
import { StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../types/navigation'
import { useValidatePassword } from '../../hooks/utils/useValidatePassword'
import { useRegistrationStore } from '../../store/auth/useRegistrationStore'
import { TextInput, Button, Text, ActivityIndicator, HelperText, Card } from 'react-native-paper'
import { useCheckEmailAvailability } from '../../hooks/queries/useCheckEmailAvailability'
import { useCheckUsernameAvailability } from '../../hooks/queries/useCheckUsernameAvailability'
import { useState } from 'react'

const RegisterAuthScreenTwo = ({ navigation }: RootStackScreenProps<'RegisterAuthScreenTwo'>) => {

  const setEmail = useRegistrationStore(state => state.setEmail)
  const setUsername = useRegistrationStore(state => state.setUsername)
  const setPassword = useRegistrationStore(state => state.setPassword)
  const [secureText, setSecureText] = useState(true)

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
      <Card style={styles.card}>
        <Card.Content>
          <Text variant={"titleMedium"} style={styles.title}>
            Please setup your credentials
          </Text>
          <TextInput 
            autoFocus={true}
            mode={'flat'}
            label={'Email'} 
            value={store.email} 
            onChangeText={setEmail}
            error={!email.available || email.error || !email.valid}
            right={<TextInput.Icon icon={() => <ActivityIndicator animating={email.loading}/>}/>}
          />
          <HelperText 
            style={styles.helper}
            type={!email.touched || (email.available && email.valid) ? "info" : "error"}>
            { 
              !email.touched ? "" : 
              email.error ? "Could not verify email" : 
              !email.valid ? "Email not valid" : 
              !email.available ? "Email already in use" : 
              "Email available" }
          </HelperText>
          <TextInput 
            mode={"flat"}
            label={'Username'}
            value={store.username} 
            onChangeText={setUsername}
            error={!username.available || !username.valid || username.error}
            left={<TextInput.Affix text="@" textStyle={{ 
              color: username.available ? theme.colors.primary : theme.colors.error 
            }}/>}
            right={<TextInput.Icon icon={() => <ActivityIndicator animating={username.loading}/>}/>}
          />
          <HelperText 
            style={styles.helper}
            type={!username.touched || (username.available && username.valid) ? "info" : "error"}>
            { 
              !username.touched ? "" : 
              username.error ? "Could not verify username" : 
              !username.valid ? "Username not valid - Minimum 6 characters" : 
              !username.available ? "Username already in use" : 
              "Username available" }
          </HelperText>
          <TextInput 
            mode={"flat"}
            label={'Password'} 
            value={store.password} 
            onChangeText={setPassword}
            secureTextEntry={secureText}
            error={!passwordValid && store.password.length > 0}
            right={secureText ? 
              <TextInput.Icon icon="eye" onPress={() => setSecureText(false)}/> : 
              <TextInput.Icon icon="eye-off" onPress={() => setSecureText(true)}/>
            }/>
          <HelperText
            style={styles.helper}
            type={passwordValid ? "info" : "error"}>
            { passwordValid ? "Password valid" : "Minimum 8 characters • One uppercase • One number" }
          </HelperText>
          <Button 
            disabled={
              !username.available
              || !email.available
              || !passwordValid
            }
            mode={'contained'} 
            style={styles.button} 
            onPress={handleNext}
            theme={{ 
              roundness: 1, 
              colors: {
                surfaceDisabled: theme.colors.surfaceVariant, 
                onPrimary: (
                  !username.available
                  || !email.available
                  || !passwordValid
                ) ? theme.colors.surfaceVariant : "#fff"
              } 
            }}
          >Next</Button>
        </Card.Content>
      </Card>
    </View>
  )
}

export default RegisterAuthScreenTwo

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  card: {
    borderColor: theme.colors.primaryContainer,
    borderWidth: 1
  },
  title: {
    marginBottom: 16,
    marginTop: 4
  },
  helper: {
    marginBottom: 4
  },
  button: {
    marginTop: 8
  }
})