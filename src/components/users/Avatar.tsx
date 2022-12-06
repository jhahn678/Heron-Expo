import React from "react";
import { StyleSheet, StyleProp, ViewStyle, Pressable, View } from "react-native";
import { Avatar as PaperAvatar } from "react-native-paper";
import { fullNameToInitials } from "../../utils/conversions/fullNameToInitials";
import RectangleLoader from "../loaders/RectangleLoader";

interface Props {
    uri?: string | null
    fullname?: string | null
    firstname?: string | null
    lastname?: string | null 
    style?: StyleProp<ViewStyle>
    onPress?: () => void
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
}: Props): JSX.Element => {

    return (
        <Pressable onPress={onPress}>
        { 
            loading? 
                <RectangleLoader height={size} width={size} borderRadius={500}/>
            : uri ?
                <PaperAvatar.Image 
                    size={size}
                    source={{ uri }} 
                    style={[styles.avatar, style]}
                />
            : fullname ? 
                <PaperAvatar.Text 
                    size={size}
                    label={fullNameToInitials(fullname)} 
                    style={[styles.avatar, style]}
                />
            : firstname && lastname ? 
                <PaperAvatar.Text 
                    size={size}
                    label={fullNameToInitials(`${firstname} ${lastname}`)} 
                    style={[styles.avatar, style]}
                />
            : firstname ? 
                <PaperAvatar.Text 
                    size={size}
                    label={firstname.charAt(0)} 
                    style={[styles.avatar, style]}
                />
            : 
                <PaperAvatar.Icon 
                    size={size}
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