import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { navigationRef } from '../../navigation/navigationRef'


interface Props {
    visible: boolean
    dismiss: () => void
}

const ReauthenticateModal = (props: Props) => {

    const navigateAuth = () => {
        props.dismiss()
        navigationRef.navigate('LoginAuthScreen')
    }

    return (
        <Dialog 
            theme={{ roundness: 2 }}
            visible={props.visible}
            onDismiss={props.dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                An error occured 🫤
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    It looks like you need to login again.
                    Don't worry, if you were in the middle of something,
                    your progress will be saved.
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
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

export default ReauthenticateModal;

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
