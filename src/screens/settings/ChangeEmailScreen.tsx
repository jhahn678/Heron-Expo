import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Text, ActivityIndicator, Button, Card } from "react-native-paper";
import LoadingBackdrop from "../../components/loaders/LoadingBackdrop";
import { theme } from "../../config/theme";
import { useChangeEmail } from "../../hooks/mutations/useChangeEmail";
import { useCheckEmailAvailability } from "../../hooks/queries/useCheckEmailAvailability";
import { useModalStore } from "../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../types/navigation";

const ChangeEmailScreen = ({ navigation }: RootStackScreenProps<"ChangeEmailScreen">) => {

    const [email, setEmail] = useState({ value: "", touched: false })
    const handleEmail = (value: string) => setEmail({ value, touched: true })
    const { available, loading: emailLoading, error: emailError } = useCheckEmailAvailability(email.value)
    const setSnack = useModalStore(store => store.setSnack)

    const { changeEmail, loading } = useChangeEmail({
        onSuccess: () => {
            setSnack("Email successfully changed")
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

    const handleChangeEmail = () => changeEmail(email.value)

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant={"titleMedium"} style={styles.title}>
                        Please enter a new email
                    </Text>
                    <TextInput 
                        autoFocus={true}
                        mode={"flat"}
                        label={"Email"}
                        style={styles.input}
                        value={email.value} 
                        placeholder={"Email"}
                        onChangeText={handleEmail}
                        error={email.touched && (!available || emailError)}
                        right={<TextInput.Icon icon={
                            () => <ActivityIndicator animating={emailLoading}/>
                        }/>}/>
                    <Button 
                        loading={loading}
                        mode={'contained'}
                        style={styles.button} 
                        onPress={handleChangeEmail}
                        disabled={!available}
                        theme={{ 
                            roundness: 1, 
                            colors: {
                                surfaceDisabled: theme.colors.surfaceVariant, 
                                onPrimary: available ? "#fff" : theme.colors.surfaceVariant
                            } 
                        }}
                    >Save Email</Button>
                </Card.Content>
            </Card>
            {loading && <LoadingBackdrop loaderStyle={styles.loader}/>}
        </View>
    )
}

export default ChangeEmailScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    card: {
        borderColor: theme.colors.primaryContainer,
        borderWidth: 1
    },
    input: {
        marginTop: 24,
        marginBottom: 16,
    },
    title: {
        marginBottom: 4,
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