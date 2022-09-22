import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GetLocationRes } from "../../../../hooks/queries/useGetLocation";
import CatchListItem from '../../../../components/lists/CatchesListHorizontal/CatchesListItem'
import { useGetCatches } from "../../../../hooks/queries/useGetCatches";
import { CatchQuery, CatchSort } from "../../../../types/Catch";
import { geomToCoordinates } from "../../../../utils/conversions/geomToCoordinates";

interface Props {
    geom: GetLocationRes['location']['geom'] | undefined
}

const CatchesNearby = ({ geom }: Props) => {

    console.log(geomToCoordinates(geom))

    const { data, loading } = useGetCatches({ 
        type: CatchQuery.Coordinates, 
        coordinates: geomToCoordinates(geom),
        sort: CatchSort.Nearest,
        limit: 5,
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Catches Near Here</Text>
            {/* <FlashList data={} renderItem={}/> */}
        </View>
    );
};

export default CatchesNearby;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24
    },
    title: {
        marginBottom: 24
    }
});
