import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { useFollowUser, useUnfollowUser } from "../../hooks/mutations/useFollowUser";
import { TouchableRipple } from "react-native-paper";
import globalStyles from "../../globalStyles";
import { theme } from "../../config/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
    id: number | undefined
    following: boolean | undefined
    style?: StyleProp<ViewStyle>
}

const FollowButton = ({ id, ...props }: Props) => {

    const [following, setFollowing] = useState(props.following)

    const [followUser] = useFollowUser()
    const [unfollowUser] = useUnfollowUser()

    const handlePress = () => {
        if(!id) return; setFollowing(x => !x);
        if(following === true) unfollowUser({ variables: { id }})
        if(following === false) followUser({ variables: { id }})
    }

    useEffect(() => {
        setFollowing(props.following)
    },[props.following])

    return (
        <TouchableRipple 
            style={[
                styles.button,
                { backgroundColor: following ? theme.colors.secondaryContainer : undefined },
                props.style
            ]} 
            onPress={handlePress}>
            <Icon
                size={20} 
                color={theme.colors.primary}
                name={following ? 'account-multiple-check' : 'account-multiple-plus-outline'} 
            />
        </TouchableRipple>
    );
};

export default FollowButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 8,
        borderColor: theme.colors.primary,
        borderWidth: 2
    },
});
