import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Title, Text, Button } from 'react-native-paper'
import ContactsListHorizontal from '../../../../components/lists/ContactsListHorizontal/ContactsListHorizontal'
import { useGetMyFollowing } from '../../../../hooks/queries/useGetUserFollowing'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import { useAuth } from '../../../../store/auth/useAuth'
import ScrollViewListLoader from '../../../../components/loaders/ScrollViewListLoader'
import PromptAddFriendsCard from '../../../../components/cards/PromptAddFriendsCard'
import PromptLoginCard from '../../../../components/cards/PromptLoginCard'

const limit = 20;

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const ContactsSection = ({ navigation }: Props): JSX.Element => {

    const handleNavigateToProfile = (id: number) => navigation.navigate('UserProfileScreen', { id })

    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const { data, loading, error } = useGetMyFollowing({ limit })

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Your fishing pals</Title>
            { data ? 
                data.me.following.length > 0 ? 
                    <ContactsListHorizontal 
                        data={data.me.following} 
                        onNavigateToProfile={handleNavigateToProfile}
                    />
                : 
                    <PromptAddFriendsCard containerStyle={styles.card}/>
                : !isAuthenticated ?
                    // <PromptLoginCard containerStyle={styles.card}/>
                    <PromptAddFriendsCard containerStyle={styles.card}/>
                :
                    <ScrollViewListLoader
                        itemSize={{ height: 164, width: 132 }}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8}}
                    />
            }
        </View>
    )
}

export default ContactsSection;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 32,
    },
    title: {
        fontWeight: '600',
        paddingLeft: 24,
        marginBottom: 24
    },
    card: {
        marginHorizontal: 16
    }
})