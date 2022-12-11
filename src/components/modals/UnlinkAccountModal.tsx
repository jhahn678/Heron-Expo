import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { theme } from "../../config/theme";
import { useUnlinkSocial } from "../../hooks/mutations/useUnlinkSocial";
import { useCheckAccountHasPassword } from "../../hooks/queries/useCheckAccountHasPassword";
import { useModalStore } from "../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../types/navigation";
import { LinkedAccount } from "../../types/User";
import { ErrorType } from "../../utils/conversions/mapErrorTypeToDetails";
import LoadingBackdrop from "../loaders/LoadingBackdrop";
const { width } = Dimensions.get('screen')

const toText = (type: LinkedAccount | null) => type === LinkedAccount.Apple ? 
    'Apple' : type === LinkedAccount.Facebook ? 'Facebook' : 'Google'

interface Props {
    navigation: RootStackScreenProps<'SettingsScreen'>['navigation']
}

const UnlinkAccountModal = ({ navigation }: Props) => {

    const dismiss = useModalStore(store => store.dismiss)
    const setError = useModalStore(store => store.setError)
    const setSnack = useModalStore(store => store.setSnack)
    const accountType = useModalStore(store => store.unlinkAccountType)
    const refetchCallback = useModalStore(store => store.unlinkRefetchCallback)

    const { unlinkAccount, loading: unlinkLoading } = useUnlinkSocial({ 
        onSuccess: () => { 
            if(refetchCallback) refetchCallback(); 
            dismiss(); setSnack('Account unlinked successfully') 
        },
        onError: () => { setError(true, ErrorType.RequestError ) }
    })

    const { hasPassword, loading, success } = useCheckAccountHasPassword({
        onError: () => { setError(true, ErrorType.RequestError ) }
    })

    const handleConfirm = () => {
        if(hasPassword && accountType){
            unlinkAccount(accountType)
        }else{
            navigation.push('PasswordScreen')
        }
    }

    if(loading) return ( <LoadingBackdrop/> )

    return (
        <Dialog 
            theme={{ roundness: 2 }}
            visible={success}
            onDismiss={dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>{
                hasPassword ? 
                `Are you sure you want to unlink ${toText(accountType)}?` :
                'Password Required'
            }</Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>{
                    hasPassword ? 
                        'If you change your mind, you can relink this account ' +
                        'at any time.' :
                        'Your account currently has no password registered. ' +
                        `Before you unlink your ${toText(accountType)} account, ` +  
                        'you must register a password so you can still login.' 
                }</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button 
                onPress={dismiss} 
                textColor={theme.colors.onPrimaryContainer}
                >Cancel</Button>
                <Button 
                loading={unlinkLoading}
                onPress={handleConfirm}
                style={{ marginLeft: 16 }} 
                >{hasPassword ? "Unlink Accounts" : "Set My Password" }</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default UnlinkAccountModal;


const styles = StyleSheet.create({
    container: {
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
