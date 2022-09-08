import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";

interface Props {
    visible: boolean
    dismiss: () => void
}

const ErrorModal = (props: Props) => {

    return (
        <Dialog 
            theme={{ roundness: 2 }}
            visible={props.visible}
            onDismiss={props.dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                Something went wrong 😵‍💫
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    You may need to refresh the app and try again
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
