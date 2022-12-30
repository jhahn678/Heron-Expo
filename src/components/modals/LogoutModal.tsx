import React from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { useAuth } from "../../store/auth/useAuth";
import { useModalStore } from "../../store/modal/useModalStore";
import { useApolloClient } from "@apollo/client";
import { navigationRef } from "../../navigation/navigationRef";

const LogoutModal = () => {

    const signOut = useAuth(store => store.signOut)
    const dismiss = useModalStore(state => state.dismiss)
    const setVisible = useModalStore(store => store.setLogout)
    const visible = useModalStore(state => state.logout)
    const shouldGoBack = useModalStore(store => store.onLogoutGoBack)
    const apolloClient = useApolloClient()
    

    const handleSignOut = async () => {
        await signOut();
        await apolloClient.clearStore()
        setVisible({ visible: false })
        if(shouldGoBack) navigationRef.goBack()
    }

    return (
        <Dialog 
            visible={visible} 
            onDismiss={dismiss} 
            style={styles.dialog}
            theme={{ roundness: 1 }}>
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
        bottom: 100,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 16,
    },
});
