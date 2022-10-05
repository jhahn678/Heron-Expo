import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RootStackScreenProps, SaveType } from '../../../types/navigation'
import MapView, { LatLng, MapEvent, Marker, Polygon, Polyline } from 'react-native-maps'
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
import { createMidpoint, createMidpoints, MidPoint, PolygonPoint } from '../../../utils/map/createMidpoints'
import PromptDeletePoint from '../../../components/modals/map/PromptDeletePoint'

const { width, height } = Dimensions.get('screen')

enum Resource {
  Catch,
  Location
}

enum Geometry {
  Point = 'POINT',
  Polygon = 'POLYGON'
}

const SaveMapScreen = ({ navigation, route }: RootStackScreenProps<'SaveMapScreen'>) => {
  
  const { params: { saveType } } = route;
  const map = useRef<MapView | null>(null)
  const [resource, setResource] = useState<Resource | null>(null)
  const [geometry, setGeometry] = useState<Geometry>(Geometry.Point)
  const [promptDelete, setPromptDelete] = useState(false)
  const [midpoints, setMidpoints] = useState<MidPoint[]>([])
  const [selectedPoint, setSelectedPoint] = useState<PolygonPoint | null>(null)
  const [repositionPoint, setRepositionPoint] = useState<LatLng | null>(null)
  const [repositionAnchorOne, setRepositionAnchorOne] = useState<PolygonPoint | null>(null)
  const [repositionAnchorTwo, setRepositionAnchorTwo] = useState<PolygonPoint | null>(null)

  const [point, setPoint] = useState<LatLng | null>(null)
  const [polygon, setPolygon] = useState<PolygonPoint[]>([])

  const setError = useModalStore(store => store.setError)

  //store for NewCatch state
  const newCatch = useNewCatchStore(store => ({
    setMapSnapshot: store.setMapSnapshot,
    setPoint: store.setPoint,
    reset: store.reset
  }))

  //store for NewLocation state
  const newLocation = useNewLocationStore(store => ({
    setMapSnapshot: store.setMapSnapshot,
    setPolygon: store.setPolygon,
    setPoint: store.setPoint,
    reset: store.reset
  }))

  //store for user location
  const location = useLocationStore(store => ({ 
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
          setGeometry(Geometry.Point)
          break;
        case SaveType.LocationManual:
          setResource(Resource.Location)
          setGeometry(Geometry.Point)
          if(location.coordinates) handleCurrentLocation()
          break;
        default:
          console.log('Unhandled save type')
          break;
      }
    },[route])
  );


  //centers map view when point is changed
  useEffect(() => {
    if(point && map.current) {
      map.current.animateCamera({ 
        center: point,
        zoom: 15 
      })
    }
  },[point])

  useEffect(() => {
    if(polygon.length > 1){
      setMidpoints(
        polygon.length === 2
        ? createMidpoint(polygon[0], polygon[1])
        : createMidpoints(polygon)
      )
    }else{
      setMidpoints([])
    }
  },[polygon])

  const handleLongPress = ({ nativeEvent }: MapEvent) => {
    if(resource === Resource.Catch){
      setPoint(nativeEvent.coordinate)
    }
  }

  const handleMarkerDragEnd = ({ nativeEvent }: MapEvent) => setPoint(nativeEvent.coordinate)
  
  const handleRepositionDrag = ({ nativeEvent: { coordinate }}: MapEvent) => setRepositionPoint(coordinate)
  
  const handlePolygonDragStart = (id: string) => ({ nativeEvent: { coordinate }}: MapEvent) => {
    const index = polygon.findIndex(x => x.id === id)
    setRepositionPoint(coordinate)
    setRepositionAnchorOne(polygon[index === polygon.length - 1 ? 0 : index + 1])
    setRepositionAnchorTwo(polygon[index === 0 ? polygon.length - 1 : index - 1])
  }

  const handlePolygonDragEnd = (id: string) => ({ nativeEvent: { coordinate }}: MapEvent) => {
    setPolygon(state => {
      const index = state.findIndex(x => x.id === id)
      return [
        ...state.slice(0,index), 
        { id: state[index].id, coordinate }, 
        ...state.slice(index + 1)
      ]
    })
    setRepositionPoint(null)
    setRepositionAnchorOne(null)
    setRepositionAnchorTwo(null)
  }

  const handleMarkerPress = ({ nativeEvent }: MapEvent<{ 
    action: 'marker-press', id: string
  }>) => setSelectedPoint(polygon.find(x => x.id === nativeEvent.id) || null)

  const handleDeletePoint = () => {
    if(!selectedPoint) return;
    if(Geometry.Point) setPoint(null)
    if(Geometry.Polygon) setPolygon(state => ([
      ...state.filter(x => x.id !== selectedPoint.id)
    ]))
    setPromptDelete(false)
    setSelectedPoint(null)
  }

  const handleMidpointDragStart = (midpoint: MidPoint) => ({ nativeEvent: { coordinate } }: MapEvent) => {
    setRepositionPoint(coordinate)
    const left = polygon.find(x => x.id === midpoint.left)
    if(left) setRepositionAnchorOne(left)
    const right = polygon.find(x => x.id === midpoint.right)
    if(right) setRepositionAnchorTwo(right)
  }

  const handleMidpointDragEnd = (midpoint: MidPoint) => ({ nativeEvent: { coordinate } }: MapEvent) => {
    let index: number;
    const left = polygon.findIndex(x => x.id === midpoint.left);
    const right = polygon.findIndex(x => x.id === midpoint.right);
    if(polygon.length > 2 && left === 0 && right === polygon.length - 1){
      index = polygon.length;
    }else if(polygon.length > 2 && right === 0 && left === polygon.length - 1){
      index = polygon.length;
    }else{
      index = left > right ? left : right;
    }
    setPolygon(state => ([
      ...state.slice(0, index),
      { id: uuid.v4().toString(), coordinate },
      ...state.slice(index)
    ]))
    setRepositionPoint(null)
    setRepositionAnchorOne(null)
    setRepositionAnchorTwo(null)
  }


  const handlePress = ({ nativeEvent: { coordinate } }: MapEvent) => {
    if(resource !== Resource.Location) return;
    if(geometry === Geometry.Point) return setPoint(coordinate)
    if(geometry === Geometry.Polygon){
      setPolygon(state => ([
        ...state,
        { id: uuid.v4().toString(), coordinate }
      ]))
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
    if(!point || !map.current) return;
    if(resource === Resource.Catch){
      map.current.takeSnapshot({ height, width })
        .then(image => {
          newCatch.setMapSnapshot(image)
          newCatch.setPoint(point)
          navigation.goBack();
        })
    }
    if(resource === Resource.Location){
      map.current.takeSnapshot({ height, width })
        .then(image => {
          if(geometry === Geometry.Polygon) {
            newLocation.setPolygon(polygon.map(x => x.coordinate))
          }else if(geometry === Geometry.Point) {
            newLocation.setPoint(point)
          } 
          newLocation.setMapSnapshot(image);
          navigation.goBack();
        })
    }
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
      
      <MapView
        ref={map}
        style={styles.map}
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
              fillColor={'rgba(0,0,0,.3)'} 
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
        { polygon.map(({ coordinate, id }) => (
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

        { midpoints.map((x) => (
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
  },
})