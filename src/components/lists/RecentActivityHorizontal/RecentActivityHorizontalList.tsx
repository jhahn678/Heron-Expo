import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { RecentActivity } from '../../../hooks/queries/useGetRecentActivity'
import RecentActivityCatch from './RecentActivityCatch'

interface Props<T> {
    data: T[],
    onNavigateToCatch: (catchId: number) => void
    onNavigateToProfile: (userId: number) => void
}

const RecentActivityHorizontalList = <T extends RecentActivity>({
    data, onNavigateToCatch, onNavigateToProfile
}: Props<T>) => {

    return (
        <FlashList horizontal data={data} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 24 }}
            estimatedItemSize={300}
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
