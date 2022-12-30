import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { useModalStore } from "../../store/modal/useModalStore";

const SuccessModal = () => {

    const dismiss = useModalStore(state => state.dismiss)
    const visible = useModalStore(state => state.success)
    const { message, title } = useModalStore(state => ({
        message: state.successMessage,
        title: state.successTitle
    }))

    return (
        <Dialog 
            theme={{ roundness: 1 }}
            visible={visible}
            onDismiss={dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                {title}
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    {message}
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={dismiss}>
                    Dismiss
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default SuccessModal;

const styles = StyleSheet.create({
    container: {
        height: 210,
        width: '90%',
        alignSelf: 'center',
        position: 'relative',
        bottom: '10%'
    },
    title: {
        fontSize: 22,
        fontWeight: '600'
    },
    text: {
        fontWeight: '500',
        lineHeight: 20
    }
});
