import { useState, useEffect } from 'react'
import { 
    getMediaLibraryPermissionsAsync,
    getCameraPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
    requestCameraPermissionsAsync,
    launchImageLibraryAsync,
    launchCameraAsync,
    MediaTypeOptions,
    ImagePickerResult, 
    ImagePickerMultipleResult
} from 'expo-image-picker'

interface UseImagePickerRes {
    openImagePickerAvatar: () => Promise<ImagePickerResult | null>,
    openImagePicker: () => Promise<ImagePickerMultipleResult | null>,
    openCamera: () => Promise<ImagePickerResult | null>
}

export const useImagePicker = (): UseImagePickerRes => {

    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [hasLibraryPermission, setHasLibraryPermission] = useState(false)
    
    useEffect(() => {
        (async () => {
            const library = await getMediaLibraryPermissionsAsync()
            setHasLibraryPermission(library.granted)
            const camera = await getCameraPermissionsAsync()
            setHasCameraPermission(camera.granted)
        })()
    }, [])

    const openImagePickerAvatar = async (): Promise<ImagePickerResult | null> => {
        if(!hasLibraryPermission){
            const res = await requestMediaLibraryPermissionsAsync()
            setHasLibraryPermission(res.granted)
            if(!res.granted) return null;
        }
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            allowsEditing: true
        })
        if(result.cancelled) return null;
        return result;
    }

    const openImagePicker = async (): Promise<ImagePickerMultipleResult | null> => {
        if(!hasLibraryPermission){
            const res = await requestMediaLibraryPermissionsAsync()
            setHasLibraryPermission(res.granted)
            if(!res.granted) return null;
        }
        const result = await launchImageLibraryAsync({ 
            mediaTypes: MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 5
        })
        if(result.cancelled) return null;
        return result;
    }

    const openCamera = async (): Promise<ImagePickerResult | null> => {
        if(!hasCameraPermission){
            const res = await requestCameraPermissionsAsync();
            setHasCameraPermission(res.granted)
            if(!res.granted) return null
        }
        const result = await launchCameraAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 5
        })
        if(result.cancelled) return null;
        return result;
    }

    return {
        openCamera,
        openImagePicker,
        openImagePickerAvatar
    }

}