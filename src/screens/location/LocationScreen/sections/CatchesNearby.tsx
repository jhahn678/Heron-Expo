import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GetLocationRes } from "../../../../hooks/queries/useGetLocation";
import { useGetCatches } from "../../../../hooks/queries/useGetCatches";
import { CatchQuery, CatchSort } from "../../../../types/Catch";
import { geomToCoordinates } from "../../../../utils/conversions/geomToCoordinates";
import RecentActivityCatch from "../../../../components/lists/RecentActivityHorizontal/RecentActivityCatch";
import { RootStackScreenProps } from "../../../../types/navigation";
import BoxLoader from "../../../../components/loaders/BoxLoader";
import CatchesListEmpty from "../../../../components/lists/shared/CatchesListEmpty";

interface Props {
    navigation: RootStackScreenProps<'ViewLocationScreen'>['navigation']
    geom: GetLocationRes['location']['geom'] | undefined
    waterbody: GetLocationRes['location']['waterbody']['id'] | undefined
}

const CatchesNearby = ({ waterbody, geom, navigation }: Props) => {

    const navigateToCatch = (id: number) => () => navigation.navigate('ViewCatchScreen', { id })

    const navigateToUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

    const { data, loading, error } = useGetCatches({ 
        type: CatchQuery.Waterbody,
        id: waterbody,
        coordinates: geomToCoordinates(geom),
        within: 50000,
        sort: CatchSort.Nearest,
        limit: 5,
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Catches Nearby</Text>
            { data ?
                <FlashList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    estimatedItemSize={350}
                    contentContainerStyle={{ paddingLeft: 16 }}
                    data={data?.catches} 
                    ListEmptyComponent={
                        <CatchesListEmpty 
                            scale={.7} 
                            fontSize={16} 
                            caption={'No Catches Nearby'}
                        />
                    }
                    renderItem={({ item }) => (
                        <RecentActivityCatch 
                            data={item} key={item.id}
                            onNavigateToCatch={navigateToCatch(item.id)}
                            onNavigateToProfile={navigateToUser(item.user.id)}
                        />
                    )}
                />
                : loading ? new Array(3).fill(null).map((_,i) => <BoxLoader key={i}/>)
                : null
            }
        </View>
    );
};

export default CatchesNearby;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 32,
    },
    title: {
        borderTopWidth: 1,
        borderTopColor: '#d9d9d9',
        paddingTop: 32,
        marginBottom: 8,
        marginHorizontal: 16,
        fontSize: 20,
        fontWeight: '500'
    }
});
