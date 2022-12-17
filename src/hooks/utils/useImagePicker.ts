import { useState, useEffect } from 'react'
import { 
    MediaTypeOptions,
    launchCameraAsync,
    launchImageLibraryAsync,
    getCameraPermissionsAsync,
    requestCameraPermissionsAsync,
    getMediaLibraryPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'
import { useImageStore } from '../../store/image/useImageStore'


interface UseImagePickerArgs {
    onError?: () => void
}

interface UseImagePickerRes {
    /**
     * Opens device camera 
     * - Allows up to 5 images to be selected
     * - Sets images to imageStore
     */
    openCamera: () => Promise<void>
    /**
     * Opens gallery
     * - Allows up to 5 images to be selected
     * - Sets images to imageStore
     */
    openImagePicker: () => Promise<void>
    /**
     * Opens gallery
     * - Allows one image to be selected
     * - Sets image to imageStore
     * - Allows editing
     */
    openImagePickerAvatar: () => Promise<void>
}


/**
 * #### Hook for interacting with image picker API
 * @param args *optional* object with onError callback
 * @returns
 * - openCamera
 *   - Opens device camera ~ set image to image store
 * - openImagePicker
 *   - Opens gallery ~ allows up to 5 images to be set to image store
 * - openImagePickerAvatar
 *   - Opens gallery ~ adds one image to image store - allows resizing
 */
export const useImagePicker = (args?: UseImagePickerArgs): UseImagePickerRes => {

    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [hasLibraryPermission, setHasLibraryPermission] = useState(false)
    const appendImages = useImageStore(store => store.appendImages)
    const setImageAvatar = useImageStore(store => store.setImages)
    
    useEffect(() => {
        getMediaLibraryPermissionsAsync()
            .then(res => setHasLibraryPermission(res.granted))
            .catch(err => { console.error(err) })
        getCameraPermissionsAsync()
            .then(res => setHasCameraPermission(res.granted))
            .catch(err => { console.error(err) })
    }, [])

    const openImagePickerAvatar = async (): Promise<void> => {

        //Prompt user for permission if disabled 
        if(!hasLibraryPermission){
            try{
                const res = await requestMediaLibraryPermissionsAsync()
                setHasLibraryPermission(res.granted)
                if(!res.granted) return;
            }catch(err){
                console.error(err);
                alert('Could not access permissions for device media library')
            }
        }

        try{
            const result = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                allowsEditing: true
            })
            if(result.assets) setImageAvatar(result.assets);
        }catch(err){
            if(args && args.onError) args.onError()
        }
    }

    const openImagePicker = async (): Promise<void> => {

        //Prompt user for permission if disabled 
        if(!hasLibraryPermission){
            try{
                const res = await requestMediaLibraryPermissionsAsync()
                setHasLibraryPermission(res.granted)
                if(!res.granted) return;
            }catch(err){
                console.error(err);
                alert('Could not access permissions for device media library')
            }
        }

        try{
            const result = await launchImageLibraryAsync({ 
                mediaTypes: MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                selectionLimit: 5
            })
            if(result.assets) appendImages(result.assets);
        }catch(err){
            console.log(err)
            if(args && args.onError) args.onError()
        }
    }

    const openCamera = async (): Promise<void> => {

        //Prompt user for permission if disabled 
        if(!hasCameraPermission){
            try{
                const res = await requestCameraPermissionsAsync();
                requestCameraPermissionsAsync();
                if(!res.granted) return;
            }catch(err){
                console.error(err);
                alert('Could not access permissions for device camera')
            }
        }

        try{
            const result = await launchCameraAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                selectionLimit: 5
            })
            if(result.assets) appendImages(result.assets);
        }catch(err){
            if(args && args.onError) args.onError()
        }
    }

    return {
        openCamera,
        openImagePicker,
        openImagePickerAvatar
    }

}