import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import ScrollViewListLoader from '../../../../components/loaders/ScrollViewListLoader'
import { useGetCatches } from '../../../../hooks/queries/useGetCatches'
import { CatchQuery, CatchSort } from '../../../../types/Catch'
import { FlashList } from '@shopify/flash-list'
import CatchesListItem from '../../../../components/lists/CatchesListHorizontal/CatchesListItem'
import ListFooterSeeMore from '../../../../components/lists/shared/ListFooterSeeMore'
import CatchesListEmpty from '../../../../components/lists/shared/CatchesListEmpty'
import PromptNearbyCatch from '../../../../components/cards/PromptNearbyCatch'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const limit = 10;

const NearbyCatchesSection = ({ navigation }: Props) => {

    const { data } = useGetCatches({ 
        limit, within: 150000,
        sort: CatchSort.Nearest, 
        type: CatchQuery.Coordinates
    })

    const handleNavigateToCatch = (id: number) => () => navigation
        .navigate('ViewCatchScreen', { id });

    const handleNavigateToUser = (id: number) => () => navigation
        .navigate('UserProfileScreen', { id });

    const handleNavigateNewCatch = () => navigation.navigate("NewCatchScreen")

    const handleSeeMoreCatches = () => navigation
        .navigate('CatchListScreen', { 
            title: 'Catches Near Me',
            type: CatchQuery.Coordinates
        })

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Catches Nearby</Title>
            { 
                data ?
                    data.catches.length > 0 ?
                    <FlashList
                        horizontal={true}
                        data={data.catches}
                        estimatedItemSize={300}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        ItemSeparatorComponent={() => <View style={{ width: 16 }}/>}
                        ListFooterComponent={data.catches.length === limit ? () => (
                            <ListFooterSeeMore
                                style={styles.seemore}
                                onPress={handleSeeMoreCatches} 
                            />
                        ): null}
                        renderItem={({ item }) => (
                            <CatchesListItem  
                                data={item} 
                                onNavigateToCatch={handleNavigateToCatch(item.id)}
                                onNavigateToUser={handleNavigateToUser(item.user.id)}/>
                        )}
                    />
                :
                    <PromptNearbyCatch 
                        onPress={handleNavigateNewCatch} 
                        containerStyle={styles.empty}/>
                :
                    <ScrollViewListLoader 
                        itemSize={{ height: 320, width: 300 }}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}/>
            }
        </View>
    );
}

export default NearbyCatchesSection;

const styles = StyleSheet.create({
    container: {
        marginTop: 48,
        marginBottom: 12
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        paddingHorizontal: 24,
        marginBottom: 12
    },
    seemore: {
        flexGrow: 1,
        marginLeft: 16,
        marginRight: 24,
        transform: [{ translateY: -24 }]
    },
    empty: {
        marginHorizontal: 16,
        marginTop: 16
    }
})
