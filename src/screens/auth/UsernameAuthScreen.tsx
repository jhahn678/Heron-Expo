import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../../types/navigation";
import { useCheckUsernameAvailability } from "../../hooks/queries/useCheckUsernameAvailability";
import { ActivityIndicator, TextInput, Button, Text, HelperText, Card } from "react-native-paper";
import { useChangeUsername } from "../../hooks/mutations/useChangeUsername";
import { useAuth } from "../../store/auth/useAuth";
import { theme } from "../../config/theme";
import { useModalStore } from "../../store/modal/useModalStore";


const UsernameAuthScreen = ({ navigation }: RootStackScreenProps<'UsernameAuthScreen'>) => {

    const [input, setInput] = useState('')

    const setUser = useAuth(store => store.setDetails)
    const setSnack = useModalStore(store => store.setSnack)

    const username = useCheckUsernameAvailability(input)

    const { changeUsername, loading } = useChangeUsername({
        onSuccess: ({ username }) => {
            setUser({ username }); 
            navigation.navigate('UserDetailsAuthScreen')
        },
        onError: () => {
            setSnack('Error saving username')
        }
    })

    const handleChangeUsername = () => changeUsername(input)

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                <Text variant={"titleMedium"} style={styles.title}>
                    Choose a username for your account
                </Text>
                <TextInput 
                    mode={"flat"}
                    value={input} 
                    autoFocus={true}
                    label={'Username'}
                    onChangeText={setInput}
                    error={username.touched && (!username.available || !username.valid)}
                    left={<TextInput.Affix text="@" textStyle={{ 
                        color: !username.touched || (username.available && username.valid) ? 
                            theme.colors.primary : theme.colors.error 
                    }}/>}
                    right={<TextInput.Icon icon={() => (
                        <ActivityIndicator animating={username.loading}/>
                    )}/>}
                />
                <HelperText 
                    style={styles.helper}
                    type={!username.touched || (username.available && username.valid) ? 
                        "info" : "error"}>
                    { 
                        !username.touched ? "Minimum 6 characters required" : 
                        username.error ? "Could not verify username" : 
                        !username.valid ? "Username not valid - Minimum 6 characters" : 
                        !username.available ? "Username already in use" : 
                        "Username available" 
                    }
                </HelperText>
                <Button 
                    mode='contained' 
                    loading={loading}
                    style={styles.button}
                    onPress={handleChangeUsername} 
                    disabled={!username.available || !username.valid || username.error}
                    theme={{ 
                        roundness: 1, 
                        colors: {
                            surfaceDisabled: theme.colors.surfaceVariant, 
                            onPrimary: (username.available && username.valid) ? 
                                "#fff" : theme.colors.surfaceVariant
                        } 
                    }}
                >Next</Button>
                </Card.Content>
            </Card>
        </View>
    );
};

export default UsernameAuthScreen;

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
    helper: {
        marginBottom: 4
    },
    button: {
        marginTop: 8
    }
});
