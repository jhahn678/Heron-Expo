import { FlashList } from '@shopify/flash-list'
import WaterbodiesListItem from './WaterbodiesListItem'
import { WaterbodyListItem } from '../../../types/Waterbody'
import ListFooterSeeMore from '../shared/ListFooterSeeMore'
import WaterbodiesListLoader from '../../loaders/WaterbodyListLoader'

interface Props<T> {
    data: T[] | undefined
    navigateToWaterbody: (id: number) => void
    navigateViewMore: () => void
}

const WaterbodiesListHorizontal = <T extends WaterbodyListItem>({ 
    data, navigateViewMore, navigateToWaterbody 
}: Props<T>) => {

    return (
        <FlashList 
            horizontal data={data ? data : new Array(6).fill(null)}
            estimatedItemSize={300}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            renderItem={({ item }) => (
                data ? 
                <WaterbodiesListItem 
                    data={item} key={item.id}
                    navigate={() => navigateToWaterbody(item.id)}
                /> : 
                <WaterbodiesListLoader 
                    key={Math.random()}
                    style={{ marginTop: 24, marginLeft: '1%' }}
                />
            )} 
            ListFooterComponent={() => <ListFooterSeeMore onPress={navigateViewMore}/>}
        />
    )
}

export default WaterbodiesListHorizontal;