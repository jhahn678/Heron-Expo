import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { navigationRef } from '../../navigation/navigationRef'
const { width } = Dimensions.get('window')


interface Props {
    visible: boolean
    dismiss: () => void
}

const AuthModal = (props: Props) => {

    const navigateAuth = () => {
        props.dismiss()
        navigationRef.navigate('HomeAuthScreen')
    }

    return (
        <Dialog 
            theme={{ roundness: 1 }}
            visible={props.visible}
            onDismiss={props.dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                Welcome Friend 👋
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    Create an account or sign in to access that, and many 
                    other cool features that Heron offers!
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={props.dismiss}>Dismiss</Button>
                <Button 
                    onPress={navigateAuth}
                    icon='arrow-right' 
                    contentStyle={{ 
                        flexDirection: 'row-reverse'
                    }}
                >Sign in
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default AuthModal;

const styles = StyleSheet.create({
    container: {
        width: width * .9,
        alignSelf: 'center',
        position: 'relative',
        bottom: 72
    },
    title: {
        fontSize: 22,
        fontWeight: '600'
    },
    text: {
        fontWeight: '500',
        lineHeight: 22
    }
});
