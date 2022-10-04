import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RootStackScreenProps, SaveType } from '../../../types/navigation'
import MapView, { LatLng, MapEvent, Marker, Polygon } from 'react-native-maps'
import { useNewCatchStore } from '../../../store/mutations/useNewCatchStore'
import { useLocationStore } from '../../../store/location/useLocationStore'
import { useFocusEffect } from '@react-navigation/native'
import { useModalStore } from '../../../store/modal/useModalStore'
import { ErrorType } from '../../../utils/mapErrorTypeToDetails'
import { FAB, IconButton, SegmentedButtons } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from '../../../config/theme'
import { useNewLocationStore } from '../../../store/mutations/useNewLocationStore'
import uuid from 'react-native-uuid'

const { width, height } = Dimensions.get('screen')

enum Resource {
  Catch,
  Location
}

enum GeometryType {
  Point = 'POINT',
  Polygon = 'POLYGON'
}

const SaveMapScreen = ({ navigation, route }: RootStackScreenProps<'SaveMapScreen'>) => {

  const map = useRef<MapView | null>(null)
  const [resource, setResource] = useState<Resource | null>(null)
  const { params: { saveType } } = route;
  const [mapReady, setMapReady] = useState(false)
  const [point, setPoint] = useState<LatLng | null>(null)
  const [polygon, setPolygon] = useState<LatLng[]>([])
  const [geometryType, setGeometryType] = useState<GeometryType | null>(null)

  const setError = useModalStore(store => store.setError)

  const newCatch = useNewCatchStore(store => ({
    setMapSnapshot: store.setMapSnapshot,
    setPoint: store.setPoint,
    reset: store.reset
  }))

  const newLocation = useNewLocationStore(store => ({
    setMapSnapshot: store.setMapSnapshot,
    setPolygon: store.setPolygon,
    setPoint: store.setPoint,
    reset: store.reset
  }))

  const location = useLocationStore(store => ({ 
    coordinates: (store.longitude && store.latitude) ? ({
      latitude: store.latitude,
      longitude: store.longitude
    }) : null
  }))

  useEffect(() => {
    if(point && map.current) {
      map.current.animateCamera({ 
        center: point,
        zoom: 15 
      })
    }
  },[point])

  const handleLongPress = ({ nativeEvent }: MapEvent) => {
    setPoint(nativeEvent.coordinate)
  }

  const handlePress = ({ nativeEvent }: MapEvent) => {
    if(resource !== Resource.Location) return;
    if(geometryType === GeometryType.Polygon){
      setPolygon(state => ([ ...state, nativeEvent.coordinate]))
    }
    if(geometryType === GeometryType.Point){
      setPoint(nativeEvent.coordinate)
    }
  }

  const handleCurrentLocation = () => {
    if(location.coordinates && map.current){
      map.current.animateCamera({
        center: location.coordinates,
        zoom: 15
      })
    }
  }

  const handleGeometryTypeChange = (value: string) => {
    if(value === GeometryType.Point) {
      setPolygon([])
      setGeometryType(value)
    }
    if(value === GeometryType.Polygon) {
      setPoint(null)
      setGeometryType(value)
    }
  } 

  const handleConfirm = async () => {
    switch(resource){
      case Resource.Catch:
        if(!point || !map.current) return;
        map.current.takeSnapshot({ height, width })
          .then(image => {
            newCatch.setMapSnapshot(image)
            newCatch.setPoint(point)
            setResource(null);
            navigation.goBack();
          })
        break;
      case Resource.Location:
        if(!point || !map.current) return;
        map.current.takeSnapshot({ height, width })
          .then(image => {
            newLocation.setMapSnapshot(image);
            if(geometryType === GeometryType.Point) newLocation.setPoint(point)
            if(geometryType === GeometryType.Polygon) newLocation.setPolygon(polygon)
            setResource(null);
            navigation.goBack();
          })
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
          setPoint(location.coordinates)
          setResource(Resource.Catch)
          break;
        case SaveType.CatchManual:
          setResource(Resource.Catch)
          if(location.coordinates) handleCurrentLocation()
          break;
        case SaveType.LocationAuto:
          if(!location.coordinates) return setError(true, ErrorType.MapCurrentLocation)
          setPoint(location.coordinates)
          setResource(Resource.Location)
          setGeometryType(GeometryType.Point)
          break;
        case SaveType.LocationManual:
          setResource(Resource.Location)
          setGeometryType(GeometryType.Point)
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

      { geometryType && 
        <View style={styles.geometry}>
          <SegmentedButtons
            value={geometryType}
            onValueChange={handleGeometryTypeChange}
            density='regular'
            buttons={[
              {
                value: GeometryType.Point,
                icon: 'vector-point',
                label: 'Point',

              },
              {
                value: GeometryType.Polygon,
                icon: 'vector-polygon',
                label: 'Polygon'
              },
            ]}
          />
        </View>
      }
      
      { resource === Resource.Catch && (
        point ?
          <FAB
            icon="check"
            theme={{ roundness: 1 }}
            customSize={64}
            onPress={handleConfirm}
            style={styles.confirm}
          /> 
        :
          <Text style={styles.tip}>
            Press and hold to add a marker
          </Text>
      )}
      {/* { resource === Resource.Location && (
        geometryType === GeometryType.Point ?
        geometryType === GeometryType.Polygon ?
      )} */}
      <MapView
        ref={map}
        style={styles.map}
        onMapReady={() => setMapReady(true)}
        onLongPress={handleLongPress}
        onPress={handlePress}
      >
        { polygon.length > 0 && 
          <Polygon 
            coordinates={polygon} 
            fillColor={'rgba(0,0,0,.3)'} 
            strokeColor={theme.colors.primary} 
            strokeWidth={2}
          /> 
        }
        { polygon.length > 0 &&
          polygon.map((x) => (
            <Marker 
              coordinate={x} 
              key={uuid.v4().toString()} 
              draggable={true}
            />
          ))
        }
        { point && <Marker coordinate={point}/> }
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
  },
  geometry: {
    position: "absolute",
    bottom: 48,
    zIndex: 100,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 24
  }
})