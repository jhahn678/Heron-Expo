import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../../config/theme";
import Avatar from "../../../../components/users/Avatar";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useImageStore } from "../../../../store/image/useImageStore";

interface Props {
    avatar: string | undefined | null,
    fullName: string | undefined | null,
    onAvatarPress: () => void
}

const AvatarSection = ({ avatar, fullName, onAvatarPress }: Props) => {

    const image = useImageStore(store => store.images[0])
    const clearImages = useImageStore(store => store.clearImages)

    return (
        <View style={styles.container}>
            <View>
                <Avatar 
                    size={150}
                    fullname={fullName}
                    onPress={onAvatarPress}
                    uri={image ? image.uri : avatar} 
                />
                { image ?
                    <Icon
                        size={20}
                        name='close'
                        style={styles.remove}
                        color={theme.colors.error} 
                        onPress={clearImages}
                    /> :
                    <Icon 
                        size={20} 
                        name="camera" 
                        style={styles.camera}
                        color={theme.colors.secondary} 
                        onPress={onAvatarPress}
                    />
                }
            </View>
        </View>
    );
};

export default AvatarSection;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    camera: {
        right: 10,
        bottom: 8,
        padding: 5,
        borderRadius: 100,
        position: 'absolute',
        backgroundColor: theme.colors.secondaryContainer,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    remove: {
        right: 10,
        top: 8,
        padding: 5,
        borderRadius: 100,
        position: 'absolute',
        backgroundColor: theme.colors.secondaryContainer,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
});
