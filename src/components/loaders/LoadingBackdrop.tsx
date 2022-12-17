import React from "react";
import { Dimensions, GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../../config/theme";

const { height, width } = Dimensions.get('screen')

interface Props {
    loaderStyle?: StyleProp<ViewStyle>
}

const LoadingBackdrop = ({ loaderStyle }: Props) => {

    const handlePress = (event: GestureResponderEvent) => event.stopPropagation()

    return (
        <Pressable style={styles.backdrop} onPress={handlePress}>
            <ActivityIndicator 
                size={64} 
                style={[styles.loading, loaderStyle]} 
                color={theme.colors.primaryContainer}
            />
        </Pressable>
    );
};

export default LoadingBackdrop;

const styles = StyleSheet.create({
    backdrop: {
        height,
        width,
        position: 'absolute',
        zIndex: 10000,
        backgroundColor: 'rgba(0,0,0,.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        position: 'relative',
        zIndex: 10001
    }
});
