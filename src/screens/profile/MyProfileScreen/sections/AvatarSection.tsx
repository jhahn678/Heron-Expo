import { useEffect } from "react";
import { FAB } from "react-native-paper";
import { theme } from "../../../../config/theme";
import Avatar from "../../../../components/users/Avatar";
import { View, StyleSheet, Dimensions } from "react-native";
import { useImageStore } from "../../../../store/image/useImageStore";
import { useModalStore } from "../../../../store/modal/useModalStore";
import { useImagePicker } from "../../../../hooks/utils/useImagePicker";
import { useChangeAvatar } from "../../../../hooks/mutations/useChangeAvatar";
import { useUploadImages } from "../../../../hooks/mutations/useUploadImages";
import { ErrorType } from "../../../../utils/conversions/mapErrorTypeToDetails";
import { GetMyProfileTotalsRes } from '../../../../hooks/queries/useGetMyProfile'
import { useIsFocused } from "@react-navigation/native";
const { width } = Dimensions.get("screen");

interface Props {
    loading: boolean
    data: GetMyProfileTotalsRes['me'] | undefined
    onPressAvatar: () => void
}

const AvatarSection = ({ data, loading, onPressAvatar }: Props) => {

    const isFocused = useIsFocused()
    const setSnack = useModalStore(store => store.setSnack)
    const setError = useModalStore(store => store.setError)
    const [changeUserAvatar] = useChangeAvatar();
    const { uploadToS3 } = useUploadImages()
    const image = useImageStore(store => store.images[0])
    const clearImages = useImageStore(store => store.clearImages)
    const { openImagePickerAvatar } = useImagePicker({ 
        onError: () => setSnack('Error selecting image')
    })

    const handleChangeAvatar = async (img: { id: string, uri: string }) => {
        const [uploaded] = await uploadToS3([img])
        if(!uploaded) setError(true, ErrorType.Upload)
        await changeUserAvatar({ variables: { avatar: uploaded } });
        setSnack('Avatar updated'); clearImages();
    }

    useEffect(() => {
        if(image && isFocused) handleChangeAvatar(image)
    },[image])

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar 
                    size={180} 
                    loading={loading} 
                    uri={data?.avatar}
                    elevated={true}
                    fullname={data?.fullname}
                    onPress={onPressAvatar}/>
                <FAB 
                    icon={'camera'}
                    style={styles.fab} 
                    customSize={48}
                    onPress={openImagePickerAvatar}/>
            </View>
            <View style={styles.bottom}/>
        </View>
    );
}

export default AvatarSection;

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
    },
    bottom: {
        width,
        bottom: 0,
        zIndex: 0,
        height: 112,
        position: 'absolute',
        backgroundColor: theme.colors.secondaryContainer,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    avatarContainer: {
        position: 'absolute',
        bottom: 20,
        zIndex: 10,
    },
    fab: {
        borderRadius: 50, 
        width: 48,
        position: 'absolute',
        bottom: 8,
        right: 4
    },
})