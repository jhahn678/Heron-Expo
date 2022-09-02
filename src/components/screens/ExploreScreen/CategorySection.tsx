import { useState } from 'react'
import { StyleSheet, View} from 'react-native'
import CategoryChip from '../../buttons/CategoryChip'
import { ExploreStackScreenProps } from '../../../types/navigation'
import { WaterbodyClassification } from '../../../types/Waterbody'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

interface data {
    label: string
    value: WaterbodyClassification
}

const CategorySection = ({ navigation }: Props) => {

    const [classifications] = useState<data[]>([
        { label: 'Rivers', value: 'river' },
        { label: 'Lakes', value: 'lake' },
        { label: 'Creeks', value: 'creek' },
        { label: 'Ponds', value: 'pond' }
    ])

    return (
        <View style={styles.container}>
            { classifications.map(({ label, value }) =>
                <CategoryChip key={label}
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 16,
        paddingHorizontal: '5%'
    }
})