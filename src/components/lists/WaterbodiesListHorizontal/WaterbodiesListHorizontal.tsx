import { FlashList } from '@shopify/flash-list'
import WaterbodiesListItem from './WaterbodiesListItem'
import { ExploreStackScreenProps } from '../../../types/navigation'
import { WaterbodyListItem } from '../../../types/Waterbody'
import ListFooterSeeMore from '../shared/ListFooterSeeMore'

interface Props<T> {
    data: T[]
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation'],
    navigateViewMore: () => void
}

const WaterbodiesListHorizontal = <T extends WaterbodyListItem>({ 
    navigation, data, navigateViewMore 
}: Props<T>) => {
    
    const navigateWaterbody = (id: number) => navigation.navigate('WaterbodyScreen', { id })

    return (
        <FlashList horizontal data={data}
            contentContainerStyle={{ paddingHorizontal: '1%' }}
            estimatedItemSize={300}
            renderItem={({ item }) => (
                <WaterbodiesListItem 
                    navigate={navigateWaterbody}
                    data={item}
                />
            )} 
            ListFooterComponent={() => <ListFooterSeeMore onPress={navigateViewMore}/>}
        />
    )
}

export default WaterbodiesListHorizontal;