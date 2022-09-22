import { useState, useEffect, useCallback } from 'react'
import { ViewToken } from 'react-native';

interface Info {
  viewableItems: ViewToken[],
  changed: ViewToken[]
}

export const useImagePaginationIndicator = () => {


    const [currentIndex, setCurrentIndex] = useState<number | null>(0)

    const handleViewableItemsChanged = useCallback(({ viewableItems }: Info) => {
      setCurrentIndex(viewableItems[0].index)
    },[]);

    return {
        currentIndex,
        handleViewableItemsChanged
    }

}