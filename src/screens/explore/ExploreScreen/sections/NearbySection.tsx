import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Text, ActivityIndicator } from 'react-native-paper'
import { useLocationStore } from '../../../../store/location/useLocationStore'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import EnableLocationButton from '../../../../components/buttons/EnableLocationButton'
import WaterbodiesListHorizontal from '../../../../components/lists/WaterbodiesListHorizontal/WaterbodiesListHorizontal'
import { useGetNearbyWaterbodiesQuery } from '../../../../hooks/queries/useGetNearbyWaterbodiesQuery'
import { useGetNearbyWaterbodiesQueryMock } from '../../../../../__mocks'
import { useSearchParamStore } from '../../../../store/search/useSearchParamStore'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const NearbySection = ({ navigation }: Props) => {

    const { setSort } = useSearchParamStore()
    const { hasCoordinates, latitude, longitude } = useLocationStore()
    
    const { data, loading, error } = useGetNearbyWaterbodiesQuery({ latitude, longitude })

    const navigateViewMore = (): void => {
        setSort('distance')
        navigation.navigate('SearchResultsScreen')
    }

    const navigateToWaterbody = (id: number): void => {
        navigation.navigate('WaterbodyScreen', { id })
    }

    return (
        <View style={[styles.container, { height: (!hasCoordinates || error) ? 150 : 370}]}>
            <Title style={styles.title}>What's nearby</Title>
            { !hasCoordinates ? 
                data ? 
                    //data available
                    <WaterbodiesListHorizontal data={data.waterbodies}
                        navigateViewMore={navigateViewMore}
                        navigateToWaterbody={navigateToWaterbody}
                    /> 
                    
                    //loading state
                    : loading ? 
                        <ActivityIndicator 
                            style={{ marginTop: 128 }}
                            animating 
                            size='large'
                        />
                    
                    //Error state    
                    : error &&
                        <Text style={styles.error}>Could not load nearby waterbodies</Text> 
                
                    //Location not available
                    : 
                        <EnableLocationButton 
                            for='waterbodies' 
                            style={styles.nearby}
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