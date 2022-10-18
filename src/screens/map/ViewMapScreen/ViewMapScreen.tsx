import { FeatureCollection } from 'geojson';
import { theme } from '../../../config/theme';
import { CatchSort } from '../../../types/Catch';
import { Button, IconButton, Text } from 'react-native-paper';
import { LocationSort } from '../../../types/Location';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMapModalStore } from '../../../store/modal/useMapModalStore';
import { useGetCatchFragment } from '../../../hooks/queries/useGetCatch';
import { MapResource, RootStackScreenProps } from '../../../types/navigation'
import MapView, { Camera, Geojson, LatLng, MapEvent } from 'react-native-maps';
import { useGetLocationFragment } from '../../../hooks/queries/useGetLocation';
import { MapPressResponse, useGeoJson } from '../../../hooks/utils/useGeoJson';
import CatchesBottomSheet from '../../../components/modals/map/CatchesBottomSheet';
import LocationsBottomSheet from '../../../components/modals/map/LocationsBottomSheet';
import WaterbodyBottomSheet from '../../../components/modals/map/WaterbodyBottomSheet';
import { catchMapResource, useLazyGetCatches } from '../../../hooks/queries/useGetCatches';
import { useLazyGetWaterbodyGeometries } from '../../../hooks/queries/useGetWaterbodyGeometries';
import { Feature, GeoJsonResource } from '../../../utils/conversions/geojsonToFeatureCollection';
import { locationMapResource, useLazyGetLocations } from '../../../hooks/queries/useGetLocations';
import { useModalStore } from '../../../store/modal/useModalStore';
import { ErrorType } from '../../../utils/mapErrorTypeToDetails';
const { width } = Dimensions.get('screen')
const LIMIT = 50;


const ViewMapScreen = ({ navigation, route }: RootStackScreenProps<'ViewMapScreen'>) => {
  
  const { params: { resource, id } } = route;
  const map = useRef<MapView | null>(null)
  const [coordinates, setCoordinates] = useState<LatLng | null>(null)
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null)
  const [geojsonResource, setGeojsonResource] = useState<GeoJsonResource | null>(null)
  const [mapCamera, setMapCamera] = useState<Partial<Camera> | null>(null)
  const [mapReady, setMapReady] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const { handleGeoJson } = useGeoJson()
  const showError = useModalStore(store => store.setError)
  
  const modal = useMapModalStore(store => ({
    setWaterbody: store.setWaterbody,
    setLocation: store.setLocation,
    setCatch: store.setCatch,
    reset: store.reset
  }))

  useEffect(() => navigation.addListener("beforeRemove", modal.reset),[]);

  useEffect(() => {
    if (mapCamera && mapReady) {
      map.current?.animateCamera(mapCamera);
    }
  }, [mapCamera, mapReady]);

  const getCachedCatch = useGetCatchFragment()
  const getCachedLocation = useGetLocationFragment()
  const [getWaterbody] = useLazyGetWaterbodyGeometries({ id })
  const [getLocations] = useLazyGetLocations({
    id, limit: LIMIT,
    sort: LocationSort.CreatedAtNewest,
    type: locationMapResource(resource)
  });
  const [getCatches] = useLazyGetCatches({
    id, limit: LIMIT,
    sort: CatchSort.CreatedAtNewest,
    type: catchMapResource(resource)
  });


  const handleShowMore = async () => {
    if(!map.current) return;
    map.current.getCamera()
      .then(({ center }) => {
        setCoordinates(center)
        if(geojsonResource === GeoJsonResource.Catch){
          getCatches({ variables: {
              id,
              limit: LIMIT,
              coordinates: center,
              sort: CatchSort.Nearest,
              type: catchMapResource(resource),
            },
          })
          .then(({ data }) => {
            if (!data) return;
            modal.setCatch({ dismissable: true });
            const features = data.catches
              .map((x) => x.geom ? ({
                geometry: x.geom,
                properties: {
                  id: x.id,
                  resource: GeoJsonResource.Catch,
                },
              }) : null)
              .filter((x) => x !== null) as Feature[];
            const result = handleGeoJson(features);
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Catch);
            setMapCamera(result.camera);
            setHasMore(data.catches.length === LIMIT);
          })
          .catch((err) => console.error(err));
        }
        if(geojsonResource === GeoJsonResource.Location){
          getLocations({ variables: {
              id,
              limit: LIMIT,
              coordinates: center,
              sort: LocationSort.Nearest,
              type: locationMapResource(resource),
            },
          })
            .then(({ data }) => {
              if (!data) return;
              modal.setLocation({ dismissable: true });
              const geometries = data.locations.map((x) => ({
                geometry: x.geom,
                properties: {
                  id: x.id,
                  resource: GeoJsonResource.Location,
                },
              }));
              const result = handleGeoJson(geometries);
              setGeojson(result.featureCollection);
              setGeojsonResource(GeoJsonResource.Location);
              setMapCamera(result.camera);
              setHasMore(data.locations.length === LIMIT);
            })
            .catch((err) => console.error(err));
        }

      })
      .catch(err => console.error(err))
  }

  const handlePressGeoJson = (e: MapEvent) => {
    const { feature: { properties } } = e as unknown as MapPressResponse;
    switch(properties.resource){
      case GeoJsonResource.Catch:
        return modal.setCatch({
          id: properties.id,
          dismissable: resource !== MapResource.Catch
        })
      case GeoJsonResource.Location:
        return modal.setLocation({ 
          id: properties.id, 
          dismissable: resource !== MapResource.Location 
        })
      case GeoJsonResource.Waterbody:
        return modal.setWaterbody(properties.id)
    }
  }

  useFocusEffect(
    useCallback(() => {
      switch(resource){
        case MapResource.Catch:
          //Will be navigating here from list
          const cachedCatch = getCachedCatch(id)
          if(cachedCatch && cachedCatch.geom){
            modal.setCatch({ id: cachedCatch.id })
            const feature: Feature = { 
              geometry: cachedCatch.geom,
              properties: { 
                id: cachedCatch.id,
                resource: GeoJsonResource.Catch
              } 
            }
            const result = handleGeoJson(feature)
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Catch)
            setMapCamera(result.camera)
            setHasMore(false)
          }else{
            showError(true, ErrorType.MapCatch)
          }
          break;
        case MapResource.Location:
          //Will be navigating here from list
          const cachedLocation = getCachedLocation(id)
          if(cachedLocation && cachedLocation.geom){
            modal.setLocation({ id: cachedLocation.id })
            const feature: Feature = {
              geometry: cachedLocation.geom,
              properties: { 
                id: cachedLocation.id,
                resource: GeoJsonResource.Location
              },
            };
            const result = handleGeoJson(feature);
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Location);
            setMapCamera(result.camera)
            setHasMore(false);
          }else{
            showError(true, ErrorType.MapLocation)
          }
          break;
        case MapResource.Waterbody:
          getWaterbody().then(({ data }) => {
            if(!data) return;
            modal.setWaterbody(data.waterbody.id)
            const feature: Feature = {
              geometry: data.waterbody.geometries,
              properties: { 
                id: data.waterbody.id,
                resource: GeoJsonResource.Waterbody
              },
            };
            const result = handleGeoJson(feature);
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Waterbody);
            setMapCamera(result.camera)
            setHasMore(false);
          })
          break;
        case MapResource.UserCatches:
          getCatches().then(({ data }) => {
            if (!data) return;
            modal.setCatch({ dismissable: true })
            const features = data.catches
              .map(x => x.geom ? ({ 
                geometry: x.geom, 
                properties: { 
                  id: x.id,
                  resource: GeoJsonResource.Catch
                } 
              }) : null)
              .filter(x => x !== null) as Feature[]
            if(features.length === 0) {
              return showError(true, ErrorType.MapNoCatches)
            }
            const result = handleGeoJson(features)
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Catch);
            setMapCamera(result.camera);
            setHasMore(data.catches.length === LIMIT)
          })
          break;
        case MapResource.UserLocations:
          getLocations().then(({ data }) => {
            if(!data) return;
            modal.setLocation({ dismissable: true })
            const geometries = data.locations.map(x => ({ 
              geometry: x.geom, 
              properties: { 
                id: x.id,
                resource: GeoJsonResource.Location
              } 
            }));
            if(geometries.length === 0){
              return showError(true, ErrorType.MapNoLocations)
            }
            const result = handleGeoJson(geometries);
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Location);
            setMapCamera(result.camera);
            setHasMore(data.locations.length === LIMIT);
          })
          break;
        case MapResource.UserSavedLocations:
          getLocations().then(({ data }) => {
            if(!data) return;
            modal.setLocation({ dismissable: true })
            const geometries = data.locations.map(x => ({ 
              geometry: x.geom, 
              properties: { 
                id: x.id,
                resource: GeoJsonResource.Location
              } 
            }));
            if(geometries.length === 0){
              return showError(true, ErrorType.MapNoLocations)
            }
            const result = handleGeoJson(geometries);
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Location);
            setMapCamera(result.camera);
            setHasMore(data.locations.length === LIMIT);
          })
          break;
        case MapResource.WaterbodyCatches:
          getCatches().then(({ data }) => {
            if (!data) return;
            modal.setCatch({ dismissable: true })
            const features = data.catches
              .map((x) => (x.geom ? ({
                geometry: x.geom,
                properties: { 
                  id: x.id,
                  resource: GeoJsonResource.Catch 
                }
              }) : null))
              .filter((x) => x !== null) as Feature[];
            if(features.length === 0) {
              return showError(true, ErrorType.MapNoCatchesLogged)
            }
            const result = handleGeoJson(features);
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Catch);
            setMapCamera(result.camera);
            setHasMore(data.catches.length === LIMIT);
          });
          break;
        case MapResource.WaterbodyLocations:
          getLocations().then(({ data }) => {
            if (!data) return;
            modal.setLocation({ dismissable: true })
            const features = data.locations
              .map(x => ({ 
                geometry: x.geom, 
                properties: { 
                  id: x.id,
                  resource: GeoJsonResource.Location 
                }
              }))
            if(features.length === 0){
              return showError(true, ErrorType.MapNoLocations)
            }
            const result = handleGeoJson(features);
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Location);
            setMapCamera(result.camera);
            setHasMore(data.locations.length === LIMIT);
          });
          break;
        case MapResource.CatchesNearby:
          getCatches().then(({ data }) => {
            if(!data) return;
            modal.setCatch({ dismissable: true })
            const features = data.catches
              .map((x) => (x.geom ? ({
                geometry: x.geom,
                properties: { 
                  id: x.id,
                  resource: GeoJsonResource.Catch 
                }
              }) : null))
              .filter((x) => x !== null) as Feature[];
            if(features.length === 0) {
              return showError(true, ErrorType.MapNoCatches)
            }
            const result = handleGeoJson(features);
            setGeojson(result.featureCollection);
            setGeojsonResource(GeoJsonResource.Catch);
            setMapCamera(result.camera);
            setHasMore(data.catches.length === LIMIT);
          })
          break;
      }
    },[route.params])
  );


  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={navigation.goBack}
          style={styles.back}
          mode="contained-tonal"
        />
        {
          geojson && 
          resource !== MapResource.Catch && 
          resource !== MapResource.Location &&
          resource !== MapResource.Waterbody && (
          <Text style={[styles.results]}>
            Showing{" "}
            {geojson.features.length === LIMIT ? `first ${LIMIT}` : "all"}{" "}
            results
          </Text>
        )}
        {hasMore && (
          <Button 
          mode='contained-tonal' 
          style={styles.showMore}
          onPress={handleShowMore}
          >Show More Here</Button>
        )}
      </View>

      <MapView
        ref={map}
        style={styles.map}
        onMapReady={() => setMapReady(true)}
      >
        {geojson && (
          <Geojson
            geojson={geojson}
            strokeWidth={5}
            strokeColor={theme.colors.primary}
            fillColor={theme.colors.primaryContainer}
            lineJoin="bevel"
            onPress={handlePressGeoJson}
          />
        )}
      </MapView>
      <CatchesBottomSheet />
      <LocationsBottomSheet />
      <WaterbodyBottomSheet />
    </View>
  );
}

export default ViewMapScreen

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  header: {
    width: width,
    top: 36,
    alignItems: "center",
    position: "absolute",
    zIndex: 100,
  },
  back: {
    position: "absolute",
    top: -8,
    left: 12,
    zIndex: 100,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  results: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontWeight: "500",
    borderRadius: 12,
    alignSelf: "center",
    backgroundColor: theme.colors.surfaceVariant,
  },
  showMore: {
    marginTop: 8,
    fontWeight: "600",
    borderRadius: 12,
    alignSelf: "center",
  },
});