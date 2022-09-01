import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Text } from 'react-native-paper'
import { FlashList } from '@shopify/flash-list'
import { useLocationStore } from '../../../store/location/useLocationStore'
import { ExploreStackScreenProps } from '../../../types/navigation'
import EnableLocationButton from '../../buttons/EnableLocationButton'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const NearbySection = ({ navigation }: Props) => {

    const { hasCoordinates } = useLocationStore()

    return (
        <View style={styles.container}>
            <Title style={styles.title}>What's nearby</Title>
            <EnableLocationButton for='waterbodies' style={{ marginTop: 12 }}/>
            {/* { !hasCoordinates ? 
                <FlashList 
                    data={[]} 
                    renderItem={() => <></>} 
                    // estimatedItemSize={} 
                    // estimatedListSize={}
                /> : 
                <EnableLocationButton for='waterbodies'/>
            } */}
        </View>
    )
}

export default NearbySection

const styles = StyleSheet.create({
    container: {
        marginTop: 32
    },
    title: {
        fontSize: 24,
        fontWeight: '600'
    }
})