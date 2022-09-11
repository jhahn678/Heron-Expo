import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Text, ActivityIndicator } from 'react-native-paper'
import { useLocationStore } from '../../../../store/location/useLocationStore'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import EnableLocationButton from '../../../../components/buttons/EnableLocationButton'
import WaterbodiesListHorizontal from '../../../../components/lists/WaterbodiesListHorizontal/WaterbodiesListHorizontal'
import { useGetNearbyWaterbodiesQuery } from '../../../../hooks/queries/useGetNearbyWaterbodiesQuery'
import { useSearchParamStore } from '../../../../store/search/useSearchParamStore'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const NearbySection = ({ navigation }: Props) => {

    const { setSort } = useSearchParamStore()
    const { latitude, longitude, hasPermission } = useLocationStore()
    
    const { data, loading, error } = useGetNearbyWaterbodiesQuery({ latitude, longitude })

    const navigateViewMore = (): void => {
        setSort('distance')
        navigation.navigate('SearchResultsScreen', { placeholder: 'Results near you'})
    }

    const navigateToWaterbody = (id: number): void => {
        navigation.navigate('WaterbodyScreen', { id })
    }

    return (
        <View style={[styles.container, { height: (hasPermission === false || error) ? 150 : 370}]}>
            <Title style={styles.title}>What's nearby</Title>
            { hasPermission === false ? 
                <EnableLocationButton 
                    for='waterbodies' 
                    style={styles.nearby}
                /> :
                <WaterbodiesListHorizontal 
                    data={data?.waterbodies}
                    navigateViewMore={navigateViewMore}
                    navigateToWaterbody={navigateToWaterbody}
                />
            }
        </View>
    )
}

export default NearbySection

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        paddingHorizontal: '6%'
    },
    nearby: {
        width: '90%'
    },
    error: { 
        width: '75%',
        marginTop: 48,
        fontWeight: '600',
        alignSelf: 'center',
        paddingHorizontal: '6%',
        textAlign: 'center'
    }
})