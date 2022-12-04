import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useState } from 'react'

export const useSaveToGallery = () => {

    const [hasPermission, setHasPermission] = useState(false)

    /** Requests permission from user */
    const getPermission = async (): Promise<MediaLibrary.PermissionResponse> => {
        const res = await MediaLibrary.requestPermissionsAsync()
        setHasPermission(res.granted)
        return res;    
    }

    useEffect(() => {
        //Gets current permission status
        MediaLibrary.getPermissionsAsync()
            .then(res => {
                setHasPermission(res.granted)
                if(!res.granted) getPermission()
            })
            .catch(err => {
                setHasPermission(false)
                console.error(err)
            })
    },[])

    const saveToGallery = async (url: string) => {
        
        //Prompt user for permission to access media library
        if(!hasPermission){
            try{
                const res = await getPermission()
                if(!res.granted) return alert('Media library permissions for Heron are disabled');
            }catch(err){
                alert('Could not save to device')
                console.error(err)
            }
        }

        try{
            const fileName = url.split('/').pop() as string;
            const { uri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
            const asset = await MediaLibrary.createAssetAsync(uri);
            const album = await MediaLibrary.getAlbumAsync('Heron')
            if(album) await MediaLibrary.addAssetsToAlbumAsync(asset, album, false)
            else await MediaLibrary.createAlbumAsync('Heron', asset, false)
        }catch(err){
            console.error(err)
            alert('Error saving to device')
        }
    }

    return { saveToGallery }
}