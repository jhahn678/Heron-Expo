import React from "react";
import { ActivityIndicator, Divider, List } from 'react-native-paper'
import { StyleSheet } from "react-native";
import { useGetMyAccount } from "../../../../hooks/queries/useGetMyAccount";
import { useModalStore } from "../../../../store/modal/useModalStore";

const AccountSection = () => {
    
    const { data } = useGetMyAccount()
    const setLogout = useModalStore(store => store.setLogout)
    const handleLogout = () => setLogout({ visible: true, onLogoutGoBack: true })
    const handleEmail = () => {}
    const handleDelete = () => {}

    return (
        <List.Section>
            <List.Subheader style={styles.title}>Account</List.Subheader>
            <List.Item title="Linked Accounts"/>
            <Divider/>
            <List.Item 
                title="Email"
                description={data ? data.email : <ActivityIndicator size={'small'}/>}
                right={() => <List.Icon icon='email-edit'/>}
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
    },
    row: {
        padding: 16,
        borderTopColor: '#d9d9d9',
        borderTopWidth: 1
    },
    label: {
        fontSize: 16,
        fontWeight: '500'
    }
});
