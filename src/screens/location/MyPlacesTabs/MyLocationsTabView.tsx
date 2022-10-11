import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import LocationListItem from "../../../components/lists/LocationList/LocationListItem";
import LocationsListEmpty from "../../../components/lists/shared/LocationsListEmpty";
import { useGetMyLocations } from "../../../hooks/queries/useGetMyLocations";
import { useMyLocationsModalStore } from "../../../store/modal/useMyLocationsModalStore";
import { MapResource, MyPlacesTabsScreenProps } from "../../../types/navigation";
import FiltersSection from "./sections/FiltersSection";

const limit = 20;

const MyLocationsTabView = ({ navigation }: MyPlacesTabsScreenProps<'MyLocationsList'>) => {

    const filters = useMyLocationsModalStore(store => ({
        maxDate: store.maxDate,
        minDate: store.minDate,
        waterbody: store.waterbody,
        privacy: store.privacy
    }))

    const { data, loading, refetch, fetchMore } = useGetMyLocations({ ...filters, limit })

    const [refetching, setRefetching] = useState(false)
    const handleRefetch = () => { setRefetching(true); refetch().then(() => setRefetching(false)) }

    const handleFetchMore = () => {
        if(!data || data.me.locations.length === 0) return;
        if(data.me.locations.length % limit === 0){
            fetchMore({ variables: { offset: data.me.locations.length } })
        }
    }

    const navigateToWaterbody = (id: number) => () => navigation
        .navigate('ExploreStack', { screen: 'WaterbodyScreen', params: { id } })

    const navigateToMap = (id: number) => () => navigation
        .navigate('ViewMapScreen', { resource: MapResource.Location, id })

    const navigateToUser = (id: number) => () => navigation
        .navigate('UserProfileScreen', { id })

    return (
        <View style={styles.container}>
            { data ?
                <FlashList 
                    data={data.me.locations} 
                    estimatedItemSize={400}
                    refreshing={refetching}
                    onRefresh={handleRefetch}
                    onEndReachedThreshold={.4}
                    onEndReached={handleFetchMore}
                    ListEmptyComponent={
                        <LocationsListEmpty 
                            scale={.7} 
                            fontSize={18} 
                            style={styles.empty}
                            caption={'No saved locations'}
                        />
                    }
                    ListHeaderComponent={<FiltersSection/>}
                    renderItem={({ item }) => (
                    <LocationListItem
                        data={item}
                        navigateToWaterbody={navigateToWaterbody(item.waterbody.id)}
                        navigateToMap={navigateToMap(item.id)}
                        navigateToUser={navigateToUser(item.user.id)}
                    />
                    )}
                /> 
                : <ActivityIndicator size={48} style={styles.empty}/>
            }
        </View>
    );
};

export default MyLocationsTabView;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    empty: {
        marginTop: 140
    }
});
