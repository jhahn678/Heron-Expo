import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Title, Text } from 'react-native-paper'
import NavigateToUserSearch from '../../../../components/buttons/NavigateToUserSearch'
import ContactsListHorizontal from '../../../../components/lists/ContactsListHorizontal/ContactsListHorizontal'
import { useGetMyContactsQuery } from '../../../../hooks/queries/useGetMyContactsQuery'
import { useGetMyContactsQueryMock } from '../../../../../__mocks'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import { useAuth } from '../../../../store/auth/useAuth'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const ContactsSection = ({ navigation }: Props): JSX.Element => {

    const handleNavigateToProfile = (id: number) => navigation.navigate('UserProfileScreen', { id })
    const data = useGetMyContactsQueryMock;
    const { loading, error } = useGetMyContactsQuery()
    const notAuthenticated = useAuth(state => !state.isAuthenticated)


    return (
        <View style={styles.container}>
            <Title style={styles.title}>Your fishing pals</Title>
            {   data ? data.me.contacts.length > 0 ? 
                    <ContactsListHorizontal 
                        data={data.me.contacts} 
                        onNavigateToProfile={handleNavigateToProfile}
                    />
                : 
                    <NavigateToUserSearch/>
                : loading ?
                    <ActivityIndicator size='large' style={{ marginTop: 12 }}/>
                : error ? 
                    <Text style={styles.message}>Error loading contacts</Text>
                : notAuthenticated &&
                    <Text style={styles.message}>Login to connect with other fishermen🎣</Text>

            }
        </View>
    )
}

export default ContactsSection;

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: '100%',
        marginTop: 24,
    },
    title: {
        fontWeight: '600',
        paddingLeft: 24,
        marginBottom: 16
    },
    message: {
        marginTop: 24,
        textAlign: 'center',
        fontWeight: '500'
    }
})