import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MapResource, RootStackScreenProps } from "../../types/navigation";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Surface, Title } from "react-native-paper";
import { useGetLocationsQuery } from "../../hooks/queries/useGetLocationsQuery";
import LocationListItem from "../../components/lists/LocationList/LocationListItem";
import { useGetLocationsQueryMock } from "../../../__mocks";
import globalStyles from "../../globalStyles";

const limit = 16;

const LocationListScreen = ({ navigation, route }: RootStackScreenProps<'LocationListScreen'>) => {

    const { params: { id, title, type } } = route;

    const { data, loading, error, fetchMore } = useGetLocationsQuery({ type, id, limit }) 
    // const { data, loading, error } = useGetLocationsQueryMock({ limit })

    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        if(data) setHasMore(data.locations.length % limit === 0)
    },[data])

    const navigateUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

    const navigateMapLocations = () => navigation.navigate('ViewMapScreen', { resource: MapResource.WaterbodyLocations, id })

    const navigateMap = (id: number) => () => navigation.navigate('ViewMapScreen', { resource: MapResource.Location, id })

    const navigateWaterbody = (id: number) => () => navigation.navigate('MainTabs', {
        screen: 'ExploreStack',
        params: { screen: 'WaterbodyScreen', params: { id } }
    })

    return (
      <View style={styles.container}>
        <Surface style={styles.header}>
            <View style={globalStyles.frsb}>
                <IconButton icon="arrow-left" onPress={navigation.goBack} />
                <Title>{title}</Title>
            </View>
            <IconButton 
                icon="map" size={28} 
                onPress={navigateMapLocations} 
                style={{ marginRight: 8 }}
            />
        </Surface>
        <FlashList
          data={data?.locations}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 32 }}
          estimatedItemSize={300}
          onEndReachedThreshold={0.3}
          // onEndReached={hasMore ? () => (
          //     fetchMore({ variables: { offset: data?.locations.length }})
          // ): null}
          renderItem={({ item }) => (
            <LocationListItem
              key={item.id}
              data={item}
              navigateToMap={navigateMap(item.id)}
              navigateToUser={navigateUser(item.user.id)}
              navigateToWaterbody={navigateWaterbody(item.waterbody.id)}
            />
          )}
        />
      </View>
    );
};

export default LocationListScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    header: {
        position: 'relative',
        zIndex: 100,
        width: '100%',
        paddingTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80
    }
});

