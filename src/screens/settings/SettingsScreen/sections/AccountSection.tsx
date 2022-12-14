import React from "react";
import { ActivityIndicator, Divider, List } from 'react-native-paper'
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { AccountRes, useGetMyAccount } from "../../../../hooks/queries/useGetMyAccount";
import { useModalStore } from "../../../../store/modal/useModalStore";
import { LinkedAccount } from "../../../../types/User";
import { useDeleteAccount } from "../../../../hooks/mutations/useDeleteAccount";
import { RootStackScreenProps } from "../../../../types/navigation";
import { color } from "react-native-reanimated";
import { theme } from "../../../../config/theme";

const linkedStyle: StyleProp<TextStyle> = {
    color: theme.colors.tertiary,
    fontWeight: '700'
}

interface Props {
    navigation: RootStackScreenProps<'SettingsScreen'>['navigation']
}

const AccountSection = ({ navigation }: Props) => {

    const { data, refetch } = useGetMyAccount()
    const setSnack = useModalStore(store => store.setSnack)
    const setLogout = useModalStore(store => store.setLogout)
    const setUnlink = useModalStore(store => store.setUnlinkAccount)
    const handlePressEmail = () => navigation.navigate("ChangeEmailScreen")
    const handlePressDeactivate = () => navigation.navigate("DeactivateAccountScreen")
    const handleChangePassword = () => navigation.navigate("ChangePasswordScreen")
    const handleLogout = () => setLogout({ visible: true, onLogoutGoBack: true })

    const handleAuthProviderPress = (type: LinkedAccount) => () => {
        if(!data) return setSnack("Account unavailable");
        if(type === LinkedAccount.Apple){

        }else if(type === LinkedAccount.Facebook){
            
        }else if(type === LinkedAccount.Google){

        }
        setUnlink({ visible: true, callback: refetch, type })
    }

    const handleUnlinkAccount = () => {
        if(data?.apple_id || data?.facebook_id || data?.google_id){
            setUnlink({ 
                visible: true, 
                callback: refetch,
                type: data?.apple_id ?
                    LinkedAccount.Apple : 
                    data.facebook_id ? 
                    LinkedAccount.Facebook :
                    LinkedAccount.Google,  
            })
        }
    }


    return (
        <List.Section>
            <List.Subheader style={styles.title}>Account</List.Subheader>
            <List.Item 
                title={"Email"}
                description={data ? 
                    (data.email || 'No email registered') : 
                    <ActivityIndicator size={'small'}/>}
                descriptionStyle={data?.email ? linkedStyle : undefined}
                right={() => <List.Icon icon={data?.email ? 'email-edit' : 'email-plus'}/>}
                onPress={handlePressEmail}/>
            <List.Item 
                title={"Google"}
                description={data?.google_id ? "Connected" : "Connect to Google"} 
                descriptionStyle={data?.google_id ? linkedStyle : undefined}
                right={() => <List.Icon icon={"google"}/>}
                onPress={handleUnlinkAccount}/>
            <List.Item 
                title={"Facebook"}
                description={data?.facebook_id ? "Connected" : "Connect to Facebook"} 
                descriptionStyle={data?.facebook_id ? linkedStyle : undefined}
                right={() => <List.Icon icon={"facebook"}/>}
                onPress={handleUnlinkAccount}/>
            <List.Item 
                title={"Apple"}
                description={data?.apple_id ? "Connected" : "Connect to Apple"} 
                descriptionStyle={data?.apple_id ? linkedStyle : undefined}
                right={() => <List.Icon icon={"apple"}/>}
                onPress={handleUnlinkAccount}/>
            <Divider/>
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
    }
});

