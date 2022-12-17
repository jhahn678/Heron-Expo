import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from 'react-native-paper'
import BottomSheet from '@gorhom/bottom-sheet'
import BottomSheetImageInput from "../inputs/BottomSheetImageInput";
import { useModalStore } from "../../store/modal/useModalStore";
import Backdrop from "./Backdrop";
import { useAddWaterbodyMediaMutation } from "../../hooks/mutations/useAddWaterbodyMedia";
import { useImageStore } from "../../store/image/useImageStore";
import { useUploadImages } from "../../hooks/mutations/useUploadImages";
import { ErrorType } from "../../utils/conversions/mapErrorTypeToDetails";
import { useBottomSheetStore } from "../../store/modal/useBottomSheetStore";

interface Props {
    visible: boolean
    setVisible: (waterbody?: number | false) => void
}

const WaterbodyMediaUploadModal = ({ visible, setVisible }: Props) => {

    const ref = useRef<BottomSheet | null>(null)
    const waterbody = useBottomSheetStore(store => store.waterbody)

    const { uploadToS3 } = useUploadImages()
    const images = useImageStore(state => state.images)
    const clearImages = useImageStore(state => state.clearImages)
    const [saveImages] = useAddWaterbodyMediaMutation(waterbody)

    const modal = useModalStore(state => ({
        setError: state.setError,
        setSuccess: state.setSuccess,
        reauthenticate: state.reauthenticate
    }))

    useEffect(() => {
        if(ref.current && visible) ref.current.expand()
    },[visible])

    const handleClose = () => setVisible(false)
    const handleBackdrop = () => { setVisible(false); if(ref.current) ref.current.close() }
    
    const handleConfirmUpload = async () => {
        if(!waterbody) return alert('No waterbody selected')

        const uploads = await uploadToS3(images)
        if(modal.reauthenticate) return;
        if(uploads.length === 0){
            return modal.setError(true, ErrorType.Upload);
        }
        const { data } = await saveImages({ variables: { 
            id: waterbody, media: uploads 
        }})
        if(ref.current) ref.current.close()
        if(!data || data.addWaterbodyMedia.length === 0){
            modal.setError(true, ErrorType.Upload)
        }else if(data.addWaterbodyMedia.length !== uploads.length){
            modal.setError(true, ErrorType.UploadPartial)
        }else{
            modal.setSuccess(true, 'UPLOAD')
        }
        return clearImages()
    }

    return (
        <BottomSheet
            ref={ref} 
            index={-1}
            snapPoints={[330]}
            onClose={handleClose}
            enablePanDownToClose={true}
            containerStyle={{ zIndex: 100 }}
            enableContentPanningGesture={false}
            backdropComponent={visible ? () => 
                <Backdrop onPress={handleBackdrop}/> 
            : null}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Share Images</Text>
                <BottomSheetImageInput contentStyle={{ paddingHorizontal: 20 }}/>
                <Button 
                    mode="contained" 
                    style={styles.button} 
                    disabled={images.length === 0}
                    theme={{ roundness: 1 }}
                    onPress={handleConfirmUpload}
                >Save</Button>
            </View>
        </BottomSheet>
    );
};

export default WaterbodyMediaUploadModal;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16
    },
    title: {
        paddingLeft: 20,
        marginBottom: 16,
        fontSize: 20,
        fontWeight: '500'
    },
    button: {
        marginTop: 16,
        marginHorizontal: 16
    }
});
