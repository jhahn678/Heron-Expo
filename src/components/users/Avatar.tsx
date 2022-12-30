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
    elevated?: boolean
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
    elevated=false
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
                    style={[(elevated ? styles.elevation : {}), style]}
                />
            : fullname ? 
                <PaperAvatar.Text 
                    size={size}
                    label={fullNameToInitials(fullname)} 
                    style={[(elevated ? styles.elevation : {}), style]}
                />
            : firstname && lastname ? 
                <PaperAvatar.Text 
                    size={size}
                    label={fullNameToInitials(`${firstname} ${lastname}`)} 
                    style={[(elevated ? styles.elevation : {}), style]}
                />
            : firstname ? 
                <PaperAvatar.Text 
                    size={size}
                    label={firstname.charAt(0)} 
                    style={[(elevated ? styles.elevation : {}), style]}
                />
            : 
                <PaperAvatar.Icon 
                    size={size}
                    icon={'account'} 
                    style={[(elevated ? styles.elevation : {}), style]}
                /> 
        }
        </Pressable>
    )
}

export default Avatar;

const styles = StyleSheet.create({
    elevation: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    }
})