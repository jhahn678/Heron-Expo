import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Dialog, Button, Text } from "react-native-paper";
import { useImagePicker } from "../../hooks/utils/useImagePicker";
import { useImageStore } from "../../store/image/useImageStore";

interface Props {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    style?: StyleProp<ViewStyle>
}

const EditProfilePictureDialog = ({ visible, setVisible, style }: Props) => {

    const { openImagePickerAvatar, openCamera } = useImagePicker()
    const setImage = useImageStore(store => store.setImages)

    const handleCamera = async () => {
        const image = await openCamera()
        if(image) setImage(image)
        setVisible(false);
    }

    const handleGallery = async () => {
        const image = await openImagePickerAvatar()
        if(image) setImage(image)
        setVisible(false);
    }

    return (
        <Dialog visible={visible} onDismiss={() => setVisible(false)} style={style}>
            <Dialog.Title>Choose Profile Picture</Dialog.Title>
            <Dialog.Content>
                <Text>Take a picture or choose one from your photo library.</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleCamera}>Take Picture</Button>
                <Button onPress={handleGallery}>Open Gallery</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default EditProfilePictureDialog;

