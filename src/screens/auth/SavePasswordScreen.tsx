import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../types/navigation";
import { TextInput, Button, Text, HelperText, Card } from "react-native-paper";
import { useAddAccountPassword } from "../../hooks/mutations/useAddAccountPassword";
import { useModalStore } from "../../store/modal/useModalStore";
import { ErrorType } from "../../utils/conversions/mapErrorTypeToDetails";
import { theme } from "../../config/theme";
import { useValidatePassword } from "../../hooks/utils/useValidatePassword";
import LoadingBackdrop from "../../components/loaders/LoadingBackdrop";

const SavePasswordScreen = ({ navigation }: RootStackScreenProps<'SavePasswordScreen'>) => {

    const [password, setPassword] = useState({ value: "", touched: false })
    const handlePassword = (value: string) => setPassword(state => ({ ...state, value }))
    const [confirmPassword, setConfirmPassword] = useState({ value: "", touched: false })
    const handleConfirmPassword = (value: string) => setConfirmPassword(state => ({ ...state, value }))

    const valid = useValidatePassword(password.value)
    const [secureTextEntry, setSecureTextEntry] = useState(false)
    const handleToggleVisibility = () => setSecureTextEntry(x => !x) 

    const setSnack = useModalStore(store => store.setSnack)
    const setError = useModalStore(store => store.setError)

    const { addAccountPassword, loading } = useAddAccountPassword({ 
        onError: () => setError(true, ErrorType.RequestError),
        onSuccess: () => { 
            navigation.navigate('MainTabs', { 
                screen: "ExploreStack", 
                params: { screen: "ExploreScreen" } 
            });
            setSnack('Password saved successfully')
        }
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            if(password.value.length > 7){
                setPassword(state => ({ ...state, touched: true }))
            }
        },200)
        return () => clearTimeout(timer)
    },[password.value])

    const handlePress = () => {
        if(valid) addAccountPassword(password.value)
    }

    return (
        <View style={styles.container}>
            {loading && <LoadingBackdrop loaderStyle={styles.loader}/>}
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant={"titleMedium"} style={styles.title}>Enter a password</Text>
                    <TextInput
                        mode={"flat"}
                        label={"Password"}
                        value={password.value} 
                        placeholder={"Password"}
                        onChangeText={handlePassword}
                        secureTextEntry={secureTextEntry}
                        error={password.touched && !valid}
                        right={secureTextEntry ? 
                            <TextInput.Icon 
                                icon={"eye"}
                                onPress={handleToggleVisibility}/> : 
                            <TextInput.Icon 
                                icon={"eye-off"} 
                                onPress={handleToggleVisibility}/>}/>
                    <HelperText
                        type={valid ? "info" : "error"}>
                        { valid ? "Password valid" : "Minimum 8 characters • One uppercase • One number" }
                    </HelperText>
                    <TextInput 
                        mode={"flat"}
                        label={"Confirm Password"}
                        value={confirmPassword.value} 
                        placeholder={'Confirm Password'}
                        onChangeText={handleConfirmPassword}
                        secureTextEntry={secureTextEntry}
                        error={password.value !== confirmPassword.value}
                        right={secureTextEntry ? 
                            <TextInput.Icon 
                                icon='eye' 
                                onPress={handleToggleVisibility}/> : 
                            <TextInput.Icon 
                                icon="eye-off" 
                                onPress={handleToggleVisibility}/>}/>
                    <HelperText
                        type={password.value === confirmPassword.value ? "info" : "error"}>
                        { password.value === confirmPassword.value ? "Password's match" : "Password's must match" }
                    </HelperText>
                    <Button 
                        loading={loading}
                        mode={"contained"} 
                        style={styles.button} 
                        onPress={handlePress}
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
    );
};

export default SavePasswordScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    card: {
        borderColor: theme.colors.primaryContainer,
        borderWidth: 1
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
});
