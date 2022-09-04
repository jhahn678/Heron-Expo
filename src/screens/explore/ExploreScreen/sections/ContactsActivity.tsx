import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Text, ActivityIndicator } from 'react-native-paper'
import RecentActivityHorizontalList from '../../../../components/lists/RecentActivityHorizontal/RecentActivityHorizontalList'
import { useGetRecentActivityQuery } from '../../../../hooks/queries/useGetRecentActivity'
import { useGetRecentActivityQueryMock } from '../../../../../__mocks'
import { ExploreStackScreenProps } from '../../../../types/navigation'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const ContactsActivity = ({
    navigation
}: Props): JSX.Element => {

    // const { data, loading, error } = useGetRecentActivityQuery()
    // const data = useGetRecentActivityQueryMock;
    const data = { activityFeed: [] }
    const loading = true;
    const error = false;

    const handleNavigateToCatch = (id: number) => navigation.navigate('ViewCatchScreen', { id })
    const handleNavigateToProfile = (id: number) => navigation.navigate('UserProfileScreen', { id })

    return (
        <View style={[styles.container, { height: data?.activityFeed.length > 0 ? 370 : 130 }]}>
            <Title style={styles.title}>Recent activity</Title>
            { 
                data ? data.activityFeed.length > 0 ?
                    <RecentActivityHorizontalList 
                        data={data.activityFeed} 
                        onNavigateToCatch={handleNavigateToCatch}
                        onNavigateToProfile={handleNavigateToProfile}
                    />
                : 
                    <Text style={styles.message}>Your friends have not logged any catches yet 🐟</Text>
                : loading ?
                    <ActivityIndicator size='large'/>
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
        marginBottom: 24
    },
    message: {
        paddingLeft: 24,
        paddingTop: 24, 
        fontWeight: '600',
        textAlign: 'center',
        width: '70%',
        alignSelf: 'center'
    }
})