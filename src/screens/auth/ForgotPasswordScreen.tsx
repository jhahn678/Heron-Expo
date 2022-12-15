import { useEffect, useState } from "react";
import * as yup from 'yup'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Button, TextInput, Text, Card } from "react-native-paper";
import { useForgotPassword } from "../../hooks/mutations/useForgotPassword";
import { useModalStore } from "../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../types/navigation";
import { theme } from "../../config/theme";
const { width } = Dimensions.get('screen');

const ForgotPasswordScreen = ({ navigation }: RootStackScreenProps<'ForgotPasswordScreen'>): JSX.Element => {

  const [email, setEmail] = useState('')
  const [disabled, setDisabled] = useState(true)

  const schema = yup.string().min(8).email()
  useEffect(() => setDisabled(!schema.isValidSync(email.trim())),[email])
  
  const setSnack = useModalStore(store => store.setSnack)

  const { forgotPassword, loading } = useForgotPassword()
  
  const handleSubmit = () => {
    if(schema.isValidSync(email.trim())){
      forgotPassword(email.trim())
      setSnack('Password reset email sent')
      navigation.goBack()
    }else{
      setSnack('Email invalid')
    }
  }

  return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant={"titleMedium"} style={styles.title}>
              If your email is associated with an account, 
              we'll send you an email.
            </Text>
            <TextInput 
              mode={'flat'}
              value={email}
              autoFocus={true}
              style={styles.input}
              onChangeText={setEmail}
              label={"Enter your email"}
            />
            <Button 
                loading={loading}
                mode={'contained'}
                style={styles.button} 
                onPress={handleSubmit}
                disabled={disabled}
                theme={{ 
                  roundness: 1, 
                  colors: {
                    surfaceDisabled: theme.colors.surfaceVariant, 
                    onPrimary: disabled ? theme.colors.surfaceVariant : "#fff"
                  } 
                }}
            >Send Email</Button>
          </Card.Content>
        </Card>
      </View>
  );
}

export default ForgotPasswordScreen;

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
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8
  }
})