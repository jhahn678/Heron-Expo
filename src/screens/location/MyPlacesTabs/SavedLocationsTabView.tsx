import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import LocationListItem from "../../../components/lists/LocationList/LocationListItem";
import ReviewsListEmpty from "../../../components/lists/shared/ReviewsListEmpty";
import { useGetMySavedLocations } from "../../../hooks/queries/useGetMySavedLocations";
import { MapResource, MyPlacesTabsScreenProps } from "../../../types/navigation";

const SavedLocationsTabView = ({ navigation }: MyPlacesTabsScreenProps<'MySavedLocations'>) => {

    const { data, loading, refetch, fetchMore } = useGetMySavedLocations()

    const [refetching, setRefetching] = useState(false)
    const handleRefetch = () => { setRefetching(true); refetch().then(() => setRefetching(false)) }

    const handleFetchMore = () => {
        if(!data || data.me.saved_locations.length === 0) return;
        if(data.me.saved_locations.length % 20 === 0){
            fetchMore({ variables: { offset: data.me.saved_locations.length }})
        }
    }

    const navigateToMap = (id: number) => () => navigation
        .navigate('ViewMapScreen', { resource: MapResource.Location, id })

    const navigateToUser = (id: number) => () => navigation
        .navigate('UserProfileScreen', { id })

    const navigateToWaterbody = (id: number)  => () => navigation
        .navigate('ExploreStack', { screen: 'WaterbodyScreen', params: { id } })

    return (
        <View style={styles.container}>
            { 
                data ?
                    <FlashList
                        estimatedItemSize={300}
                        showsVerticalScrollIndicator={false}
                        refreshing={refetching}
                        onRefresh={handleRefetch}
                        onEndReached={handleFetchMore}
                        onEndReachedThreshold={.4}
                        contentContainerStyle={{ paddingTop: 16 }}
                        ListEmptyComponent={
                            <ReviewsListEmpty 
                                caption="No bookmarked locations" 
                                scale={.8} 
                                fontSize={16} 
                                style={styles.empty}
                            />
                        }
                        data={data.me.saved_locations} 
                        renderItem={({ item }) => (
                            <LocationListItem 
                                data={item}
                                navigateToMap={navigateToMap(item.id)}
                                navigateToUser={navigateToUser(item.user.id)}
                                navigateToWaterbody={navigateToWaterbody(item.waterbody.id)}
                            />
                        )}
                    /> 
                : loading ?
                    <ActivityIndicator size={48} style={styles.empty}/>
                : null
            } 
        </View>
    );
};

export default SavedLocationsTabView;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    empty: {
        marginTop: 200
    }
});
