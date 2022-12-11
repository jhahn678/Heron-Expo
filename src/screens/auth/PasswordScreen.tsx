import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../types/navigation";
import { TextInput, Button, Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAddAccountPassword } from "../../hooks/mutations/useAddAccountPassword";
import { useModalStore } from "../../store/modal/useModalStore";
import { ErrorType } from "../../utils/conversions/mapErrorTypeToDetails";
import { theme } from "../../config/theme";
const { width } = Dimensions.get('screen')

const PasswordScreen = ({ navigation }: RootStackScreenProps<'PasswordScreen'>) => {

    const [password, setPassword] = useState('')
    const [firstInput, setFirstInput] = useState(true)
    const [valid, setValid] = useState(false)
    const regex = /[a-zA-Z0-9!@#$%^&*.]{7,30}/g

    const setSnack = useModalStore(store => store.setSnack)
    const setError = useModalStore(store => store.setError)

    const { addAccountPassword, loading } = useAddAccountPassword({ 
        onSuccess: () => { setSnack('Password saved successfully'); navigation.goBack() },
        onError: () => setError(true, ErrorType.RequestError)
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            if(password.length > 6) setFirstInput(false)
            setValid(regex.test(password))
        },200)
        return () => clearTimeout(timer)
    },[password])

    const handlePress = () => {
        if(valid) addAccountPassword(password)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.caption}>{
                password.length < 7 && firstInput ? 
                    'Choose a password' + 
                    '\n  •  Minimum seven characters' +
                    '\n  •  Maximum 30 characters' +
                    '\n  •  Allowed special characters: ! @ # $ % ^ & * .'
                : valid ? 
                    'Password is valid' 
                :
                    'Password is invalid  •  ' + 
                    'Minimum seven characters  •  ' +
                    'Maximum 30 characters  •  ' +
                    'Allowed special characters: ! @ # $ % ^ & * .' 
            }</Text>
            <TextInput 
                autoFocus={true}
                value={password} 
                label={'Password'}
                mode='outlined' 
                error={valid === false && firstInput === false}
                onChangeText={setPassword}
                right={<TextInput.Icon icon={({ size, color }) => valid ? 
                    <Icon name='check' size={size} color={theme.colors.tertiary}/> : 
                    <Icon name='alert-circle' size={size} color={firstInput ? color : theme.colors.error}/>
                } />}
            />
            <Button 
                mode='contained' 
                onPress={handlePress} 
                theme={{ roundness: 2 }}
                style={styles.button}
                disabled={!valid}
                loading={loading}
            >Save Password</Button>
        </View>
    );
};

export default PasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    caption: {  
        fontSize: 16,
        marginBottom: 16
    },
    button: {
        marginTop: 24,
        width: width - 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
