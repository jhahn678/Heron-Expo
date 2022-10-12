import React from "react";
import AuthModal from "./AuthModal";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import { ActivityIndicator, Portal, Snackbar } from "react-native-paper";
import ReauthenticateModal from "./ReauthenticateModal";
import { useModalStore } from '../../store/modal/useModalStore'
import LogoutModal from "./LogoutModal";
import ManageContactModal from "./ManageContactModal";
import { View, StyleSheet } from "react-native";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ModalPortal = () => {
    
    const dismiss = useModalStore(state => state.dismiss)
    const authVisible = useModalStore(state => state.auth)
    const errorVisible = useModalStore(state => state.error)
    const logoutVisible = useModalStore(state => state.logout)
    const successVisible = useModalStore(state => state.success)
    const loadingVisible = useModalStore(store => store.loading)
    const reauthVisible = useModalStore(state => state.reauthenticate)
    const manageContactVisible = useModalStore(store => store.manageContact)
    const confirmDeleteVisible = useModalStore(store => store.confirmDelete)
    const onConfirmDelete = useModalStore(store => store.confirmDeleteCallback)
    const confirmDeleteMessage = useModalStore(store => store.confirmDeleteMessage)

    const snack = useModalStore(state => ({
        visible: state.snack,
        text: state.snackText,
        dismiss: () => state.setSnack(false)
    }))
    
    return (
        <Portal>
            <AuthModal visible={authVisible} dismiss={dismiss}/>
            <ErrorModal visible={errorVisible} dismiss={dismiss}/>
            <LogoutModal visible={logoutVisible} dismiss={dismiss}/>
            <SuccessModal visible={successVisible} dismiss={dismiss}/>
            <ReauthenticateModal visible={reauthVisible} dismiss={dismiss}/>
            <ManageContactModal visible={manageContactVisible} dismiss={dismiss}/>
            <ConfirmDeleteModal 
                dismiss={dismiss} 
                onConfirm={onConfirmDelete}
                message={confirmDeleteMessage}
                visible={confirmDeleteVisible} 
            />
            <Snackbar 
                visible={snack.visible} 
                onDismiss={snack.dismiss} 
                action={{ label: 'close', onPress: snack.dismiss }}
            >
                {snack.text}
            </Snackbar>
            { loadingVisible && 
                <View style={styles.backdrop}>
                    <ActivityIndicator style={styles.loader} size={64}/>
                </View>
            }
        </Portal>
    );
};

export default ModalPortal;

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        zIndex: 1000,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.2)'
    },
    loader: {
        position: 'absolute',
        zIndex: 1001,
    }
})
