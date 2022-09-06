import { Portal } from "react-native-paper";
import { useModalStore } from '../../store/modal/useModalStore'
import AuthModal from "./AuthModal";

const ModalPortal = () => {
    
    const authVisible = useModalStore(state => state.authVisible)
    const dismiss = useModalStore(state => state.dismiss)
    
    return (
        <Portal>
            <AuthModal visible={authVisible} dismiss={dismiss}/>
        </Portal>
    );
};

export default ModalPortal;

