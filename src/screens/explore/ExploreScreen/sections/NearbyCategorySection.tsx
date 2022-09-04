import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Text, ActivityIndicator } from 'react-native-paper'
import { useLocationStore } from '../../../../store/location/useLocationStore'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import EnableLocationButton from '../../../../components/buttons/EnableLocationButton'
import WaterbodiesListHorizontal from '../../../../components/lists/WaterbodiesListHorizontal/WaterbodiesListHorizontal'
import { useSearchParamStore } from '../../../../store/search/useSearchParamStore'
import { WaterbodyClassification } from '../../../../types/Waterbody'
import { useGetNearbyWaterbodiesQuery } from '../../../../hooks/queries/useGetNearbyWaterbodiesQuery'
import { classificationToCategory } from '../../../../utils/conversions/classificationToCategory'
import { useGetNearbyWaterbodiesQueryMock } from '../../../../../__mocks'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
    classification: WaterbodyClassification
}

const NearbyCategorySection = ({ navigation, classification }: Props) => {

    const { classificationsAppend } = useSearchParamStore()
    const { hasCoordinates, latitude, longitude } = useLocationStore()
    const {
        data,
        loading,
        error
    } = useGetNearbyWaterbodiesQuery({
        latitude,
        longitude,
        classification,
        sort: 'rank'
    })

    const navigateViewMore = (): void => {
        classificationsAppend(classification)
        navigation.navigate('SearchResultsScreen')
    }

    const navigateToWaterbody = (id: number): void => {
        navigation.navigate('WaterbodyScreen', { id })
    }

    return (
        <View style={[styles.container, { height: (!hasCoordinates || error) ? 130 : 370}]}>
            <Title style={styles.title}>Nearby {classificationToCategory(classification)}</Title>
            { hasCoordinates ? 
                data ? 
                    //data available
                    <WaterbodiesListHorizontal 
                        data={data.waterbodies}
                        navigateViewMore={navigateViewMore}
                        navigateToWaterbody={navigateToWaterbody}
                    /> 
                    
                    //loading state
                    : loading ? 
                        <ActivityIndicator 
                            style={{ marginTop: 36 }}
                            animating 
                            size='large'
                        />
                    
                    //Error state    
                    : error &&
                        <Text style={styles.error}>There was an error</Text> 
                
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

export default NearbyCategorySection

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
        marginTop: 24, 
        flexGrow: 1,
        paddingHorizontal: '6%'
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