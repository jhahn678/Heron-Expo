import React from "react";
import { Pressable, StyleSheet, View, Image, ViewStyle, StyleProp } from "react-native";
import { IconButton, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from "../../config/theme";
import { useImagePicker } from "../../hooks/utils/useImagePicker";
import { useImageStore } from "../../store/image/useImageStore";
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

interface Props {
    style?: StyleProp<ViewStyle>
    contentStyle?: StyleProp<ViewStyle>
}

const BottomSheetImageInput = ({ style, contentStyle }: Props) => {

    const { openImagePicker } = useImagePicker()
    const imageStore = useImageStore()

    const handleRemoveImage = (id: string) => () => imageStore.removeImages([id])

    return (
        <View style={[styles.container, style]}>
            <BottomSheetScrollView 
                horizontal={true}
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
                                onPress={handleRemoveImage(id)}
                            />
                        </View>
                    )) :
                    new Array(2).fill(null).map((_,x) => <View key={x} style={styles.image}/>)
                }
            </BottomSheetScrollView>
        </View>
    );
};

export default BottomSheetImageInput;

const styles = StyleSheet.create({
    container: {
        height: 172,
    },
    content: {
        paddingTop: 16,
        paddingHorizontal: 24,
    },
    title: {
        paddingHorizontal: 16,
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24
    },
    pressable: {
        height: 140,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.colors.onSecondaryContainer,
    },
    image: {
        height: 140,
        width: 140,
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
