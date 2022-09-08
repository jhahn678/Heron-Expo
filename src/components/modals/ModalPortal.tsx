import { Portal } from "react-native-paper";
import { useModalStore } from '../../store/modal/useModalStore'
import AuthModal from "./AuthModal";
import ConfirmUploadModal from "./ConfirmUploadModal";
import ReauthenticateModal from "./ReauthenticateModal";
import UploadPartialSuccessModal from "./UploadPartialSuccessModal";

const ModalPortal = () => {
    
    const authVisible = useModalStore(state => state.auth)
    const reauthVisible = useModalStore(state => state.reauthenticate)
    const confirmUploadVisible = useModalStore(state => state.confirmUpload)
    const uploadPartialSuccess = useModalStore(state => state.uploadPartialSuccess)
    const dismiss = useModalStore(state => state.dismiss)
    
    return (
        <Portal>
            <AuthModal visible={authVisible} dismiss={dismiss}/>
            <ReauthenticateModal visible={reauthVisible} dismiss={dismiss}/>
            <ConfirmUploadModal visible={confirmUploadVisible} dismiss={dismiss}/>
            <UploadPartialSuccessModal visible={uploadPartialSuccess} dismiss={dismiss}/>
        </Portal>
    );
};

export default ModalPortal;

