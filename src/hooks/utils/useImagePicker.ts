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
    ImagePickerMultipleResult,
    ImageInfo
} from 'expo-image-picker'

interface UseImagePickerRes {
    openImagePickerAvatar: () => Promise<ImageInfo | null>,
    openImagePicker: () => Promise<ImageInfo[] | null>,
    openCamera: () => Promise<ImageInfo | null>
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

    const openImagePickerAvatar = async (): Promise<ImageInfo | null> => {
        if(!hasLibraryPermission){
            const res = await requestMediaLibraryPermissionsAsync()
            setHasLibraryPermission(res.granted)
            if(!res.granted) return null;
        }
        try{
            const result = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                allowsEditing: true
            })
            if(result.cancelled === true) return null;
            return result;
        }catch(err){
            return null;
        }
    }

    const openImagePicker = async (): Promise<ImageInfo[] | null> => {
        if(!hasLibraryPermission){
            const res = await requestMediaLibraryPermissionsAsync()
            setHasLibraryPermission(res.granted)
            if(!res.granted) return null;
        }
        try{
            const result = await launchImageLibraryAsync({ 
                mediaTypes: MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                selectionLimit: 5
            })
            if(result.cancelled === true) return null;
            if(result.hasOwnProperty('selected')) return result.selected;
            //@ts-ignore if single image is selected
            return [result]
        }catch(err){
            return null;
        }
    }

    const openCamera = async (): Promise<ImageInfo | null> => {
        if(!hasCameraPermission){
            const res = await requestCameraPermissionsAsync();
            setHasCameraPermission(res.granted)
            if(!res.granted) return null
        }
        try{
            const result = await launchCameraAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                selectionLimit: 5
            })
            if(result.cancelled === true) return null;
            return result;
        }catch(err){
            return null
        }
    }

    return {
        openCamera,
        openImagePicker,
        openImagePickerAvatar
    }

}