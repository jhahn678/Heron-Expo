import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'
import RecentActivityEmpty from '../../../../components/lists/RecentActivityHorizontal/RecentActivityEmpty'
import RecentActivityHorizontalList from '../../../../components/lists/RecentActivityHorizontal/RecentActivityHorizontalList'
import ScrollViewListLoader from '../../../../components/loaders/ScrollViewListLoader'
import { useGetRecentActivityQuery } from '../../../../hooks/queries/useGetRecentActivity'
import { CatchQuery } from '../../../../types/Catch'
import { ExploreStackScreenProps } from '../../../../types/navigation'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const ContactsActivity = ({ navigation }: Props) => {

    const { data } = useGetRecentActivityQuery()

    const handleNavigateToCatch = (id: number) => navigation.navigate('ViewCatchScreen', { id })
    const handleNavigateToProfile = (id: number) => navigation.navigate('UserProfileScreen', { id })
    const handleNavigateSeeMore = () => navigation.navigate('CatchListScreen', { 
        type: CatchQuery.Following, title: 'Recent Activity' })

    if(!data) return (
        <View style={styles.container}>
            <Title style={styles.title}>Recent activity</Title>
            <ScrollViewListLoader 
                itemSize={{ height: 300, width: 300 }}
                contentContainerStyle={{ padding: 20 }}
                itemStyle={{ marginRight: 16 }}/>
        </View>
    );

    if(data.activityFeed.length === 0){
        return null;
    }
    
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Recent activity</Title>
            <RecentActivityHorizontalList 
                data={data.activityFeed} 
                onNavigateToCatch={handleNavigateToCatch}
                onNavigateToProfile={handleNavigateToProfile}
                onNavigateSeeMore={handleNavigateSeeMore}/>
        </View>
    )
}

export default ContactsActivity

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 48
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        paddingHorizontal: 24,
        marginBottom: 12
    },
    empty: {
        marginHorizontal: 16,
        marginTop: 16
    }
})