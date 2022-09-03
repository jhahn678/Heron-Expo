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
    const data = useGetNearbyWaterbodiesQueryMock;
    const { loading, error } = useGetNearbyWaterbodiesQuery({ latitude, longitude })

    const navigateViewMore = (): void => {
        setSort('distance')
        navigation.navigate('SearchResultsScreen')
    }

    const navigateToWaterbody = (id: number): void => {
        navigation.navigate('WaterbodyScreen', { id })
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>What's nearby</Title>
            { hasCoordinates ? 
                data ? 

                    //data available
                    <WaterbodiesListHorizontal data={data.waterbodies}
                        navigateViewMore={navigateViewMore}
                        navigateToWaterbody={navigateToWaterbody}
                    /> 
                    
                    //loading state
                    : loading ? 
                        <ActivityIndicator 
                            style={{ marginTop: 64 }}
                            animating 
                            size='large'
                        />
                    
                    //Error state    
                    : <Text style={styles.error}>{error?.message}</Text> 
                
                    //Location not available
                    : <EnableLocationButton 
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
        height: 370,
        marginTop: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        paddingHorizontal: '6%'
    },
    nearby: {
        marginTop: 24, 
        flexGrow: 1,
        paddingHorizontal: '6%'
    },
    error: { 
        marginTop: 64 ,
        alignSelf: 'center',
        paddingHorizontal: '6%'
    }
})