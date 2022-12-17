import React, { useReducer } from "react";
import { ActivityIndicator, List } from 'react-native-paper'
import { StyleSheet, Platform } from "react-native";
import { useGetMyAccount } from "../../../../hooks/queries/useGetMyAccount";
import { useModalStore } from "../../../../store/modal/useModalStore";
import { LinkedAccount } from "../../../../types/User";
import { RootStackScreenProps } from "../../../../types/navigation";
import { theme } from "../../../../config/theme";
import LoadingBackdrop from "../../../../components/loaders/LoadingBackdrop";
import UnlinkAccountModal from "../../../../components/modals/unlink-account/UnlinkAccountModal";
import { reducer as unlinkAccountReducer, initialState } from "../../../../components/modals/unlink-account/UnlinkAccountModal.reducer";
import { useLinkGoogleAccount } from "../../../../hooks/mutations/useLinkGoogleAccount";
import { useLinkFacebookAccount } from "../../../../hooks/mutations/useLinkFacebookAccount";
import { useLinkAppleAccount } from "../../../../hooks/mutations/useLinkAppleAccount";

interface Props {
    navigation: RootStackScreenProps<'SettingsScreen'>['navigation']
}

const AccountSection = ({ navigation }: Props) => {

    const { data, isLoading, refetch } = useGetMyAccount()
    const setLogout = useModalStore(store => store.setLogout)
    const handlePressEmail = () => navigation.navigate("ChangeEmailScreen")
    const handlePressDeactivate = () => navigation.navigate("DeactivateAccountScreen")
    const handleChangePassword = () => navigation.navigate("ChangePasswordScreen")
    const handleLogout = () => setLogout({ visible: true, onLogoutGoBack: true })

    const { promptGoogleLogin } = useLinkGoogleAccount({ onSuccess: refetch })
    const { promptFacebookLogin } = useLinkFacebookAccount({ onSuccess: refetch })
    const { promptAppleLogin } = useLinkAppleAccount({ onSuccess: refetch })
    const [unlinkAccountState, unlinkAccountDispatch] = useReducer(unlinkAccountReducer, initialState)

    const handleUnlinkAccount = (accountType: LinkedAccount) => {
        unlinkAccountDispatch({ 
            type: "SHOW", 
            values: { 
                accountType, 
                refetchCallback: refetch 
            }
        })
    }

    //Test create account then remove -- should prompt for password and save properly
    //Test flow with apple
    //Test flow with facebook

    const handleLinkedAccount = (accountType: LinkedAccount) => () => {
        if(accountType === LinkedAccount.Apple){
            if(!data?.apple_id) return promptAppleLogin();
        }else if(accountType === LinkedAccount.Facebook){
            if(!data?.facebook_id) return promptFacebookLogin();
        }else if(accountType === LinkedAccount.Google){
            if(!data?.google_id) return promptGoogleLogin();
        }
        handleUnlinkAccount(accountType)
    }

    return (
        <>
        <List.Section>
            <List.Subheader style={styles.title}>Account</List.Subheader>
            <List.Item 
                title={"Email"}
                description={data ? 
                    (data.email || 'No email registered') : 
                    <ActivityIndicator size={'small'}/>}
                descriptionStyle={data?.email ? styles.linked : undefined}
                right={() => <List.Icon icon={data?.email ? 'email-edit' : 'email-plus'}/>}
                onPress={handlePressEmail}/>
            <List.Item 
                title={"Google"}
                description={data?.google_id ? "Connected" : "Connect to Google"} 
                descriptionStyle={data?.google_id ? styles.linked : undefined}
                right={() => <List.Icon icon={"google"}/>}
                onPress={handleLinkedAccount(LinkedAccount.Google)}/>
            <List.Item 
                title={"Facebook"}
                description={data?.facebook_id ? "Connected" : "Connect to Facebook"} 
                descriptionStyle={data?.facebook_id ? styles.linked : undefined}
                right={() => <List.Icon icon={"facebook"}/>}
                onPress={handleLinkedAccount(LinkedAccount.Facebook)}/>
            { Platform.OS === "ios" && 
                <List.Item 
                    title={"Apple"}
                    description={data?.apple_id ? "Connected" : "Connect to Apple"} 
                    descriptionStyle={data?.apple_id ? styles.linked : undefined}
                    right={() => <List.Icon icon={"apple"}/>}
                    onPress={handleLinkedAccount(LinkedAccount.Apple)}/> }
            <List.Item 
                title={"Change my password"}
                right={() => <List.Icon icon={"key"}/>}
                onPress={handleChangePassword}/>
            <List.Item 
                title="Deactivate Account" 
                onPress={handlePressDeactivate}
                right={() => <List.Icon icon='account-off'/>}/>
            <List.Item 
                title="Sign Out" 
                onPress={handleLogout} 
                right={() => <List.Icon icon='logout'/>}/>
        </List.Section>
        { isLoading && <LoadingBackdrop loaderStyle={styles.loader}/>}
        { unlinkAccountState.visible && 
            <UnlinkAccountModal 
                navigation={navigation} 
                state={unlinkAccountState} 
                dispatch={unlinkAccountDispatch}/>}
        </>
    );
};

export default AccountSection;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 22
    },
    loader: {
        position: 'absolute',
        top: 150
    },
    linked: {
        color: theme.colors.tertiary,
        fontWeight: '700'
    }
});

