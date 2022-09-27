import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RootStackScreenProps, SaveType } from '../../../types/navigation'
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps'
import { useNewCatchStore } from '../../../store/mutations/useNewCatchStore'
import { useLocationStore } from '../../../store/location/useLocationStore'
import { useFocusEffect } from '@react-navigation/native'
import { useModalStore } from '../../../store/modal/useModalStore'
import { ErrorType } from '../../../utils/mapErrorTypeToDetails'
import { FAB, IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from '../../../config/theme'

const { width, height } = Dimensions.get('screen')

enum Resource {
  Catch,
  Location
}

const SaveMapScreen = ({ navigation, route }: RootStackScreenProps<'SaveMapScreen'>) => {

  const map = useRef<MapView | null>(null)
  const [resource, setResource] = useState<Resource | null>(null)
  const { params: { saveType } } = route;
  const [mapReady, setMapReady] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng | null>(null)

  const setError = useModalStore(store => store.setError)

  const newCatch = useNewCatchStore(store => ({
    setMapSnapshot: store.setMapSnapshot,
    setCoordinates: store.setCoordinates,
    reset: store.reset
  }))

  const location = useLocationStore(store => ({ 
    coordinates: (store.longitude && store.latitude) ? ({
      latitude: store.latitude,
      longitude: store.longitude
    }) : null
  }))

  useEffect(() => {
    if(coordinates && map.current) {
      map.current.animateCamera({ 
        center: coordinates,
        zoom: 15 
      })
    }
  },[coordinates])

  const handlePress = () => {}

  const handleLongPress = ({ nativeEvent }: MapEvent) => {
    setCoordinates(nativeEvent.coordinate)
  }

  const handleCurrentLocation = () => {
    if(location.coordinates && map.current){
      map.current.animateCamera({
        center: location.coordinates,
        zoom: 15
      })
    }
  }

  const handleConfirm = async () => {
    switch(resource){
      case Resource.Catch:
        if(!coordinates) return;
        const image = await map.current?.takeSnapshot({ height, width })
        newCatch.setMapSnapshot(image)
        newCatch.setCoordinates([coordinates.longitude, coordinates.latitude])
        setResource(null)
        navigation.goBack()
        break;
      case Resource.Location:
        setResource(null)
        break;
      default:
        console.log('unhandled save');
        break;
    }
  }

  useFocusEffect(
    useCallback(() => {
      switch(saveType){
        case SaveType.CatchAuto:
          if(!location.coordinates) return setError(true, ErrorType.MapCurrentLocation)
          setCoordinates(location.coordinates)
          setResource(Resource.Catch)
          break;
        case SaveType.CatchManual:
          setResource(Resource.Catch)
          if(location.coordinates) handleCurrentLocation()
          break;
        default:
          console.log('Unhandled save type')
          break;
      }
    },[route])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={navigation.goBack}
          mode="contained"
        />
        <IconButton 
          onPress={handleCurrentLocation}
          mode="contained"
          size={28}
          icon={({ color, size }) => (
            <Icon name='my-location' color={color} size={size}/>
          )}
        />
      </View>
      { coordinates ?
        <FAB
          icon="check"
          theme={{ roundness: 1 }}
          customSize={64}
          onPress={handleConfirm}
          style={styles.confirm}
        /> :
        <Text style={styles.tip}>
          Press and hold to add a marker
        </Text>
      }
      <MapView
        ref={map}
        style={styles.map}
        onMapReady={() => setMapReady(true)}
        onLongPress={handleLongPress}
        onPress={handlePress}
      >
        { coordinates && <Marker coordinate={coordinates}/> }
      </MapView>
    </View>
  )
}

export default SaveMapScreen

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: 'center'
  },
  header: {
    width: width,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    position: "absolute",
    zIndex: 100,
    top: 32,
  },
  map: {
    height: '100%',
    width: '100%'
  },
  confirm: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 100
  },
  tip: {
    position: "absolute",
    bottom: 24,
    zIndex: 100,
    backgroundColor: theme.colors.surfaceVariant,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24
  }
})