import { Dimensions, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { MyPlacesTabsScreenProps } from "../../../types/navigation";
import { useGetMySavedWaterbodies } from "../../../hooks/queries/useGetMySavedWaterbodies";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native-paper";
import CatchesListEmpty from "../../../components/lists/shared/CatchesListEmpty";
import WaterbodySearchResult from "../../../components/lists/WaterbodySearch/WaterbodySearchResult";

const SavedWaterbodiesTabView = ({ navigation }: MyPlacesTabsScreenProps<'MySavedWaterbodies'>) => {

    const { data, refetch, fetchMore } = useGetMySavedWaterbodies()

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
            { data ? 
                <FlashList
                    refreshing={refetching}
                    estimatedItemSize={300}
                    onRefresh={handleRefetch}
                    onEndReachedThreshold={.4}
                    onEndReached={handleFetchMore}
                    data={data.me.saved_waterbodies}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 16 }}
                    ListEmptyComponent={
                        <CatchesListEmpty
                            caption="No saved fisheries" 
                            scale={.8} 
                            fontSize={16} 
                            style={styles.empty}
                        />
                    }
                    renderItem={({ item }) => (
                        <WaterbodySearchResult
                            data={item} 
                            onPress={navigateWaterbody(item.id)}
                        />
                    )}
                />
                : <ActivityIndicator size={48} style={styles.empty}/>
            }
        </View>
    );
};

export default SavedWaterbodiesTabView;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    empty: {
        marginTop: 200
    }
});
