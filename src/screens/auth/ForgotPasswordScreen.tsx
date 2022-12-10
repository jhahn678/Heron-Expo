import React, { useEffect, useState } from "react";
import * as yup from 'yup'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Button, TextInput, Text } from "react-native-paper";
import { useForgotPassword } from "../../hooks/mutations/useForgotPassword";
import { useModalStore } from "../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../types/navigation";

const { width } = Dimensions.get('screen');

const ForgotPasswordScreen = ({ navigation }: RootStackScreenProps<'ForgotPasswordScreen'>): JSX.Element => {

    const [email, setEmail] = useState('')
    
    const schema = yup.string().min(8).email()
    
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
            <Text style={styles.caption}>
                If your email is associated with an account, 
                we'll send you password reset instructions.
            </Text>
            <TextInput 
                value={email}
                autoFocus={true}
                mode={'outlined'}
                style={styles.input}
                onChangeText={setEmail}
                label={"Enter your email"}
            />
            <Button 
                loading={loading}
                mode={'contained'}
                style={styles.button} 
                onPress={handleSubmit}
                theme={{ roundness: 2 }}
                disabled={!schema.isValidSync(email.trim())}
            >Send Email</Button>
        </View>
    );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 48,
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
  caption: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center'
  }
})