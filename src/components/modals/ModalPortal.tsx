import React from "react";
import AuthModal from "./AuthModal";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import { Portal } from "react-native-paper";
import ReauthenticateModal from "./ReauthenticateModal";
import { useModalStore } from '../../store/modal/useModalStore'
import LogoutModal from "./LogoutModal";
import ManageContactModal from "./ManageContactModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import NotificationSnackbar from "./NotificationSnackbar";
import LoadingBackdrop from "../loaders/LoadingBackdrop";
import ReviewModal from "./review/ReviewModal";
import SpeciesBottomSheet from "./SpeciesBottomSheet";
import WaterbodyMediaUploadModal from "./WaterbodyMediaUploadBottomSheet";

const ModalPortal = () => {
    
    const loading = useModalStore(store => store.loading)
    
    return (
        <Portal>
            <AuthModal/>
            <ErrorModal/>
            <LogoutModal/>
            <SuccessModal/>
            <ReauthenticateModal/>
            <ManageContactModal/>
            <ConfirmDeleteModal/>
            <NotificationSnackbar/>
            <ReviewModal/>
            <SpeciesBottomSheet/>
            <WaterbodyMediaUploadModal/>
            { loading && <LoadingBackdrop/> }
        </Portal>
    );
};

export default ModalPortal;

