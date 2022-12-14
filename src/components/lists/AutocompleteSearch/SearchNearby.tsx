import React from 'react'
import { StyleSheet, Pressable, Dimensions } from 'react-native'
import { Title } from 'react-native-paper'
import { ExploreStackScreenProps } from '../../../types/navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useLocationStore } from '../../../store/location/useLocationStore'
const { width } = Dimensions.get('screen')

interface Props {
    navigation: ExploreStackScreenProps<'SearchBarScreen'>['navigation']
}

const SearchNearby = ({ navigation }: Props) => {

    const { hasPermission } = useLocationStore()
    
    const handlePress = () => {
        if(hasPermission){
            navigation.navigate('SearchResultsScreen', { title: 'Results near me'})
        }else{
            alert('Location sharing must be turned on to use this feature')
        }
    }

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Icon name='near-me' size={24}/>
            <Title style={styles.title}>See what's nearby</Title>
        </Pressable>
    )
}

export default SearchNearby

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: width - 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 12,
        backgroundColor: "#e3e3e3",
        marginBottom: 8
    },
    title: {
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 8
    }
})