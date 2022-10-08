import { Pressable, StyleSheet, View } from 'react-native'
import SearchBar from '../../../../components/inputs/SearchBar'
import { Title } from 'react-native-paper'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import { useAuth } from '../../../../store/auth/useAuth'
import Avatar from '../../../../components/users/Avatar'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const HeaderSection = ({ navigation }: Props) => {

    const { isAuthenticated, firstname, avatar, signOut } = useAuth()

    const navigateToSearch = () => navigation.navigate('SearchBarScreen')
    const navigateToProfile = () => navigation.navigate('MyProfileScreen')
    const navigateToAuth = () => navigation.navigate('HomeAuthScreen')
    

    return (
        <View style={styles.header}>
            <View style={styles.titleGroup}>
                <Title style={styles.title}>Looking for a place to fish?</Title>
                <Avatar 
                    uri={avatar} 
                    firstname={firstname} 
                    onPress={isAuthenticated ? navigateToProfile : navigateToAuth}
                /> 
            </View>
            <SearchBar 
                placeholder='Search name or place'
                onPress={navigateToSearch} 
                enabled={false}
            />
        </View>
    )
}

export default HeaderSection

const styles = StyleSheet.create({
    header: {
        paddingTop: 72,
        paddingHorizontal: 24,
        display: 'flex',
    },
    titleGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },
    title: {
        maxWidth: '70%',
        fontSize: 28,
        fontWeight: '500',
    }
})