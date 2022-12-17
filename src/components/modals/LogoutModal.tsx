import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Button, Dialog } from "react-native-paper";
import { useAuth } from "../../store/auth/useAuth";
import { useModalStore } from "../../store/modal/useModalStore";
import { useApolloClient } from "@apollo/client";
import { navigationRef } from "../../navigation/navigationRef";

const { width } = Dimensions.get('screen')

interface Props {
    visible: boolean
    dismiss: () => void
}

const LogoutModal = ({ visible, dismiss }: Props) => {

    const { signOut } = useAuth()
    const setLogoutVisible = useModalStore(store => store.setLogout)
    const shouldGoBack = useModalStore(store => store.onLogoutGoBack)
    const cache = useApolloClient()

    const handleSignOut = async () => {
        await signOut();
        await cache.clearStore()
        setLogoutVisible({ visible: false })
        if(shouldGoBack) navigationRef.goBack()
    }

    return (
        <Dialog 
            theme={{ roundness: 1 }} 
            visible={visible} 
            onDismiss={dismiss} 
            style={styles.dialog}>
            <Dialog.Title style={styles.title}>
                Are you sure you want to sign out?
            </Dialog.Title>
            <Dialog.Actions>
                <Button onPress={dismiss}>Cancel</Button>
                <Button onPress={handleSignOut}>Sign out</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default LogoutModal;

const styles = StyleSheet.create({
    dialog: {
        position: 'relative',
        bottom: '10%'
    },
    title: {
        fontSize: 16,
    },
});
