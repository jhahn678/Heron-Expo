import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from "../../../config/theme";
import globalStyles from "../../../globalStyles";
import { GetMyFollowing } from "../../../hooks/queries/useGetUserFollowing";
import { useModalStore } from "../../../store/modal/useModalStore";
import { useFollowUser } from "../../../hooks/mutations/useFollowUser";
import Avatar from '../../users/Avatar'
import { TouchableRipple } from "react-native-paper";
import { useAuth } from "../../../store/auth/useAuth";

interface Props {
    data: GetMyFollowing['me']['following'][number]
    navigateUser: () => void
}

const ContactsListItem = ({ data, navigateUser }: Props) => {

    const auth = useAuth(store => store.id)

    const setManageContact = useModalStore(store => store.setManageContact)

    const [followUser] = useFollowUser()

    const [isFollowing, setIsFollowing] = useState(data.am_following)

    const handleFollow = () => {
        setIsFollowing(true);
        followUser({ variables: { id: data.id } })
    }

    const handleUnfollow = () => setManageContact({ 
        user: data.id,
        name: data.fullname, 
        username: data.username,
        onConfirm: () => setIsFollowing(false)
    })

    return (
        <View style={styles.container}>
            <Pressable style={globalStyles.frac} onPress={navigateUser}>
                <Avatar fullname={data.fullname} uri={data.avatar} size={56} onPress={navigateUser}/>
                <View style={styles.text}>
                    <Text style={styles.name}>{data.fullname}</Text>
                    <Text>{`@${data.username}`}</Text>
                </View>
            </Pressable>
            { (auth && auth !== data.id) && 
                <TouchableRipple onPress={isFollowing ? handleUnfollow : handleFollow}>
                    <View style={styles.button}>
                        <Text style={styles.status}>{isFollowing ? "Following" : "Follow"}</Text>
                        <Icon name={isFollowing ? 'check' : 'plus'} size={16} color={theme.colors.primary}/>
                    </View>
                </TouchableRipple>
            }
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: theme.colors.primary,
        borderWidth: 2
    },
    status: {
        fontWeight: '600',
        marginRight: 4,
        color: theme.colors.primary,
    }
});
