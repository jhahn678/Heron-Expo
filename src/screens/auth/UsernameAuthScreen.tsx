import { Dimensions, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../../types/navigation";
import { useCheckUsernameAvailability } from "../../hooks/queries/useCheckUsernameAvailability";
import { ActivityIndicator, TextInput, Button, Text } from "react-native-paper";
import * as SecureStore from 'expo-secure-store'
import { SecureStoreKeys } from "../../types/SecureStore";
import { useChangeUsername } from "../../hooks/mutations/useChangeUsername";
import { useAuth } from "../../store/auth/useAuth";
import { theme } from "../../config/theme";
import { useModalStore } from "../../store/modal/useModalStore";
const { width } = Dimensions.get('screen')


const UsernameAuthScreen = (props: RootStackScreenProps<'UsernameAuthScreen'>) => {

    const [username, setUsername] = useState('')
    const setUser = useAuth(store => store.setDetails)
    const setAuthenticated = useAuth(store => store.setAuthenticated)
    const { isAvailable, isLoading, isError } = useCheckUsernameAvailability(username)
    const setSnack = useModalStore(store => store.setSnack)
    const changeUsername = useChangeUsername()

    const handlePress = async () => {
        const token = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
        if(!token) return;
        const res = await changeUsername({ token, username })
        if(!res) return;
        setUser({ username: res.username })
        setAuthenticated(true)
        setSnack('Account created successfully')
    }

    return (
        <View style={styles.container}>
                <Text style={styles.caption}>{
                    username.length < 5 ? 
                        'Choose a username  •  Minimum five characters' 
                    : !isAvailable ? 
                        'Username is already in use' 
                    : isError ? 
                        'Username not valid'
                    : null
                }</Text>
            <TextInput 
                autoFocus={true}
                value={username} 
                label={'Username'}
                mode='outlined' 
                error={isError}
                onChangeText={setUsername}
                left={<TextInput.Affix text="@" textStyle={{ color: theme.colors.primary }}/>}
                right={<TextInput.Icon icon={() => <ActivityIndicator animating={isLoading}/>} />}
            />
            <Button 
                mode='contained' 
                onPress={handlePress} 
                theme={{ roundness: 2 }}
                style={styles.button}
                disabled={!isAvailable || isError}
            >Get Started</Button>
        </View>
    );
};

export default UsernameAuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    caption: {  
        fontSize: 16,
        marginBottom: 8
    },
    button: {
        marginTop: 16,
        width: width - 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
