import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { RecentActivity } from '../../../hooks/queries/useGetRecentActivity'
import RecentActivityCatch from './RecentActivityCatch'
import ListFooterSeeMore from '../shared/ListFooterSeeMore'
import { Button } from 'react-native-paper'

interface Props<T> {
    data: T[],
    onNavigateToCatch: (catchId: number) => void
    onNavigateToProfile: (userId: number) => void
    onNavigateSeeMore: () => void
}

const RecentActivityHorizontalList = <T extends RecentActivity>({
    data, 
    onNavigateSeeMore,
    onNavigateToCatch, 
    onNavigateToProfile,
}: Props<T>) => {

    return (
        <FlashList 
            horizontal 
            data={data} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 24 }}
            ListFooterComponent={() => (
                <Button 
                    icon='arrow-right'
                    onPress={onNavigateSeeMore}
                    style={{ marginTop: 180, marginRight: 24 }}
                    contentStyle={{ flexDirection: 'row-reverse'}}
                >See More</Button>
            )}
            estimatedItemSize={320}
            renderItem={({ item }) => (
                <RecentActivityCatch
                    key={item.id} data={item} 
                    onNavigateToCatch={() => onNavigateToCatch(item.id)}
                    onNavigateToProfile={() => onNavigateToProfile(item.user.id)}
                />
            )}
        />
    )
}

export default RecentActivityHorizontalList
