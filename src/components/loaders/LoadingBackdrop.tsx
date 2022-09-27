import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../../config/theme";

const { height, width } = Dimensions.get('screen')

const LoadingBackdrop = () => {
  return (
    <View style={styles.backdrop}>
        <ActivityIndicator 
            size={64} 
            style={styles.loading} 
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
