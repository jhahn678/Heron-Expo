import { FlashList } from '@shopify/flash-list'
import WaterbodiesListItem from './WaterbodiesListItem'
import { WaterbodyListItem } from '../../../types/Waterbody'
import ListFooterSeeMore from '../shared/ListFooterSeeMore'

interface Props<T> {
    data: T[]
    navigateToWaterbody: (id: number) => void
    navigateViewMore: () => void
}

const WaterbodiesListHorizontal = <T extends WaterbodyListItem>({ 
    data, navigateViewMore, navigateToWaterbody 
}: Props<T>) => {

    return (
        <FlashList 
            horizontal data={data}
            estimatedItemSize={300}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            renderItem={({ item }) => (
                <WaterbodiesListItem 
                    data={item}
                    navigate={() => navigateToWaterbody(item.id)}
                />
            )} 
            ListFooterComponent={() => <ListFooterSeeMore onPress={navigateViewMore}/>}
        />
    )
}

export default WaterbodiesListHorizontal;