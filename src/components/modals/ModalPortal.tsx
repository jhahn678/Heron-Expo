import React from "react";
import AuthModal from "./AuthModal";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import { ActivityIndicator, Portal, Snackbar } from "react-native-paper";
import ConfirmUploadModal from "./ConfirmUploadModal";
import ReauthenticateModal from "./ReauthenticateModal";
import { useModalStore } from '../../store/modal/useModalStore'
import SpeciesBottomSheet from "./SpeciesBottomSheet";
import LogoutModal from "./LogoutModal";
import ManageContactModal from "./ManageContactModal";
import { View, StyleSheet } from "react-native";
import { theme } from "../../config/theme";

const ModalPortal = () => {
    
    const dismiss = useModalStore(state => state.dismiss)
    const loadingVisible = useModalStore(store => store.loading)
    const authVisible = useModalStore(state => state.auth)
    const errorVisible = useModalStore(state => state.error)
    const logoutVisible = useModalStore(state => state.logout)
    const successVisible = useModalStore(state => state.success)
    const reauthVisible = useModalStore(state => state.reauthenticate)
    const confirmUploadVisible = useModalStore(state => state.confirmUpload)
    const manageContactVisible = useModalStore(store => store.manageContact)

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
            <ConfirmUploadModal visible={confirmUploadVisible} dismiss={dismiss}/>
            <ManageContactModal visible={manageContactVisible} dismiss={dismiss}/>
            <Snackbar visible={snack.visible} onDismiss={snack.dismiss} action={{ label: 'close', onPress: snack.dismiss }}>
                {snack.text}
            </Snackbar>
            <SpeciesBottomSheet/>
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
