import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Title, Text, Button } from 'react-native-paper'
import NavigateToUserSearch from '../../../../components/buttons/NavigateToUserSearch'
import ContactsListHorizontal from '../../../../components/lists/ContactsListHorizontal/ContactsListHorizontal'
import { useGetMyFollowing } from '../../../../hooks/queries/useGetUserFollowing'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import { useAuth } from '../../../../store/auth/useAuth'

const limit = 20;

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const ContactsSection = ({ navigation }: Props): JSX.Element => {

    const handleNavigateToProfile = (id: number) => navigation.navigate('UserProfileScreen', { id })
    const handleNavigateToAuth = () => navigation.navigate('HomeAuthScreen', { showBack: true })

    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const { data, loading, error } = useGetMyFollowing({ limit })

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Your fishing pals</Title>
            {   data ? data.me.following.length > 0 ? 
                    <ContactsListHorizontal 
                        data={data.me.following} 
                        onNavigateToProfile={handleNavigateToProfile}
                    />
                : 
                    <NavigateToUserSearch/>
                : loading ?
                    <ActivityIndicator size='large' style={{ marginTop: 16 }}/>
                : error ? 
                    <Text style={styles.error}>Error loading users</Text>
                : !isAuthenticated &&
                    <>
                        <Text style={styles.message}>Login to connect with other fishermen🎣</Text>
                        <Button 
                            theme={{ roundness: 2 }}
                            mode='contained-tonal' 
                            style={styles.button} 
                            onPress={handleNavigateToAuth}
                        >Sign in</Button>
                    </>

            }
        </View>
    )
}

export default ContactsSection;

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: '100%',
        marginTop: 32,
    },
    title: {
        fontWeight: '600',
        paddingLeft: 24,
        marginBottom: 24
    },
    error: {
        marginTop: 24,
        textAlign: 'center',
        fontWeight: '500'
    },
    message: {
        marginTop: 16,
        textAlign: 'center',
        fontWeight: '500'
    },
    button: {
        marginTop: 8,
        width: 120,
        alignSelf: 'center'
    }
})