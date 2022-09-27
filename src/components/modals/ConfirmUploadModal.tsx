import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, Image, View } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { useAddWaterbodyMediaMutation } from "../../hooks/mutations/useAddWaterbodyMedia";
import { useUploadImages } from "../../hooks/mutations/useUploadImages";
import { useImageStore } from '../../store/image/useImageStore'
import { useModalStore } from "../../store/modal/useModalStore";
import { ErrorType } from "../../utils/mapErrorTypeToDetails";

interface Props {
    visible: boolean
    dismiss: () => void
}

const ConfirmUploadModal = (props: Props) => {

    const {
        setConfirmUploadModalVisible,
        setSuccessModalVisible,
        setErrorModalVisible,
        waterbody
    } = useModalStore(state => ({
        setConfirmUploadModalVisible: state.setConfirmUpload,
        setSuccessModalVisible: state.setSuccess,
        waterbody: state.confirmUploadWaterbody,
        setErrorModalVisible: state.setError,
    }))

    const clearImages = useImageStore(state => state.clearImages)
    const images = useImageStore(state => state.images)
    const [saveImages, { loading }] = useAddWaterbodyMediaMutation()

    const uploadImages = useUploadImages()

    const handleConfirm = async () => {
        if(!waterbody) return alert('No waterbody selected')
        const result = await uploadImages(images)
        // no result means authentication failed
        if(!result) return setConfirmUploadModalVisible(null, false)
        const { uploads } = result;
        const { data } = await saveImages({ 
            variables: { id: waterbody, media: uploads }
        })
        setConfirmUploadModalVisible(null, false)
        if(!data || data.addWaterbodyMedia.length === 0){
            setErrorModalVisible(true, ErrorType.Upload)
        }else if(data.addWaterbodyMedia.length !== uploads.length){
            setErrorModalVisible(true, ErrorType.UploadPartial)
        }else{
            setSuccessModalVisible(true, 'UPLOAD')
        }
        return clearImages()
    }

    const handleCancel = () => {
        clearImages()
        props.dismiss()
    }

    return (
        <Dialog 
            theme={{ roundness: 2 }}
            visible={props.visible}
            onDismiss={props.dismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                Confirm Selection 📸
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>
                    These are the pictures you selected. 
                    If everything looks good, tap confirm to upload them.
                </Text>
                <View style={styles.imageContainer}>
                    <FlashList 
                        horizontal data={images}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Image 
                                source={{ uri: item.uri }} 
                                style={styles.image}
                            />
                        )}
                        estimatedItemSize={150}
                    />
                </View>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleCancel}>Cancel</Button>
                <Button 
                    onPress={handleConfirm} 
                    loading={loading}
                >Confirm</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default ConfirmUploadModal;

const styles = StyleSheet.create({
    container: {
        height: 370,
        width: '90%',
        alignSelf: 'center',
        position: 'relative',
        bottom: '10%'
    },
    title: {
        fontSize: 22,
        fontWeight: '600'
    },
    text: {
        fontWeight: '500',
        lineHeight: 20
    },
    imageContainer: {
        marginTop: 32,
        height: 130,
        justifyContent: 'center'
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: 12,
        marginRight: 12
    }
});
