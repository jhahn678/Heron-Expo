import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MapResource, RootStackScreenProps } from '../../../types/navigation'
import MapView, { Camera, Geojson, Region } from 'react-native-maps';
import { IconButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useGetCatchFragment } from '../../../hooks/queries/useGetCatch';
import { useGetLocationFragment } from '../../../hooks/queries/useGetLocation';
import { FeatureCollection, Point} from 'geojson';
import { useLazyGetWaterbodyGeometries } from '../../../hooks/queries/useGetWaterbodyGeometries';
import { useGeoJson } from '../../../hooks/utils/useGeoJson';
import { locationMapResource, useLazyGetLocations } from '../../../hooks/queries/useGetLocations';
import { catchMapResource, useLazyGetCatches } from '../../../hooks/queries/useGetCatches';
import WaterbodyBottomSheet from '../../../components/modals/map/WaterbodyBottomSheet';
import { useMapModalStore } from '../../../store/modal/useMapModalStore';
import LocationsBottomSheet from '../../../components/modals/map/LocationsBottomSheet';

const ViewMapScreen = ({ navigation, route }: RootStackScreenProps<'ViewMapScreen'>) => {
  
  const { params: { resource, id } } = route;
  const map = useRef<MapView | null>(null)
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null)
  const [mapCamera, setMapCamera] = useState<Partial<Camera> | null>(null)
  const [mapReady, setMapReady] = useState(false)
  const { handleGeoJson } = useGeoJson()
  const modal = useMapModalStore(store => ({
    setWaterbody: store.setWaterbody,
    setLocation: store.setLocation,
    setCatch: store.setCatch,
    reset: store.reset
  }))

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", modal.reset);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (mapCamera && mapReady) {
      map.current?.animateCamera(mapCamera);
    }
  }, [mapCamera, mapReady]);

  const getCachedCatch = useGetCatchFragment()
  const getCachedLocation = useGetLocationFragment()
  const [getWaterbody] = useLazyGetWaterbodyGeometries({ id })
  const [getLocations] = useLazyGetLocations({ type: locationMapResource(resource), id })
  const [getCatches] = useLazyGetCatches({ type: catchMapResource(resource), id })

  //also have to figure out a way to handle details
  //probably bottom sheet store

  useFocusEffect(
    useCallback(() => {
      switch(resource){
        case MapResource.Catch:
          //Will be navigating here from list
          const cachedCatch = getCachedCatch(id)
          if(cachedCatch && cachedCatch.geom){
            modal.setCatch(cachedCatch.id)
            const { geom } = cachedCatch;
            const { camera, featureCollection } = handleGeoJson(geom)
            setGeojson(featureCollection);
            setMapCamera(camera)
          }
          break;
        case MapResource.Location:
          //Will be navigating here from list
          const cachedLocation = getCachedLocation(id)
          if(cachedLocation && cachedLocation.geom){
            modal.setLocation(cachedLocation.id)
            const { geom } = cachedLocation;
            const { camera, featureCollection } = handleGeoJson(geom);
            setGeojson(featureCollection);
            setMapCamera(camera)
          }
          break;
        case MapResource.Waterbody:
          getWaterbody().then(({ data }) => {
            if(!data) return;
            modal.setWaterbody(data.waterbody.id)
            const { geometries } = data.waterbody;
            const { camera, featureCollection } = handleGeoJson(geometries);
            setGeojson(featureCollection);
            setMapCamera(camera)
            
          })
          break;
        case MapResource.UserCatches:
          getCatches().then(({ data}) => {
            if (!data) return;
            const geometries = data.catches
              .map(x => x.geom ? x.geom : null)
              .filter(x => x !== null) as Point[]
            const { camera, featureCollection } = handleGeoJson(geometries)
            setGeojson(featureCollection);
            setMapCamera(camera);
          })
          break;
        case MapResource.UserLocations:
          getLocations().then(({ data }) => {
            if(!data) return;
            const geometries = data.locations.map(x => x.geom);
            const { camera, featureCollection } = handleGeoJson(geometries);
            setGeojson(featureCollection);
            setMapCamera(camera);
          })
          break;
        case MapResource.WaterbodyCatches:
          getCatches().then(({ data }) => {
            if (!data) return;
            const geometries = data.catches
              .map((x) => (x.geom ? x.geom : null))
              .filter((x) => x !== null) as Point[];
            const { camera, featureCollection } = handleGeoJson(geometries);
            setGeojson(featureCollection);
            setMapCamera(camera);
          });
          break;
        case MapResource.WaterbodyLocations:
          getLocations().then(({ data }) => {
            if (!data) return;
            const geometries = data.locations.map(x => x.geom);
            const { camera, featureCollection } = handleGeoJson(geometries);
            setGeojson(featureCollection);
            setMapCamera(camera);
          });
          break;
        case MapResource.CatchesNearby:
          getCatches().then(({ data }) => {
            if(!data) return;
            const geometries = data.catches
              .map((x) => (x.geom ? x.geom : null))
              .filter((x) => x !== null) as Point[];
            const { camera, featureCollection } = handleGeoJson(geometries);
            setGeojson(featureCollection);
            setMapCamera(camera);
          })
          break;
      }
    },[route.params])
  );
  
  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        onPress={navigation.goBack}
        style={styles.goback}
        mode="contained-tonal"
      />
      <MapView ref={map} 
        style={styles.map} 
        onMapReady={() => setMapReady(true)}
      >
        {geojson && (
          <Geojson
            geojson={geojson}
            strokeColor={"#ff9b32"}
            strokeWidth={5}
            fillColor={"#ff9b32"}
            lineJoin='bevel'
          />
        )}
      </MapView>
      {/* <MapCatchesBottomSheet/> */}
      <LocationsBottomSheet/>
      <WaterbodyBottomSheet/>
    </View>
  );
}

export default ViewMapScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  goback: {
    position: 'absolute',
    left: 12,
    top: 32,
    zIndex: 100
  },
  map: {
    width: '100%',
    height: '100%'
  },
});