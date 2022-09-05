import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import SearchBar from '../../../../components/inputs/SearchBar'
import { Title, Avatar } from 'react-native-paper'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import { useAuth } from '../../../../store/auth/useAuth'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const HeaderSection = ({ navigation }: Props) => {

    const { isAuthenticated, firstname, avatar} = useAuth()

    const navigateToSearch = () => navigation.navigate('SearchBarScreen')
    const navigateToProfile = () => navigation.navigate('MyProfileScreen')
    const navigateToAuth = () => navigation.navigate('HomeAuthScreen')
    

    return (
        <View style={styles.header}>
            <View style={styles.titleGroup}>
                <Title style={styles.title}>Looking for a place to fish?</Title>
                { isAuthenticated ?
                    avatar ?
                        <Pressable onPress={navigateToProfile}>
                            <Avatar.Image source={{ uri: avatar }}/>
                        </Pressable>
                    : firstname &&
                        <Pressable onPress={navigateToProfile}>
                            <Avatar.Text label={firstname[0]}/>
                        </Pressable>
                    : 
                        <Pressable onPress={navigateToAuth}>
                            <Avatar.Icon icon='account' size={52}/>
                        </Pressable>

                }
            </View>
            <SearchBar onPress={navigateToSearch} enabled={false}/>
        </View>
    )
}

export default HeaderSection

const styles = StyleSheet.create({
    header: {
        paddingTop: 72,
        paddingHorizontal: '6%',
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