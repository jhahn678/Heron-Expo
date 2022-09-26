import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RootStackScreenProps } from '../../../types/navigation'
import MapView, { LatLng, Marker } from 'react-native-maps'
import { useNewCatchStore } from '../../../store/mutations/useNewCatchStore'
import { useLocationStore } from '../../../store/location/useLocationStore'

const SaveMapScreen = ({ navigation }: RootStackScreenProps<'SaveMapScreen'>) => {

  const map = useRef<MapView | null>(null)
  
  const [mapReady, setMapReady] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng | null>(null)

  const newCatch = useNewCatchStore(store => ({
    setCoordinates: store.setCoordinates,
    reset: store.reset
  }))
  const locationStore = useLocationStore(store => ({ 
    hasCoordinates: store.hasCoordinates,
    coordinates: [store.longitude, store.latitude]
  }))

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", newCatch.reset);
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.map}
        onMapReady={() => setMapReady(true)}
      >
        { coordinates && <Marker coordinate={coordinates}/> }
      </MapView>
    </View>
  )
}

export default SaveMapScreen

const styles = StyleSheet.create({
  container: {

  },
  map: {

  },

})