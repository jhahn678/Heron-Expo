import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { useModalStore } from "../../store/modal/useModalStore";

interface Props {
    visible: boolean
    dismiss: () => void
}

const ErrorModal = (props: Props) => {
    
    const { message, title } = useModalStore(state => ({
        message: state.errorMessage,
        title: state.errorTitle
    }))

    return (
        <Dialog 
            theme={{ roundness: 2 }}
            visible={props.visible}
            onDismiss={props.dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                {title ? title : 'Something went wrong 😵‍💫'}
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    {message ? message : 'You may need to refresh the app and try again'}
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={props.dismiss}>Dismiss</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default ErrorModal;

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
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
