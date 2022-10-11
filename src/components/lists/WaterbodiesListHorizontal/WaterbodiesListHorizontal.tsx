import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'
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
        <View style={{ height: 368, paddingVertical: 24 }}>
            <FlashList 
                data={data}
                horizontal={true}
                estimatedItemSize={300}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20 }}
                renderItem={({ item }) => (
                    <WaterbodiesListItem 
                        data={item} key={item.id}
                        navigate={() => navigateToWaterbody(item.id)}
                    />
                )} 
                ListFooterComponent={() => <ListFooterSeeMore onPress={navigateViewMore}/>}
            />
        </View>
    )
}

export default WaterbodiesListHorizontal;