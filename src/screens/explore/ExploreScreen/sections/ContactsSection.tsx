import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'
import ContactsListHorizontal from '../../../../components/lists/ContactsListHorizontal/ContactsListHorizontal'
import { useGetMyFollowing } from '../../../../hooks/queries/useGetUserFollowing'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import { useAuth } from '../../../../store/auth/useAuth'
import ScrollViewListLoader from '../../../../components/loaders/ScrollViewListLoader'
import PromptAddFriendsCard from '../../../../components/cards/PromptAddFriendsCard'
import PromptLoginCard from '../../../../components/cards/PromptLoginCard'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const ContactsSection = ({ navigation }: Props): JSX.Element => {

    const { data } = useGetMyFollowing({ limit: 20 })
    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const handleNavigateToProfile = (id: number) => navigation.navigate('UserProfileScreen', { id })
    const handleAddFriendsPress = () => navigation.navigate('UserSearchScreen')

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Your fishing pals</Title>
            { data ? 
                data.me.following.length > 0 ? 
                    <ContactsListHorizontal 
                        data={data.me.following} 
                        onNavigateToProfile={handleNavigateToProfile}/>
                : 
                    <PromptAddFriendsCard 
                        containerStyle={styles.card} 
                        onPress={handleAddFriendsPress}/>
                : !isAuthenticated ?
                    <PromptLoginCard containerStyle={styles.card}/>
                :
                    <ScrollViewListLoader
                        itemSize={{ height: 164, width: 132 }}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8 }}/>
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
        fontSize: 24,
        fontWeight: '600',
        paddingHorizontal: 24,
        marginBottom: 24
    },
    card: {
        marginHorizontal: 20
    }
})