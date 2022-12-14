import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'
import WaterbodiesListItem, { WaterbodyListItem } from './WaterbodiesListItem'
import ListFooterSeeMore from '../shared/ListFooterSeeMore'

interface Props<T> {
    data: T[] | undefined
    navigateToWaterbody: (id: number) => void
    navigateViewMore: () => void
}

const WaterbodiesListHorizontal = <T extends WaterbodyListItem>({ 
    data, navigateViewMore, navigateToWaterbody 
}: Props<T>) => {

    return (
        <View style={{ height: 400, paddingVertical: 24 }}>
            <FlashList 
                data={data}
                horizontal={true}
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
        </View>
    )
}

export default WaterbodiesListHorizontal;