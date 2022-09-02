import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import SearchBar from '../../inputs/SearchBar'
import { Title, Avatar } from 'react-native-paper'
import { ExploreStackScreenProps } from '../../../types/navigation'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const HeaderSection = ({ navigation }: Props) => {

    const [input, setInput] = useState('')

    return (
        <View style={styles.header}>
            <View style={styles.titleGroup}>
                <Title style={styles.title}>Looking for a place to fish?</Title>
                <Avatar.Icon icon='account-circle' size={52}/>
            </View>
            <SearchBar value={input} setValue={setInput}/>
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