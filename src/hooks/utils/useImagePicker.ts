import { useState, useEffect } from 'react'
import { 
    ImageInfo,
    MediaTypeOptions,
    launchCameraAsync,
    launchImageLibraryAsync,
    getCameraPermissionsAsync,
    requestCameraPermissionsAsync,
    getMediaLibraryPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'


interface UseImagePickerArgs {
    onError?: () => void
}

interface UseImagePickerRes {
    openImagePickerAvatar: () => Promise<ImageInfo | null>,
    openImagePicker: () => Promise<ImageInfo[] | null>,
    openCamera: () => Promise<ImageInfo | null>
}

export const useImagePicker = (args?: UseImagePickerArgs): UseImagePickerRes => {

    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [hasLibraryPermission, setHasLibraryPermission] = useState(false)
    
    useEffect(() => {
        getMediaLibraryPermissionsAsync()
            .then(res => setHasLibraryPermission(res.granted))
            .catch(err => { console.error(err) })
        getCameraPermissionsAsync()
            .then(res => setHasCameraPermission(res.granted))
            .catch(err => { console.error(err) })
    }, [])

    const openImagePickerAvatar = async (): Promise<ImageInfo | null> => {

        //Prompt user for permission if disabled 
        if(!hasLibraryPermission){
            try{
                const res = await requestMediaLibraryPermissionsAsync()
                setHasLibraryPermission(res.granted)
                if(!res.granted) return null;
            }catch(err){
                console.error(err);
                alert('Could not access permissions for device media library')
                return null;
            }
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
            if(args && args.onError) args.onError()
            return null;
        }
    }

    const openImagePicker = async (): Promise<ImageInfo[] | null> => {

        //Prompt user for permission if disabled 
        if(!hasLibraryPermission){
            try{
                const res = await requestMediaLibraryPermissionsAsync()
                setHasLibraryPermission(res.granted)
                if(!res.granted) return null;
            }catch(err){
                console.error(err);
                alert('Could not access permissions for device media library')
                return null;
            }
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
            if(args && args.onError) args.onError()
            return null;
        }
    }

    const openCamera = async (): Promise<ImageInfo | null> => {

        //Prompt user for permission if disabled 
        if(!hasCameraPermission){
            try{
                const res = await requestCameraPermissionsAsync();
                requestCameraPermissionsAsync();
                if(!res.granted) return null;
            }catch(err){
                console.error(err);
                alert('Could not access permissions for device camera')
                return null;
            }
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
            if(args && args.onError) args.onError()
            return null
        }
    }

    return {
        openCamera,
        openImagePicker,
        openImagePickerAvatar
    }

}