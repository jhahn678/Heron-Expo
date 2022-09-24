import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Text, Title } from 'react-native-paper'
import FishermanCatchingFish from "../../../components/svg/FishermanCatchingFish";
import { ExploreStackScreenProps } from "../../../types/navigation";
import { FlashList } from "@shopify/flash-list";
import { CatchQuery, CatchSort } from "../../../types/Catch";
import CatchesListItem from "../../../components/lists/CatchesListHorizontal/CatchesListItem";
import ListFooterSeeMore from "../../../components/lists/shared/ListFooterSeeMore";
import { useBottomSheetStore } from '../../../store/modal/useBottomSheetStore'
import { useGetCatches } from "../../../hooks/queries/useGetCatches";

interface Props {
    navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
    waterbody: number
    name: string | undefined
    totalCatches: number | undefined
    totalSpecies: number | undefined
}

const CatchesSection = ({ navigation, name, waterbody, totalCatches, totalSpecies }: Props) => {

    const openSpecies = useBottomSheetStore(store => () => store.openSpecies(waterbody))

    const { data, loading, error } = useGetCatches({ 
        limit: 3, 
        id: waterbody, 
        type: CatchQuery.Waterbody, 
        sort: CatchSort.CreatedAtNewest,
    })

    const navigateCatches = () => navigation.navigate('CatchListScreen', { 
        type: CatchQuery.Waterbody, id: waterbody, title: name, total: totalCatches 
    })

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Fishing Report</Title>
            <View style={styles.summary}>
                <FishermanCatchingFish/>
                <View style={styles.divider}/>
                <Pressable style={styles.text} onPress={navigateCatches}>
                    <Text style={styles.number}>{totalCatches}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 12 }}>Catches</Text>
                </Pressable>
                <View style={styles.divider}/>
                <Pressable style={styles.text} onPress={openSpecies}>
                    <Text style={styles.number}>{totalSpecies}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 12 }}>Species</Text>
                </Pressable>
            </View>
            <Title style={styles.title}>Latest Catches</Title>
            <View style={styles.list}>
                <FlashList
                    data={data?.catches} horizontal
                    estimatedItemSize={300}
                    renderItem={({ item }) => (
                        <CatchesListItem
                            key={item.id}
                            data={item}
                            navigation={navigation}
                            waterbody={waterbody}
                        />
                    )} 
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={() => (
                        <ListFooterSeeMore
                            onPress={navigateCatches} 
                            style={styles.seemore}
                        />
                    )}
                    contentContainerStyle={{ paddingLeft: 16, paddingRight: 32 }}
                />
            </View>
        </View>
    );
};

export default CatchesSection;

const styles = StyleSheet.create({
    container: {
        borderColor: 'rgba(0,0,0,.1)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
        paddingTop: 16,
        paddingBottom: 24
    },
    title: {
        fontWeight: '600',
        marginBottom: 24,
        marginLeft: 16
    },
    summary: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 24,
        marginHorizontal: 16
    },
    text: {
        alignItems: 'center'
    },
    divider: {
        height: '40%',
        backgroundColor: 'rgba(0,0,0,.1)',
        width: 1,
    },
    number: {
        fontSize: 28,
        fontWeight: '600'
    },
    arrow: {
        position: 'absolute',
        right: 16
    },
    list: {
        height: 332
    },
    seemore: {
        flexGrow: 1,
        marginLeft: 16,
        marginRight: 24
    }
});