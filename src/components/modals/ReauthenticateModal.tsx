import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { navigationRef } from '../../navigation/navigationRef'
import { useAuth } from "../../store/auth/useAuth";
import { useModalStore } from "../../store/modal/useModalStore";
const { width } = Dimensions.get('window')

const ReauthenticateModal = () => {

    const resetAuth = useAuth(store => store.resetAuth)
    const dismiss = useModalStore(state => state.dismiss)
    const visible = useModalStore(state => state.reauthenticate)

    const navigateAuth = () => resetAuth().then(() => {
        dismiss();
        navigationRef.navigate('LoginAuthScreen')
    })

    return (
        <Dialog 
            visible={visible}
            theme={{ roundness: 1 }}
            onDismiss={dismiss}
            style={styles.container}>
            <Dialog.Title style={styles.title}>
                An error occured 😕
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
                    contentStyle={{ flexDirection: 'row-reverse'}}
                >Sign in</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default ReauthenticateModal;

const styles = StyleSheet.create({
    container: {
        height: 220,
        width: width * .9,
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
