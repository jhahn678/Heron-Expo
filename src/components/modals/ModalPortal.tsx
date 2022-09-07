import { Portal } from "react-native-paper";
import { useModalStore } from '../../store/modal/useModalStore'
import AuthModal from "./AuthModal";
import ReauthenticateModal from "./ReauthenticateModal";

const ModalPortal = () => {
    
    const authVisible = useModalStore(state => state.authVisible)
    const reauthenticate = useModalStore(state => state.reauthenticate)
    const dismiss = useModalStore(state => state.dismiss)
    
    return (
        <Portal>
            <AuthModal visible={authVisible} dismiss={dismiss}/>
            <ReauthenticateModal visible={reauthenticate} dismiss={dismiss}/>
        </Portal>
    );
};

export default ModalPortal;

