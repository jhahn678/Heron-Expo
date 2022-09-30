import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from "../../../config/theme";
import globalStyles from "../../../globalStyles";
import { GetMyContacts } from "../../../hooks/queries/useGetMyContacts";
import { useModalStore } from "../../../store/modal/useModalStore";
import Avatar from '../../users/Avatar'

interface Props {
    data: GetMyContacts['me']['contacts'][number]
    navigateUser: () => void
}

const ContactsListItem = ({ data, navigateUser }: Props) => {

    const setManageContact = useModalStore(store => store.setManageContact)

    const handleFriends = () => setManageContact({ name: data.fullname, user: data.id })

    return (
        <View style={styles.container}>
            <Pressable style={globalStyles.frac} onPress={navigateUser}>
                <Avatar fullname={data.fullname} uri={data.avatar} size={56} onPress={navigateUser}/>
                <View style={styles.text}>
                    <Text style={styles.name}>{data.fullname}</Text>
                    <Text>{data.location || 'Harrisburg, PA'}</Text>
                </View>
            </Pressable>
            <Pressable style={styles.button} onPress={handleFriends}>
                <Text style={styles.status}>Friends</Text>
                <Icon name='check' size={14} color={theme.colors.primary}/>
            </Pressable>
        </View>
    );
};

export default ContactsListItem;

const styles = StyleSheet.create({
    container: {
        height: 84,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontWeight: '500',
        fontSize: 16
    },
    text: {
        marginLeft: 12
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderColor: theme.colors.primary,
        borderWidth: 2
    },
    status: {
        fontWeight: '600',
        marginRight: 8,
        color: theme.colors.primary,
    }
});
