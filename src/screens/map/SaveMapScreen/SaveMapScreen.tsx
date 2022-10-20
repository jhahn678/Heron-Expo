import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { RootStackScreenProps, SaveType } from '../../../types/navigation'
import MapView, { LatLng, Marker, Polygon, Polyline } from 'react-native-maps'
import { useNewCatchStore } from '../../../store/mutations/useNewCatchStore'
import { useLocationStore } from '../../../store/location/useLocationStore'
import { useFocusEffect } from '@react-navigation/native'
import { useModalStore } from '../../../store/modal/useModalStore'
import { ErrorType } from '../../../utils/mapErrorTypeToDetails'
import { FAB, IconButton, SegmentedButtons } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from '../../../config/theme'
import { useNewLocationStore } from '../../../store/mutations/useNewLocationStore'
import PromptDeletePoint from '../../../components/modals/map/PromptDeletePoint'
import { Geometry, Resource, useCreateGeometry } from '../../../hooks/utils/useCreateGeometry'
import { useEditCatchStore } from '../../../store/mutations/useEditCatchStore'
import { useEditLocationStore } from '../../../store/mutations/useEditLocationStore'
import { getCentroid } from '../../../utils/map/getCentroid'
import { useGeoJson } from '../../../hooks/utils/useGeoJson'
import { createPolygonCamera } from '../../../utils/map/createPolygonCamera'

const { width, height } = Dimensions.get('screen')

const SaveMapScreen = ({ navigation, route }: RootStackScreenProps<'SaveMapScreen'>) => {
  
  const { params: { saveType, center } } = route;
  const map = useRef<MapView | null>(null)
  const [resource, setResource] = useState<Resource | null>(null)
  const [geometry, setGeometry] = useState<Geometry>(Geometry.Point)
  const [polygonMarkersVisible, setPolygonMarkersVisible] = useState(true)
  const setError = useModalStore(store => store.setError)
  const setLocationError = () => setError(true, ErrorType.MapCurrentLocation)
  const { handleGeoJson } = useGeoJson()

  const {
    point,
    polygon,
    midpoints,
    selectedPoint,
    promptDelete,
    repositionPoint,
    repositionAnchorOne,
    repositionAnchorTwo,
    setPoint,
    setPolygon,
    setPromptDelete,
    setSelectedPoint,
    handlePress,
    handleLongPress,
    handleMarkerPress,
    handleMarkerDragEnd,
    handleMidpointDragStart,
    handleMidpointDragEnd,
    handlePolygonDragEnd,
    handlePolygonDragStart,
    handleRepositionDrag,
    handleDeletePoint
  } = useCreateGeometry({ resource, geometry, map })

  const newCatch = useNewCatchStore(store => ({         //store for NewCatch state
    setMapSnapshot: store.setMapSnapshot,
    setPoint: store.setPoint,
    reset: store.reset
  }))

  const editCatch = useEditCatchStore(store => ({       //store for EditCatch state
    setMapSnapshot: store.setMapSnapshot,
    setPoint: store.setPoint,
    reset: store.reset
  }))

  const newLocation = useNewLocationStore(store => ({   //store for NewLocationState 
    setMapSnapshot: store.setMapSnapshot,
    setPolygon: store.setPolygon,
    setPoint: store.setPoint,
    reset: store.reset
  }))

  const editLocation = useEditLocationStore(store => ({  //store for EditLocation state
    setMapSnapshot: store.setMapSnapshot,
    setPolygon: store.setPolygon,
    setPoint: store.setPoint,
    reset: store.reset
  }))

  const location = useLocationStore(store => ({          //store for users location
    coordinates: (store.longitude && store.latitude) ? ({
      latitude: store.latitude,
      longitude: store.longitude
    }) : null
  }))


  //Sets up map for particular save type on mount
  useFocusEffect(
    useCallback(() => {
      switch(saveType){
        case SaveType.CatchAuto:
          if(!location.coordinates) return setLocationError()
          setPoint(location.coordinates)
          setResource(Resource.Catch)
          break;
        case SaveType.CatchAutoEdit:
          if(!location.coordinates) return setLocationError()
          setPoint(location.coordinates)
          setResource(Resource.Catch)
          break;
        case SaveType.CatchManual:
          setResource(Resource.Catch)
          if(location.coordinates) handleCurrentLocation(); 
          break;
        case SaveType.CatchManualEdit:
          setResource(Resource.Catch)
          if(center) { handleCenter(center); break; }
          if(location.coordinates) handleCurrentLocation(); 
          break;
        case SaveType.LocationAuto:
          if(!location.coordinates) return setLocationError()
          setPoint(location.coordinates)
          setResource(Resource.Location)
          break;
        case SaveType.LocationAutoEdit:
          if(!location.coordinates) return setLocationError()
          setPoint(location.coordinates)
          setResource(Resource.Location)
          break;
        case SaveType.LocationManual:
          setResource(Resource.Location)
          if(location.coordinates) handleCurrentLocation()
          break;
        case SaveType.LocationManualEdit:
          setResource(Resource.Location)
          if(center) { handleCenter(center); break; }
          if(location.coordinates) handleCurrentLocation()
          break;
        default:
          console.log('Unhandled save type')
          break;
      }
    },[route])
  );

  const handleCurrentLocation = () => {
    if(location.coordinates && map.current){
      map.current.animateCamera({
        center: location.coordinates,
        zoom: 15
      })
    }
  }

  const handleCenter = (latlng: LatLng, animate=true) => {
    if(map.current && animate){
      map.current.animateCamera({
        center: latlng,
        zoom: 15,
      })
    }else if(map.current){
      map.current.setCamera({
        center: latlng,
        zoom: 15,
      })
    }
  }

  const handleGeometryChange = (value: string) => {
    if(value === Geometry.Point) {
      setPolygon([])
      setGeometry(value)
    }
    if(value === Geometry.Polygon) {
      setPoint(null)
      setGeometry(value)
    }
  }

  const handleConfirm = async () => {
    if(!map.current) return;
    setPolygonMarkersVisible(false)
    if(geometry === Geometry.Point){
      if(!point) return
      handleCenter(point, false)
      if(saveType === SaveType.LocationAuto || saveType === SaveType.LocationManual){
        newLocation.setPoint(point);
      }else if(saveType === SaveType.LocationAutoEdit || saveType === SaveType.LocationManualEdit){
        editLocation.setPoint(point)
      }else if(saveType === SaveType.CatchAuto || saveType === SaveType.CatchManual){
        newCatch.setPoint(point);
      }else if(saveType === SaveType.CatchAutoEdit || saveType === SaveType.CatchManualEdit){
        editCatch.setPoint(point)
      }
    }else if(geometry === Geometry.Polygon){
      if(polygon.length < 3) return;
      const coords = [
        ...polygon.map(x => x.coordinate), 
        polygon[0].coordinate 
      ] //first and last point must be the same
      map.current.setCamera(createPolygonCamera(coords))
      if(saveType === SaveType.LocationAuto || saveType === SaveType.LocationManual){
        newLocation.setPolygon(coords);
      }else if(saveType === SaveType.LocationAutoEdit || saveType === SaveType.LocationManualEdit){
        editLocation.setPolygon(coords)
      }
    }
    map.current.takeSnapshot({ height, width })
      .then(image => {
        if(saveType === SaveType.LocationAuto || saveType === SaveType.LocationManual){
          newLocation.setMapSnapshot(image);
        }else if(saveType === SaveType.LocationAutoEdit || saveType === SaveType.LocationManualEdit){
          editLocation.setMapSnapshot(image)
        }else if(saveType === SaveType.CatchAuto || saveType === SaveType.CatchManual){
          newCatch.setMapSnapshot(image);
        }else if(saveType === SaveType.CatchAutoEdit || saveType === SaveType.CatchManualEdit){
          editCatch.setMapSnapshot(image)
        }
        navigation.goBack();
      })
    }

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

      { (point || polygon.length > 2) &&
        <FAB
          icon={() => <Icon name='check' size={24}/>}
          label='Save'
          animated={false}
          theme={{ roundness: 2 }}
          customSize={48}
          onPress={handleConfirm}
          style={styles.confirm}
        />
      }

      { resource === Resource.Location && 
          <View style={styles.geometry}>
            <SegmentedButtons
              value={geometry}
              onValueChange={handleGeometryChange}
              density='regular'
              buttons={[
                {
                  value: Geometry.Point,
                  icon: 'vector-point',
                  label: 'Point',
                  showSelectedCheck: true

                },
                {
                  value: Geometry.Polygon,
                  icon: 'vector-polygon',
                  label: 'Polygon',
                  showSelectedCheck: true
                },
              ]}
            />
          </View>
      }

      { promptDelete && 
        <PromptDeletePoint 
          onCancel={() => setPromptDelete(false)} 
          onDelete={handleDeletePoint}
        />
      }
      
      { (resource === Resource.Catch && !point) &&
          <Text style={styles.tip}>
            Press and hold to add a marker
          </Text>
      }
      
      <MapView
        ref={map}
        style={styles.map}
        provider={'google'}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPanDrag={() => setSelectedPoint(null)}
      >
        { point && 
          <Marker 
            coordinate={point}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          /> 
        }
        { polygon.length > 2 ? 
            <Polygon 
              strokeWidth={2}
              tappable={false}
              fillColor={'rgba(0,101,139,.2)'} 
              strokeColor={theme.colors.primary} 
              coordinates={polygon.map(x => x.coordinate)} 
            /> 
          : polygon.length > 0 ?
            <Polyline
              strokeWidth={2}
              strokeColor={theme.colors.primary} 
              coordinates={polygon.map(x => x.coordinate)} 
            />
          : null
        }
        { polygonMarkersVisible && polygon.map(({ coordinate, id }) => (
            <Marker 
              key={id}
              tappable={true}
              identifier={id}
              draggable={polygon.length > 2}
              coordinate={coordinate} 
              anchor={{ x: .5, y: .5 }}
              onPress={handleMarkerPress}
              onDrag={handleRepositionDrag}
              onDragEnd={handlePolygonDragEnd(id)}
              onDragStart={handlePolygonDragStart(id)}
            >
              <View style={styles.circle}/>
            </Marker>
          ))
        }

        { polygonMarkersVisible && midpoints.map((x) => (
            <Marker 
              draggable={true}
              coordinate={x.coordinate} 
              anchor={{ x: .5, y: .5 }}
              key={`${x.left}${x.right}`}
              onDrag={handleRepositionDrag}
              onDragEnd={handleMidpointDragEnd(x)}
              onDragStart={handleMidpointDragStart(x)}
            >
              <View style={styles.subcircle}/>
            </Marker>
        ))}

        { (repositionPoint && repositionAnchorOne) && 
            <Polyline 
              strokeWidth={3}
              lineDashPattern={[1,5]}
              key={repositionAnchorOne.id}
              strokeColor={theme.colors.secondary}
              coordinates={[repositionPoint, repositionAnchorOne.coordinate]} 
            />
        } 
        { (repositionPoint && repositionAnchorTwo) &&
            <Polyline 
              strokeWidth={3}
              lineDashPattern={[1,5]}
              key={repositionAnchorTwo.id}
              strokeColor={theme.colors.secondary}
              coordinates={[repositionPoint, repositionAnchorTwo.coordinate]} 
            />
        }

        { selectedPoint &&
          <Marker
            coordinate={selectedPoint.coordinate}
            anchor={{ x: 1.5, y: .5 }}
            onPress={() => setPromptDelete(true)}
          >
            <Icon name='delete' size={28} style={styles.delete}/>
          </Marker>
        }
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
    bottom: 120,
    zIndex: 100,
    width: 200,
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
  circle: {
    position: 'relative',
    zIndex: 999,
    padding: 9,
    borderRadius: 100,
    backgroundColor: theme.colors.primary
  },
  subcircle: {
    position: 'relative',
    zIndex: 999,
    padding: 7,
    borderRadius: 100,
    backgroundColor: theme.colors.secondary
  },
  geometry: {
    position: "absolute",
    bottom: 48,
    zIndex: 100,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 24
  },
  delete: {
    position: 'relative',
    zIndex: 1000,
    borderRadius: 100,
    padding: 16,
    backgroundColor: theme.colors.secondaryContainer
  }
})