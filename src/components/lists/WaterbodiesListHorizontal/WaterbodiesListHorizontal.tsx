import { FlashList } from '@shopify/flash-list'
import WaterbodiesListItem, { WaterbodyListItem } from './WaterbodiesListItem'
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
                    style={{ marginLeft: '1%', marginTop: 24 }}
                />
            )} 
            ListFooterComponent={() => <ListFooterSeeMore onPress={navigateViewMore}/>}
        />
    )
}

export default WaterbodiesListHorizontal;