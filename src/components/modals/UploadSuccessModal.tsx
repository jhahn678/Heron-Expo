import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";

interface Props {
    visible: boolean
    dismiss: () => void
}

const UploadSuccessModal = (props: Props) => {

    return (
        <Dialog 
            theme={{ roundness: 2 }}
            visible={props.visible}
            onDismiss={props.dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                Thank you for contributing! 😄
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    Your images have been successfully saved.
                    Uploading images is a huge help, not only to us,
                    but the rest of the community as well!
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={props.dismiss}>Dismiss</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default UploadSuccessModal;

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
