import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Text, ActivityIndicator } from 'react-native-paper'
import RecentActivityHorizontalList from '../../../../components/lists/RecentActivityHorizontal/RecentActivityHorizontalList'
import { useGetRecentActivityQuery } from '../../../../hooks/queries/useGetRecentActivity'
import { CatchQuery } from '../../../../types/Catch'
import { ExploreStackScreenProps } from '../../../../types/navigation'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const ContactsActivity = ({ navigation }: Props) => {

    const { data, loading, error } = useGetRecentActivityQuery()

    const handleNavigateToCatch = (id: number) => navigation.navigate('ViewCatchScreen', { id })
    const handleNavigateToProfile = (id: number) => navigation.navigate('UserProfileScreen', { id })
    const handleNavigateSeeMore = () => navigation.navigate('CatchListScreen', { 
        type: CatchQuery.Following, title: 'Recent Activity' })
    
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Recent activity</Title>
            { 
                data ? data.activityFeed.length > 0 ?
                    <RecentActivityHorizontalList 
                        data={data.activityFeed} 
                        onNavigateToCatch={handleNavigateToCatch}
                        onNavigateToProfile={handleNavigateToProfile}
                        onNavigateSeeMore={handleNavigateSeeMore}
                    />
                : 
                    <Text style={styles.message}>Your friends have not logged any catches yet 🐟</Text>
                : loading ?
                    <ActivityIndicator size='large' style={styles.message}/>
                : error &&
                    <Text style={styles.message}>Error loading recent activity</Text>
            }
        </View>
    )
}

export default ContactsActivity

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        paddingHorizontal: '6%',
    },
    message: {
        paddingTop: 36,
        fontWeight: '600',
        alignSelf: 'center'
    }
})