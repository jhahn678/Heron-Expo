import React from "react";
import { Pressable, ScrollView, StyleSheet, View, Image, StyleProp, ViewStyle } from "react-native";
import { IconButton, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from "../../config/theme";
import { useImagePicker } from "../../hooks/utils/useImagePicker";
import { useImageStore } from "../../store/image/useImageStore";

interface Props {
    /** @default true */
    showLabel?: boolean
    contentStyle?: StyleProp<ViewStyle>
}

const ImageInput = ({ showLabel=true, contentStyle }: Props) => {

    const { openImagePicker } = useImagePicker()
    const imageStore = useImageStore()

    const handleRemoveImage = (id: string) => () => imageStore.removeImages([id])

    return (
        <View>
            { showLabel && <Text style={styles.title}>Add media</Text>}
            <ScrollView 
                horizontal 
                contentContainerStyle={[styles.content, contentStyle]} 
                showsHorizontalScrollIndicator={false}
            >
                <Pressable style={styles.pressable} onPress={openImagePicker}>
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
                                onPress={handleRemoveImage(id)}/>
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
