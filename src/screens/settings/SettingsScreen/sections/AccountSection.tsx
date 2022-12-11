import React from "react";
import { ActivityIndicator, Divider, List } from 'react-native-paper'
import { StyleSheet } from "react-native";
import { AccountRes, useGetMyAccount } from "../../../../hooks/queries/useGetMyAccount";
import { useModalStore } from "../../../../store/modal/useModalStore";
import { LinkedAccount } from "../../../../types/User";
import { useDeleteAccount } from "../../../../hooks/mutations/useDeleteAccount";

const mapToIcon = (data: AccountRes | undefined): string => {
    if(data?.apple_id) return 'apple'
    if(data?.facebook_id) return 'facebook'
    if(data?.google_id) return 'google'
    return 'account'
}

const mapToLabel = (data: AccountRes | undefined): string => {
    if(data?.apple_id) return 'Apple'
    if(data?.facebook_id) return 'Facebook'
    if(data?.google_id) return 'Google'
    return 'No linked accounts'
}

const AccountSection = () => {

    const { data, refetch } = useGetMyAccount()
    const setUnlink = useModalStore(store => store.setUnlinkAccount)
    const setSnack = useModalStore(store => store.setSnack)
    const setLogout = useModalStore(store => store.setLogout)

    const handleLogout = () => setLogout({ visible: true, onLogoutGoBack: true })

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

    const handleEmail = () => {

    }

    const {} = useDeleteAccount({
        onSuccess: () => {
            setSnack('Account successfully deleted')
        },
        onError: (err) => {
            if(err.response?.status === 401){
                setSnack("Unable to authenticate. Please login and try again.")
            }else{
                setSnack("Something went wrong..")
            }
        }
    })

    const handleDelete = () => {
        //Prompt with modal - this action cannot be undone
        //Enter your username into the input and press confirm
    }

    return (
        <List.Section>
            <List.Subheader style={styles.title}>Account</List.Subheader>
            <List.Item 
                title={'Linked Account'} 
                onPress={handleUnlinkAccount}
                description={mapToLabel(data)}
                right={() => <List.Icon icon={mapToIcon(data)}/>}
            />
            <Divider/>
            <List.Item 
                title={"Email"}
                description={data ? data.email ? data.email : 'No email registered' : <ActivityIndicator size={'small'}/>}
                right={() => <List.Icon icon={data?.email ? 'email-edit' : 'email-plus'}/>}
            />
            <Divider/>
            <List.Item 
                title="Delete My Account" 
                onPress={handleDelete}
                right={() => <List.Icon icon='account-off'/>}
            />
            <Divider/>
            <List.Item title="Sign Out" onPress={handleLogout} right={() => <List.Icon icon='logout'/>}/>
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
