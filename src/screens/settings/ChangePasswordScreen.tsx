import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, Card } from "react-native-paper";
import LoadingBackdrop from "../../components/loaders/LoadingBackdrop";
import { theme } from "../../config/theme";
import { useChangePassword } from "../../hooks/mutations/useChangePassword";
import { useValidatePassword } from "../../hooks/utils/useValidatePassword";
import { useModalStore } from "../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../types/navigation";

const ChangePasswordScreen = ({ navigation }: RootStackScreenProps<"ChangePasswordScreen">) => {

    const [password, setPassword] = useState({ value: "", touched: false })
    const handlePassword = (value: string) => setPassword({ value, touched: true })

    const [confirmPassword, setConfirmPassword] = useState({ value: "", touched: false })
    const handleConfirmPassword = (value: string) => setConfirmPassword({ value, touched: true })

    const setSnack = useModalStore(store => store.setSnack)
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const valid = useValidatePassword(password.value)

    const handleChangePassword = () => changePassword(password.value)

    const { changePassword, loading, error } = useChangePassword({
        onSuccess: () => {
            setSnack("Password successfully changed")
            navigation.navigate("SettingsScreen")
        },
        onError: (err) => {
            if(err.response?.status === 401){
                setSnack("Unable to authenticate. Please login and try again.")
            }else{
                setSnack("Something went wrong..")
            }
        }
    })

    return (
        <View style={styles.container}>
            {loading && <LoadingBackdrop loaderStyle={styles.loader}/>}
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant={"titleMedium"} style={styles.title}>Enter a new password</Text>
                    <TextInput
                        mode={"flat"}
                        label={"Password"}
                        style={styles.input}
                        value={password.value} 
                        placeholder={"Password"}
                        onChangeText={handlePassword}
                        secureTextEntry={secureTextEntry}
                        error={error || (password.touched && !valid)}
                        right={secureTextEntry ? 
                            <TextInput.Icon 
                                icon='eye' 
                                onPress={() => setSecureTextEntry(x => !x)}/> : 
                            <TextInput.Icon 
                                icon="eye-off" 
                                onPress={() => setSecureTextEntry(x => !x)}/>}/>
                    <TextInput 
                        mode={"flat"}
                        style={styles.input}
                        label={"Confirm Password"}
                        value={confirmPassword.value} 
                        placeholder={'Confirm Password'}
                        onChangeText={handleConfirmPassword}
                        secureTextEntry={secureTextEntry}
                        error={error || (password.value !== confirmPassword.value)}
                        right={secureTextEntry ? 
                            <TextInput.Icon 
                                icon='eye' 
                                onPress={() => setSecureTextEntry(x => !x)}/> : 
                            <TextInput.Icon 
                                icon="eye-off" 
                                onPress={() => setSecureTextEntry(x => !x)}/>}/>
                    <Button 
                        loading={loading}
                        mode='contained' 
                        style={styles.button} 
                        onPress={handleChangePassword}
                        disabled={!valid || password.value !== confirmPassword.value}
                        theme={{ 
                            roundness: 1, 
                            colors: {
                                surfaceDisabled: theme.colors.surfaceVariant, 
                                onPrimary: valid ? "#fff" : theme.colors.surfaceVariant
                            } 
                        }}
                    >Save Password</Button>
                </Card.Content>
            </Card>
            {loading && <LoadingBackdrop loaderStyle={styles.loader}/>}
        </View>
    )
}

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    card: {
        borderColor: theme.colors.primaryContainer,
        borderWidth: 1
    },
    input: {
        marginBottom: 16,
    },
    title: {
        marginBottom: 24,
        marginTop: 4
    },
    button: {
        marginTop: 8
    },
    loader: {
        position: 'absolute',
        top: 150
    }
})