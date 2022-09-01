import { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Surface } from 'react-native-paper'
import CategoryChip from '../../buttons/CategoryChip'
import { ExploreStackScreenProps } from '../../../types/navigation'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const CategorySection = ({ navigation }: Props) => {

    const [classifications] = useState([
        { label: 'Rivers', value: 'river' },
        { label: 'Lakes', value: 'lake' },
        { label: 'Creeks', value: 'creek' },
        { label: 'Ponds', value: 'pond' }
    ])

    return (
        <View style={styles.container}>
            { classifications.map(({ label, value}) =>
                <CategoryChip 
                    navigation={navigation}
                    value={value} 
                    label={label}
                />
            )}
        </View>
    )
}

export default CategorySection

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 16
    }
})