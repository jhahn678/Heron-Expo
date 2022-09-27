import React from "react";
import { Pressable, ScrollView, StyleSheet, View, Image } from "react-native";
import { FAB, IconButton, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from "../../../../config/theme";
import { useImagePicker } from "../../../../hooks/utils/useImagePicker";
import { useImageStore } from "../../../../store/image/useImageStore";

const ImageInput = () => {

    const { openImagePicker, openCamera } = useImagePicker()
    const imageStore = useImageStore()

    const handleAddImage = async () => {
        const res = await openImagePicker()
        if(!res) return;
        imageStore.appendImages(res);
    }

    const handleRemoveImage = (id: string) => () => imageStore.removeImages(id)

    return (
        <View>
            <Text style={styles.title}>Add media</Text>
            <ScrollView 
                horizontal 
                contentContainerStyle={styles.content} 
                showsHorizontalScrollIndicator={false}
            >
                <Pressable style={styles.pressable} onPress={handleAddImage}>
                    <Icon name='plus' size={32} color={theme.colors.onSecondaryContainer}/>
                </Pressable>
                { imageStore.images.length > 0 ?
                    imageStore.images.map(({ id, uri }) => (
                        <View key={id}>
                            <Image source={{ uri }} style={styles.image}/>
                            <IconButton 
                                size={12} 
                                icon='close' 
                                mode="contained" 
                                style={styles.remove} 
                                onPress={handleRemoveImage(id)}
                            />
                        </View>
                    )) :
                    new Array(2).fill(null).map((_,x) => <View key={x} style={styles.image}/>)
                }
            </ScrollView>
        </View>
    );
};

export default ImageInput;

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        paddingTop: 16
    },
    title: {
        paddingHorizontal: 16,
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24
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
    image: {
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
    },
    remove: {
        position: 'absolute',
        zIndex: 100,
        top: -12,
        right: -12
    }
});
