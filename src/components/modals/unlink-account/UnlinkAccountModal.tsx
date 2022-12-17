import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { useUnlinkSocial } from "../../../hooks/mutations/useUnlinkSocial";
import { useCheckAccountHasPassword } from "../../../hooks/queries/useCheckAccountHasPassword";
import { useModalStore } from "../../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../../types/navigation";
import { LinkedAccount } from "../../../types/User";
import { ErrorType } from "../../../utils/conversions/mapErrorTypeToDetails";
import LoadingBackdrop from "../../loaders/LoadingBackdrop";
import { UnlinkAccountAction, UnlinkAccountState } from "./UnlinkAccountModal.reducer";
const { width, height } = Dimensions.get('screen')

const toText = (type: LinkedAccount | null) => 
    type === LinkedAccount.Apple ? 'Apple' 
    : type === LinkedAccount.Facebook ? 'Facebook' 
    : type === LinkedAccount.Google ?  'Google' : ""

interface Props {
    state: UnlinkAccountState
    dispatch: React.Dispatch<UnlinkAccountAction>
    navigation: RootStackScreenProps<'SettingsScreen'>['navigation']
}

const UnlinkAccountModal = ({ state, dispatch, navigation }: Props) => {

    const setError = useModalStore(store => store.setError)
    const setSnack = useModalStore(store => store.setSnack)

    const { unlinkAccount, loading: unlinkLoading } = useUnlinkSocial({ 
        onSuccess: () => { 
            if(state.refetchCallback) 
            state.refetchCallback(); 
            dispatch({ type: 'DISMISS' })
            setSnack('Account unlinked successfully') 
        },
        onError: () => { setError(true, ErrorType.RequestError ) }
    })

    const { hasPassword, loading, success } = useCheckAccountHasPassword({
        onError: () => { setError(true, ErrorType.RequestError ) }
    })

    const handleDismiss = () => dispatch({ type: "DISMISS" })

    const handleConfirm = () => {
        if(hasPassword){
            if(state.accountType) unlinkAccount(state.accountType)
        }else{
            navigation.push('SavePasswordScreen')
        }
    }

    if(loading) return <LoadingBackdrop/>;

    return (
        <Dialog  
            theme={{ roundness: 1 }}
            visible={success}
            onDismiss={handleDismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>{
                hasPassword ? 
                `Are you sure you want to unlink ${toText(state.accountType)}?` :
                'Password Required'
            }</Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>{
                    (hasPassword && state.accountType) ? 
                        'If you change your mind, you can relink this account ' +
                        'at any time.' :
                        'Your account currently has no password registered. ' +
                        `Before you unlink your ${toText(state.accountType)} account, ` +  
                        'you must register a password so you can still login.' 
                }</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleDismiss}>Cancel</Button>
                <Button 
                    loading={unlinkLoading}
                    onPress={handleConfirm}
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
        bottom: height * .1,
        backgroundColor: '#fff'
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
