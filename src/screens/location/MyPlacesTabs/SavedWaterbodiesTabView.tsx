import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MyPlacesTabsScreenProps } from "../../../types/navigation";
import { useGetMySavedWaterbodies } from "../../../hooks/queries/useGetMySavedWaterbodies";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native-paper";
import ReviewsListEmpty from "../../../components/lists/shared/ReviewsListEmpty";
import WaterbodiesListItem from "../../../components/lists/WaterbodiesListHorizontal/WaterbodiesListItem";
import CatchesListEmpty from "../../../components/lists/shared/CatchesListEmpty";

const { width } = Dimensions.get('screen')

const SavedWaterbodiesTabView = ({ navigation }: MyPlacesTabsScreenProps<'MySavedWaterbodies'>) => {

    const { data, loading, refetch, fetchMore } = useGetMySavedWaterbodies()

    const [refetching, setRefetching] = useState(false)
    const handleRefetch = () => { setRefetching(true); refetch().then(() => setRefetching(false)) }

    const handleFetchMore = () => {
        if(!data || data.me.saved_waterbodies.length === 0) return;
        if(data.me.saved_waterbodies.length % 20 === 0){
            fetchMore({ variables: { offset: data.me.saved_waterbodies.length }})
        }
    }

    const navigateWaterbody = (id: number) => () => navigation
        .navigate('ExploreStack', { screen: 'WaterbodyScreen', params: { id } })

    return (
        <View style={styles.container}>
            {
                data && data.me.saved_waterbodies.length > 0 ? 
                    <FlashList
                    estimatedItemSize={300}
                    showsVerticalScrollIndicator={false}
                    refreshing={refetching}
                    onRefresh={handleRefetch}
                    onEndReached={handleFetchMore}
                    onEndReachedThreshold={.4}
                    data={data.me.saved_waterbodies}
                    renderItem={({ item }) => (
                        <WaterbodiesListItem 
                            data={item} 
                            navigate={navigateWaterbody(item.id)}
                            containerStyle={styles.card}
                        />
                    )}
                    />
                : loading ?
                    <ActivityIndicator size={48} style={styles.empty}/>
                : 
                    <CatchesListEmpty
                        caption="No Saved Locations" 
                        scale={.8} 
                        fontSize={16} 
                        style={styles.empty}
                    />
            }
        </View>
    );
};

export default SavedWaterbodiesTabView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    empty: {
        marginTop: 150
    },
    card: {
        width: width - 32,
        marginHorizontal: 16
    }
});
