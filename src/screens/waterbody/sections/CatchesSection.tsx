import React from "react";
import { StyleSheet, View, Pressable, Dimensions } from "react-native";
import { Text, Title } from 'react-native-paper'
import FishermanCatchingFish from "../../../components/svg/FishermanCatchingFish";
import { ExploreStackScreenProps } from "../../../types/navigation";
import { FlashList } from "@shopify/flash-list";
import { CatchQuery, CatchSort } from "../../../types/Catch";
import CatchesListItem from "../../../components/lists/CatchesListHorizontal/CatchesListItem";
import ListFooterSeeMore from "../../../components/lists/shared/ListFooterSeeMore";
import { useBottomSheetStore } from '../../../store/modal/useBottomSheetStore'
import RectangleLoader from "../../../components/loaders/RectangleLoader";
import { useGetCatches } from "../../../hooks/queries/useGetCatches";
import ScrollViewListLoader from "../../../components/loaders/ScrollViewListLoader";
import PromptCreateCatchCard from "../../../components/cards/PromptCreateCatchCard";
const { width } = Dimensions.get('screen')
const limit = 3;

interface Props {
    navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
    waterbody: number
    name: string | undefined
    totalCatches: number | undefined
    totalSpecies: number | undefined
}

const CatchesSection = ({ navigation, name, waterbody, totalCatches, totalSpecies }: Props) => {

    const openSpecies = useBottomSheetStore(store => store.openSpecies)
    const handleOpenSpecies = () => openSpecies(waterbody)

    const { data } = useGetCatches({ 
        limit,
        id: waterbody, 
        type: CatchQuery.Waterbody, 
        sort: CatchSort.CreatedAtNewest,
    })

    const navigateNewCatch = () => navigation.navigate('NewCatchScreen', { waterbody })

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
                    { totalCatches !== undefined ? 
                        <Text style={styles.number}>{totalCatches}</Text> : 
                        <RectangleLoader height={28} width={28} style={styles.totalLoading}/>
                    }
                    <Text style={{ fontWeight: '400', fontSize: 12 }}>Catches</Text>
                </Pressable>
                <View style={styles.divider}/>
                <Pressable style={styles.text} onPress={handleOpenSpecies}>
                    { totalSpecies !== undefined ? 
                        <Text style={styles.number}>{totalSpecies}</Text> :
                        <RectangleLoader height={28} width={28} style={styles.totalLoading}/>
                    }
                    <Text style={{ fontWeight: '400', fontSize: 12 }}>Species</Text>
                </Pressable>
            </View>
            <Title style={styles.title}>Latest Catches</Title>
            { data ? 
                data.catches.length > 0 ?
                    <View style={{ height: 332 }}>
                        <FlashList
                        horizontal
                        data={data.catches} 
                        estimatedItemSize={300}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 16, paddingRight: 32 }}
                        renderItem={({ item }) => (
                            <CatchesListItem
                                key={item.id}
                                data={item}
                                navigation={navigation}
                                waterbody={waterbody}
                            />
                        )} 
                        ListFooterComponent={data.catches.length === limit ? () => (
                            <ListFooterSeeMore
                                onPress={navigateCatches} 
                                style={styles.seemore}
                            />
                        ): null}
                        />
                    </View> 
                :
                    <PromptCreateCatchCard 
                        containerStyle={styles.empty} 
                        onPress={navigateNewCatch}/>
                :
                    <ScrollViewListLoader/>
            }
            <View style={styles.hdivider}/>
        </View>
    );
};

export default CatchesSection;

const styles = StyleSheet.create({
    container: {
        width
    },
    title: {
        fontWeight: '600',
        marginBottom: 24,
        marginHorizontal: 16,
        borderTopColor: '#d9d9d9',
        borderTopWidth: 1,
        paddingTop: 24
    },
    summary: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 32,
        marginHorizontal: 16
    },
    text: {
        alignItems: 'center'
    },
    divider: {
        height: '40%',
        backgroundColor: '#d9d9d9',
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
    seemore: {
        flexGrow: 1,
        marginLeft: 16,
        marginRight: 24
    },
    hdivider: {
        height: 1,
        backgroundColor: '#d9d9d9',
        width: '100%',
        marginHorizontal: 16,
        marginTop: 36,
        marginBottom: 24
    },
    totalLoading: {
        top: 6,
        marginBottom: 10,
        position: 'relative',
    },
    empty: {
        marginHorizontal: 16
    }
});