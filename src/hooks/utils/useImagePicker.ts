import { useState, useEffect } from 'react'
import { 
    getMediaLibraryPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
    launchImageLibraryAsync,
    MediaTypeOptions,
    ImagePickerResult 
} from 'expo-image-picker'

type OpenImagePicker = () => Promise<ImagePickerResult>

export const useImagePicker = (): OpenImagePicker=> {

    const [hasPermission, setHasPermission] = useState(false)
    
    useEffect(() => {
        (async () => {
            const res = await getMediaLibraryPermissionsAsync()
            setHasPermission(res.status === 'granted')
        })()
    })

    const openImagePicker = async () => {
        if(!hasPermission){
            const res = await requestMediaLibraryPermissionsAsync()
            setHasPermission(res.status === 'granted')
        }
        const result = await launchImageLibraryAsync({ 
            base64: true, 
            mediaTypes: MediaTypeOptions.Images
        })
        return result;
    }

    return openImagePicker

}