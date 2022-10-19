import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";

interface Props {
    visible: boolean
    message: string | null
    dismiss: () => void
    onConfirm: (() => Promise<void>) | null
}

const ConfirmDeleteModal = (props: Props) => {

    const handleConfirm = () => {
        if(props.onConfirm) 
        props.onConfirm().then(props.dismiss)
    }

    return (
        <Dialog 
            theme={{ roundness: 2 }}
            visible={props.visible}
            onDismiss={props.dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                Confirm Delete
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    {props.message}
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={props.dismiss}>Dismiss</Button>
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

