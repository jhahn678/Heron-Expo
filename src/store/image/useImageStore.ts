import create from 'zustand'
import uuid from 'react-native-uuid'
import { ImagePickerAsset } from 'expo-image-picker'

export interface Images extends Pick<ImagePickerAsset, 'uri' | 'height' | 'width'>{
    id: string
}

export interface ImageStore {
    images: Images[]
    setImages: (data: ImagePickerAsset[]) => void
    appendImages: (data: ImagePickerAsset[]) => void 
    removeImages: (id: string[]) => void
    clearImages: () => void
}

export const useImageStore = create<ImageStore>((set, get) => ({
    images: [],
    setImages: data => set({ 
        images: data.map(img => ({
            id: uuid.v4().toString(),   
            uri: img.uri,
            height: img.height,
            width: img.width
        }))
    }),
    appendImages: data => {
        const images = get().images;
        const newImages = data.map(img => ({
            uri: img.uri,
            height: img.height,
            width: img.width,
            id: uuid.v4().toString()
        }))
        set({ images: [ ...images, ...newImages ]})
    },
    removeImages: imgs => {
        const images = get().images;
        set({ images: images.filter(x => !imgs.includes(x.id)) })
    },
    clearImages: () => {
        set({ images: [] })
    }
}))