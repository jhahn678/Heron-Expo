import React, { RefAttributes } from "react";
import { StyleSheet, StyleProp, ViewStyle, Pressable, ViewProps, View } from "react-native";
import { Avatar as PaperAvatar, AvatarIconProps, AvatarImageProps, AvatarTextProps, Theme } from "react-native-paper";
import { fullNameToInitials } from "../../utils/conversions/fullNameToInitials";

interface Props {
    uri?: string | null
    fullname?: string | null
    firstname?: string | null
    lastname?: string | null 
    style?: StyleProp<ViewStyle>
    onPress?: () => void
    theme?: Theme,
    size?: number
}

const Avatar = ({ 
    uri, fullname, firstname, lastname, style, onPress, size, theme
}: Props): JSX.Element => {

    return (
        <Pressable onPress={onPress}>
        { 
            uri ?
                <PaperAvatar.Image 
                    size={size}
                    theme={theme}
                    source={{ uri }} 
                    style={[styles.avatar, style]}
                />
            : fullname ? 
                <PaperAvatar.Text 
                    size={size}
                    theme={theme}
                    label={fullNameToInitials(fullname)} 
                    style={[styles.avatar, style]}
                />
            : firstname && lastname ? 
                <PaperAvatar.Text 
                    size={size}
                    theme={theme}
                    label={fullNameToInitials(`${firstname} ${lastname}`)} 
                    style={[styles.avatar, style]}
                />
            : firstname ? 
                <PaperAvatar.Text 
                    size={size}
                    theme={theme}
                    label={firstname.charAt(0)} 
                    style={[styles.avatar, style]}
                />
            : 
                <PaperAvatar.Icon 
                    size={size}
                    theme={theme}
                    icon='account-circle' 
                    style={[styles.avatar, style]}
                /> 


        }
        </Pressable>
    )
}

export default Avatar;

const styles = StyleSheet.create({
    avatar: {

    }
})