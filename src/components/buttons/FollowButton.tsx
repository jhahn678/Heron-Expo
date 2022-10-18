import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { useFollowUser, useUnfollowUser } from "../../hooks/mutations/useFollowUser";
import { Chip } from "react-native-paper"
import { theme } from "../../config/theme";

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
        <Chip 
            mode="outlined"
            onPress={handlePress}
            elevation={5} elevated={true}
            style={styles.button} 
            icon={following ? 'check' : 'plus'}
        >
            {following ? 'Following' : 'Follow'}
        </Chip>
    );
};

export default FollowButton;

const styles = StyleSheet.create({
    button: {
        height: 36, 
        backgroundColor: theme.colors.secondaryContainer,
        borderColor: theme.colors.primary,
        borderWidth: 2
    },
});
