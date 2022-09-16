import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { MapResource, RootStackScreenProps } from '../../../types/navigation'
import MapView, { Geojson, Marker, Callout } from 'react-native-maps';
import { IconButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useGetCatchFragment } from '../../../hooks/queries/useGetCatch';
import { useGetLocationFragment } from '../../../hooks/queries/useGetLocation';
import { FeatureCollection, Geometry } from 'geojson';
import { geojsonToFeatureCollection } from '../../../utils/conversions/geojsonToFeatureCollection';
import { useLazyGetWaterbodyGeometries } from '../../../hooks/queries/useGetWaterbodyGeometries';

const ViewMapScreen = ({ navigation, route }: RootStackScreenProps<'ViewMapScreen'>) => {
  
  const { params: { resource, coordinates, id } } = route;
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null)
  const getCachedCatch = useGetCatchFragment()
  const getCachedLocation = useGetLocationFragment()
  const [getWaterbody] = useLazyGetWaterbodyGeometries({ id })
  // useGetUserCatches
  // useGetUserLocations
  // useGetWaterbodyCatches
  // useGetWaterbodyLocations
  // useGetNearbyCatches

  useFocusEffect(
    useCallback(() => {
      switch(resource){
        case MapResource.Catch:
          //Will be navigating here from list
          const cachedCatch = getCachedCatch(id)
          if(cachedCatch && cachedCatch.geom){
            const { geom } = cachedCatch;
            setGeojson(geojsonToFeatureCollection(geom));
          }
          break;
        case MapResource.Location:
          //Will be navigating here from list
          const cachedLocation = getCachedLocation(id)
          if(cachedLocation && cachedLocation.geom){
            const { geom } = cachedLocation;
            setGeojson(geojsonToFeatureCollection(geom));
          }
          break;
        case MapResource.Waterbody:
          break;
        case MapResource.UserCatches:
          break;
        case MapResource.UserLocations:
          break;
        case MapResource.WaterbodyCatches:
          break;
        case MapResource.WaterbodyLocations:
          break;
        case MapResource.CatchesNearby:
          break;
      }
    }, [resource, id])
  );
  
  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        onPress={navigation.goBack}
        style={styles.goback}
        mode="contained-tonal"
      />
      <MapView style={styles.map}>
        { geojson && <Geojson geojson={geojson}/> }
      </MapView>
      {/* <MapCatchesBottomSheet/> */}
      {/* <MapLocationsBottomSheet/> */}
      {/* <MapWaterbodyBottomSheet/> */}
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