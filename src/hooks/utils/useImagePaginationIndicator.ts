import { useState,useCallback } from 'react'
import { ViewToken } from 'react-native';

interface Info {
  viewableItems: ViewToken[],
  changed: ViewToken[]
}

export const useImagePaginationIndicator = () => {


    const [currentIndex, setCurrentIndex] = useState<number | null>(0)

    const handleViewableItemsChanged = useCallback(({ viewableItems: [item] }: Info) => {
      setCurrentIndex(item.index)
    },[]);

    return {
        currentIndex,
        handleViewableItemsChanged
    }

}