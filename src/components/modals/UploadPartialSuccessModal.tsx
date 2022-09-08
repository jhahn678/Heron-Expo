import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";

interface Props {
    visible: boolean
    dismiss: () => void
}

const UploadPartialSuccessModal = (props: Props) => {

    return (
        <Dialog 
            theme={{ roundness: 2 }}
            visible={props.visible}
            onDismiss={props.dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                There was an issue 🤔
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    Some of the images you attempted to upload could not be processed.
                    The problem may have been their file format.
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={props.dismiss}>Dismiss</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default UploadPartialSuccessModal;

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
