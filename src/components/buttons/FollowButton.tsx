import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { useFollowUser, useUnfollowUser } from "../../hooks/mutations/useFollowUser";
import { Button } from "react-native-paper"
import { theme } from "../../config/theme";
import { useAuth } from "../../store/auth/useAuth";
import { useModalStore } from "../../store/modal/useModalStore";

interface Props {
    id: number | undefined
    disabled?: boolean,
    following: boolean | undefined
    buttonColor?: string
    labelStyle?: StyleProp<TextStyle>
    style?: StyleProp<ViewStyle>
}

const FollowButton = ({ 
    id, 
    disabled=false,
    buttonColor=theme.colors.primary,
    ...props
}: Props) => {

    const authenticated = useAuth(store => store.isAuthenticated)
    const showAuthModal = useModalStore(store => store.setAuth)
    const displayAuthModal = () => showAuthModal(true)

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
        <Button 
            elevation={5}
            disabled={disabled}
            mode={'elevated'} 
            buttonColor={buttonColor} 
            style={[props.style]}
            icon={following ? 'check' : 'plus'}
            labelStyle={[styles.label, props.labelStyle]}
            contentStyle={{ flexDirection: 'row-reverse' }}
            theme={{ colors: { surfaceDisabled: '#d9d9d9' } }}
            onPress={authenticated ? handlePress : displayAuthModal}>
            {following ? 'Following' : 'Follow'}
        </Button>
    );
};

export default FollowButton;

const styles = StyleSheet.create({
    label: {
        color: "#fff"
    }
});
