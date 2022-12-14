import { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper';
import { useResetPassword } from '../../hooks/mutations/useResetPassword';
import { useValidatePassword } from '../../hooks/utils/useValidatePassword';
import { useModalStore } from '../../store/modal/useModalStore';
import { RootStackScreenProps } from "../../types/navigation"; 
const { width } = Dimensions.get('screen')

interface PasswordState {
    value: string
    touched: boolean
}

const ResetPasswordScreen = ({ navigation, route }: RootStackScreenProps<'ResetPasswordScreen'>) => {

    const { token } = route.params;

    const [password, setPassword] = useState<PasswordState>({ value: "", touched: false })
    const handleSetPassword = (value: string) => setPassword(() => ({ value, touched: true }))

    const [confirmPassword, setConfirmPassword] = useState<PasswordState>({ value: "", touched: false })
    const handleSetConfirmPassword = (value: string) => setConfirmPassword(() => ({ value, touched: true }))

    const setSnack = useModalStore(store => store.setSnack)
    const [secureTextEntry, setSecureTextEntry] = useState(false)
    const valid = useValidatePassword(password.value)

    const { resetPassword, loading, error } = useResetPassword({
        onSuccess: () => {
            setSnack('Password successfully changed')
            navigation.replace('LoginAuthScreen')
        },
        onError: (err) => {
            if(err.response?.status === 401){
                setSnack(
                    "The reset link you used is no longer valid. " 
                    + "Please provide your email and try again")
                navigation.replace('ForgotPasswordScreen')
            }else{
                setSnack("Something went wrong")
            }
        }
    })
    
    const handleSubmit = () => resetPassword({ token, password: password.value })

    return (
        <View style={styles.container}>
            <Text variant={"bodyLarge"}>Enter a new password</Text>
            <TextInput 
                autoFocus={true}
                mode={'outlined'}
                label={"Password"}
                style={styles.input}
                value={password.value}
                onChangeText={handleSetPassword}
                secureTextEntry={secureTextEntry}
                right={secureTextEntry ? 
                    <TextInput.Icon icon='eye' onPress={() => setSecureTextEntry(x => !x)}/> : 
                    <TextInput.Icon icon="eye-off" onPress={() => setSecureTextEntry(x => !x)}/>}
                error={error || ( 
                    password.touched && !valid
                )}
            />
            <TextInput 
                mode={'outlined'}
                style={styles.input}
                label={"Confirm Password"}
                value={confirmPassword.value}
                secureTextEntry={secureTextEntry}
                onChangeText={handleSetConfirmPassword}
                right={secureTextEntry ? 
                    <TextInput.Icon icon='eye' onPress={() => setSecureTextEntry(x => !x)}/> : 
                    <TextInput.Icon icon="eye-off" onPress={() => setSecureTextEntry(x => !x)}/>}
                error={error || (
                    confirmPassword.touched && 
                    password.value !== confirmPassword.value
                )}
            />
            <Button 
                loading={loading}
                mode={'contained'}
                style={styles.button} 
                onPress={handleSubmit}
                theme={{ roundness: 1 }}
                disabled={!valid && password.value !== confirmPassword.value}
            >Save Password</Button>
        </View>
    );
}

export default ResetPasswordScreen;

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
});