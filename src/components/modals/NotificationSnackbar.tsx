import React from "react";
import { Snackbar } from "react-native-paper";
import { useModalStore } from "../../store/modal/useModalStore";

const NotificationSnackbar = () => {

    const visible = useModalStore(store => store.snack)
    const text = useModalStore(store => store.snackText)
    const setVisible = useModalStore(store => store.setSnack)
    const dismiss = () => setVisible(false)

    return (
        <Snackbar 
            visible={visible} 
            onDismiss={dismiss} 
            action={{ label: 'close', onPress: dismiss }}
        >{text}</Snackbar>
    );
};

export default NotificationSnackbar;