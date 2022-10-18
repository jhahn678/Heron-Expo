import React from 'react'
import { StyleSheet, Pressable, Dimensions } from 'react-native'
import { Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSearchParamStore } from '../../../store/search/useSearchParamStore'
import { ExploreStackScreenProps } from '../../../types/navigation'
const { width } = Dimensions.get('screen')

interface Props {
    navigation: ExploreStackScreenProps<'SearchBarScreen'>['navigation']
    value: string
}

const SearchInputValue = ({ navigation, value }: Props) => {

    const setValue = useSearchParamStore(state => state.setValue)

    const handlePress = () => {
        setValue(value)
        navigation.navigate('SearchResultsScreen')
    }

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Icon name='search' size={24}/>
            <Title style={styles.title}>{`Search ${value}`}</Title>
        </Pressable>
    )
}

export default SearchInputValue

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: width - 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,.05)',
        marginBottom: 8
    },
    title: {
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 8,
    }
})