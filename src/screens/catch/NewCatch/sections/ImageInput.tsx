import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { FAB, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from "../../../../config/theme";
import { useImagePicker } from "../../../../hooks/utils/useImagePicker";
import { useImageStore } from "../../../../store/image/useImageStore";

const ImageInput = () => {

    const { openImagePicker, openCamera } = useImagePicker()
    const imageStore = useImageStore()

    return (
        <View>
            <Text style={styles.title}>Add media</Text>
            <ScrollView 
                horizontal 
                contentContainerStyle={styles.content} 
                showsHorizontalScrollIndicator={false}
            >
                <Pressable style={styles.pressable} onPress={openImagePicker}>
                    <Icon name='plus' size={32} color={theme.colors.onSecondaryContainer}/>
                </Pressable>
                { imageStore.images.length > 0 ?
                    <></> :
                    new Array(2).fill(null).map((_,x) => <View key={x} style={styles.placeholder}/>)
                }
            </ScrollView>
        </View>
    );
};

export default ImageInput;

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 16
    },
    title: {
        paddingHorizontal: 16,
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24,
        marginBottom: 16
    },
    pressable: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.colors.onSecondaryContainer,
    },
    placeholder: {
        height: 150,
        width: 150,
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.colors.onSecondaryContainer,
    },
    button: {
        position: 'absolute',
        right: 12,
        bottom: -12,
        zIndex: 100
    }
});
