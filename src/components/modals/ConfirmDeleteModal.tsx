import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { useModalStore } from "../../store/modal/useModalStore";

const ConfirmDeleteModal = () => {

    const dismiss = useModalStore(state => state.dismiss)
    const visible = useModalStore(store => store.confirmDelete)
    const message = useModalStore(store => store.confirmDeleteMessage)
    const onConfirm = useModalStore(store => store.confirmDeleteCallback)

    const handleConfirm = () => {
        if(onConfirm) 
        onConfirm().then(() => dismiss())
    }

    return (
        <Dialog 
            theme={{ roundness: 1 }}
            visible={visible}
            onDismiss={dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                Confirm Delete
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    {message}
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={dismiss}>Dismiss</Button>
                <Button onPress={handleConfirm}>Delete</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default ConfirmDeleteModal;

const styles = StyleSheet.create({
    container: {
        height: 200,
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

