import React from "react";
import { Dimensions, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../../config/theme";

const { height, width } = Dimensions.get('screen')

interface Props {
    loaderStyle: StyleProp<ViewStyle>
}

const LoadingBackdrop = ({ loaderStyle }: Props) => {
  return (
    <View style={styles.backdrop}>
        <ActivityIndicator 
            size={64} 
            style={[styles.loading, loaderStyle]} 
            color={theme.colors.primaryContainer}
        />
    </View>
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
