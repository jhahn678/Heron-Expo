import React from "react";
import AuthModal from "./AuthModal";
import ErrorModal from "./ErrorModal";
import ReviewModal from "./ReviewModal";
import SuccessModal from "./SuccessModal";
import { Portal, Snackbar } from "react-native-paper";
import ConfirmUploadModal from "./ConfirmUploadModal";
import ReauthenticateModal from "./ReauthenticateModal";
import { useModalStore } from '../../store/modal/useModalStore'
import SpeciesBottomSheet from "./SpeciesBottomSheet";
import LogoutModal from "./LogoutModal";

const ModalPortal = () => {
    
    const dismiss = useModalStore(state => state.dismiss)
    const authVisible = useModalStore(state => state.auth)
    const errorVisible = useModalStore(state => state.error)
    const logoutVisible = useModalStore(state => state.logout)
    const reviewVisible = useModalStore(state => state.review)
    const successVisible = useModalStore(state => state.success)
    const reauthVisible = useModalStore(state => state.reauthenticate)
    const confirmUploadVisible = useModalStore(state => state.confirmUpload)

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
            <ReviewModal visible={reviewVisible} dismiss={dismiss}/>
            <SuccessModal visible={successVisible} dismiss={dismiss}/>
            <ReauthenticateModal visible={reauthVisible} dismiss={dismiss}/>
            <ConfirmUploadModal visible={confirmUploadVisible} dismiss={dismiss}/>
            <Snackbar visible={snack.visible} onDismiss={snack.dismiss} action={{ label: 'close', onPress: snack.dismiss }}>
                {snack.text}
            </Snackbar>
            <SpeciesBottomSheet/>
        </Portal>
    );
};

export default ModalPortal;

