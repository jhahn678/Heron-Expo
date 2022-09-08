import AuthModal from "./AuthModal";
import ErrorModal from "./ErrorModal";
import { Portal } from "react-native-paper";
import ConfirmUploadModal from "./ConfirmUploadModal";
import UploadSuccessModal from "./UploadSuccessModal";
import ReauthenticateModal from "./ReauthenticateModal";
import { useModalStore } from '../../store/modal/useModalStore'
import UploadPartialSuccessModal from "./UploadPartialSuccessModal";

const ModalPortal = () => {
    
    const dismiss = useModalStore(state => state.dismiss)
    const authVisible = useModalStore(state => state.auth)
    const errorVisible = useModalStore(state => state.error)
    const reauthVisible = useModalStore(state => state.reauthenticate)
    const uploadSuccessful = useModalStore(state => state.uploadSuccess)
    const confirmUploadVisible = useModalStore(state => state.confirmUpload)
    const uploadPartialSuccess = useModalStore(state => state.uploadPartialSuccess)
    
    return (
        <Portal>
            <AuthModal visible={authVisible} dismiss={dismiss}/>
            <ErrorModal visible={errorVisible} dismiss={dismiss}/>
            <ReauthenticateModal visible={reauthVisible} dismiss={dismiss}/>
            <UploadSuccessModal visible={uploadSuccessful} dismiss={dismiss}/>
            <ConfirmUploadModal visible={confirmUploadVisible} dismiss={dismiss}/>
            <UploadPartialSuccessModal visible={uploadPartialSuccess} dismiss={dismiss}/>
        </Portal>
    );
};

export default ModalPortal;

