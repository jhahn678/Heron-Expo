import React from "react";
import ContentLoader, { Circle } from "react-content-loader/native";
import { StyleSheet, StyleProp, ViewStyle, Pressable, ViewProps, View } from "react-native";
import { Avatar as PaperAvatar, Theme } from "react-native-paper";
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
    loading?: boolean
}

const Avatar = ({ 
    loading,
    uri, 
    fullname, 
    firstname, 
    lastname, 
    style, 
    onPress, 
    size=64, 
    theme
}: Props): JSX.Element => {

    return (
        <Pressable onPress={onPress}>
        { 
            loading? 
                <ContentLoader 
                    speed={1}
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    backgroundColor="#e3e3e3"
                    foregroundColor="#f0f0f0"
                >
                    <Circle cx={size/2} cy={size/2} r={size/2} />
                </ContentLoader>
            : uri ?
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
                    icon='account' 
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