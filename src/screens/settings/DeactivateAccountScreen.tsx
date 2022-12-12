import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, Card } from "react-native-paper";
import DangerBanner from "../../components/banners/DangerBanner";
import LoadingBackdrop from "../../components/loaders/LoadingBackdrop";
import { theme } from "../../config/theme";
import { useDeleteAccount } from "../../hooks/mutations/useDeleteAccount";
import { useAuth } from "../../store/auth/useAuth";
import { useModalStore } from "../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../types/navigation";

const DeactivateAccountScreen = ({ navigation }: RootStackScreenProps<"DeactivateAccountScreen">) => {

    const setSnack = useModalStore(store => store.setSnack)
    const username = useAuth(store => store.username)
    const resetAuth = useAuth(store => store.resetAuth)

    const [input, setInput] = useState("")
    const [valid, setValid] = useState(false)

    useEffect(() => {
        if(username === null) return setValid(false)
        setValid(username.toLowerCase() === input.toLowerCase())
    },[username, input])

    const { deleteAccount, loading: deleteAccountLoading } = useDeleteAccount({
        onSuccess: () => {
            setSnack('Account successfully deleted')
            resetAuth()
            navigation.navigate("MainTabs", { 
                screen: "ExploreStack",
                params: { screen: "ExploreScreen" } 
            })
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
            <DangerBanner description="This action cannot be undone" style={styles.warning}/>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant={"titleMedium"}>
                Please type in your username to confirm
            </Text>
            <Text style={styles.text} variant={"titleMedium"}>
                {username ? username.toUpperCase() : undefined}
            </Text>
            <TextInput 
                mode={"flat"} 
                label={"Username"}
                style={styles.input}
                value={input}
                onChangeText={setInput} 
                placeholder={username || ""}
                theme={{ colors: {
                    surfaceVariant: theme.colors.errorContainer, 
                    primary: theme.colors.error 
                }}}/>
            <Button 
                disabled={!valid}
                mode={"contained-tonal"}
                onPress={deleteAccount}
                theme={{ 
                    roundness: 1, 
                    colors: {
                        secondaryContainer: theme.colors.error,
                        surfaceDisabled: theme.colors.errorContainer, 
                        onSecondaryContainer: valid ? "#fff" : theme.colors.errorContainer
                    } 
                }}
            >Deactivate Account</Button>
                </Card.Content>
            </Card>
            {deleteAccountLoading && <LoadingBackdrop loaderStyle={styles.loader}/>}
        </View>
    )
}

export default DeactivateAccountScreen;

const styles = StyleSheet.create({
    container: {
        padding: 8
    },
    card: {
        borderColor: theme.colors.errorContainer,
        borderWidth: 1
    },
    text: {
        fontStyle: 'italic',
        marginTop: 16,
        fontWeight: '700'
    },
    warning: {
        borderRadius: 6,
        marginBottom: 8
    },
    input: {
        marginTop: 24,
        marginBottom: 16,
    },
    loader: {
        position: 'absolute',
        top: 150
    }
})