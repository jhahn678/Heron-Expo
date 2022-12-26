import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../../config/theme";
import Avatar from "../../../../components/users/Avatar";
import { useImageStore } from "../../../../store/image/useImageStore";
import { IconButton } from "react-native-paper";

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
                    <IconButton
                        size={20}
                        icon={'close'}
                        onPress={clearImages}
                        style={styles.remove}
                        iconColor={theme.colors.error} 
                    /> :
                    <IconButton 
                        size={20} 
                        icon={"camera"}
                        mode={'contained'}
                        style={styles.camera} 
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
        right: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: theme.colors.secondaryContainer,
    },
    remove: {
        right: 0,
        top: 0,
        position: 'absolute',
        backgroundColor: theme.colors.secondaryContainer,
    }
});
