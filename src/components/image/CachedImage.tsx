import React, { useEffect, useState } from "react";
import { Image, ImageProps } from "react-native";
import * as FileSystem from 'expo-file-system'

type CacheResponse = (FileSystem.FileInfo & { exists: true }) | { exists: false }

interface Props extends Omit<ImageProps, "source">{
    uri: string
}

const CachedImage = ({ uri, ...props}: Props) => {

    const [image, setImage] = useState<string | undefined>(undefined)

    const getCacheUri = (imageUri: string) => {
        const key = imageUri.split('/').pop()
        return `${FileSystem.cacheDirectory}${key}`
    }

    const downloadImage = async (imageUri: string, cacheUri: string): Promise<string | null> => {
        const download = FileSystem.createDownloadResumable(imageUri, cacheUri)
        return download.downloadAsync()
            .then(res => res ? res.uri : null)
            .catch(err => null)
    }

    const checkCacheForImage = async (cacheUri: string): Promise<CacheResponse> => {
        return FileSystem.getInfoAsync(cacheUri)
            .then((res) => ({ ...res }))
            .catch(() => ({ exists: false }))
    }

    const handleImage = async (imageUri: string) => {
        try{
            const cacheUri = getCacheUri(imageUri)
            const res = await checkCacheForImage(cacheUri)
            if(res.exists) return setImage(res.uri)
            const downloaded = await downloadImage(imageUri, cacheUri)
            setImage(downloaded || undefined)
        }catch(err){
            setImage(undefined)
            console.error(err)
        }
    }

    useEffect(() => { if(uri) handleImage(uri) },[uri])

    return (
        <Image {...props} source={{ uri: image }}/>
    );
};

export default CachedImage;
