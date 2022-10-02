import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import LocationListItem from "../../../components/lists/LocationList/LocationListItem";
import { useGetMyLocations } from "../../../hooks/queries/useGetMyLocations";
import { useMyLocationsModalStore } from "../../../store/modal/useMyLocationsModalStore";
import { MapResource, MyPlacesTabsScreenProps } from "../../../types/navigation";
import FiltersSection from "./sections/FiltersSection";

const limit = 20;

interface Props {
    navigation: MyPlacesTabsScreenProps<'MyLocationsList'>['navigation']
}

const MyLocationsTabView = ({ navigation }: Props) => {

    const filters = useMyLocationsModalStore(store => ({
        maxDate: store.maxDate,
        minDate: store.minDate,
        waterbody: store.waterbody,
    }))

    const { data, refetch, fetchMore } = useGetMyLocations({ ...filters, limit })

    const [refetching, setRefetching] = useState(false)
    const handleRefetch = () => { setRefetching(true); refetch().then(() => setRefetching(false)) }

    const handleFetchMore = () => {
        if(!data || data.me.locations.length % limit !== 0) return;
        fetchMore({ variables: { offset: data.me.locations.length } })
    }

    const navigateToWaterbody = (id: number) => () => navigation
        .navigate('ExploreStack', { screen: 'WaterbodyScreen', params: { id } })

    const navigateToMap = (id: number) => () => navigation
        .navigate('ViewMapScreen', { resource: MapResource.Location, id })

    const navigateToUser = (id: number) => () => navigation
        .navigate('UserProfileScreen', { id })

    return (
        <View style={styles.container}>
            <FlashList 
                data={data?.me.locations} 
                estimatedItemSize={400}
                refreshing={refetching}
                onRefresh={handleRefetch}
                onEndReachedThreshold={.4}
                onEndReached={handleFetchMore}
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
        </View>
    );
};

export default MyLocationsTabView;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
