import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Text } from 'react-native-paper'
import { useLocationStore } from '../../../../store/location/useLocationStore'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import EnableLocationButton from '../../../../components/buttons/EnableLocationButton'
import WaterbodiesListHorizontal from '../../../../components/lists/WaterbodiesListHorizontal/WaterbodiesListHorizontal'
import { useSearchParamStore } from '../../../../store/search/useSearchParamStore'
import { WaterbodyClassification } from '../../../../types/Waterbody'
import { useGetNearbyWaterbodies } from '../../../../hooks/queries/useGetNearbyWaterbodies'
import { classificationToCategory } from '../../../../utils/conversions/classificationToCategory'
import ScrollViewListLoader from '../../../../components/loaders/ScrollViewListLoader'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
    classification: WaterbodyClassification
}

const NearbyCategorySection = ({ navigation, classification }: Props) => {

    const { classificationsAppend } = useSearchParamStore()
    const { hasCoordinates, latitude, longitude } = useLocationStore()

    const { data, loading, error } = useGetNearbyWaterbodies({
        latitude,
        longitude,
        classification,
        sort: 'rank'
    })

    const navigateViewMore = (): void => {
        classificationsAppend(classification)
        navigation.navigate('SearchResultsScreen',{
            title: `${classificationToCategory(classification)} near you`
        })
    }

    const navigateToWaterbody = (id: number): void => {
        navigation.navigate('WaterbodyScreen', { id })
    }

    return (
        <View style={[styles.container, { height: (!hasCoordinates || error) ? 130 : 400}]}>
            <Title style={styles.title}>Local {classificationToCategory(classification)}</Title>
            { hasCoordinates ? 
                data ? 
                    <WaterbodiesListHorizontal 
                        data={data.waterbodies}
                        navigateViewMore={navigateViewMore}
                        navigateToWaterbody={navigateToWaterbody}
                    /> 
                    : loading ? 
                        <ScrollViewListLoader
                            itemSize={{ height: 320, width: 300 }}
                            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
                        />  
                    : error &&
                        <Text style={styles.error}>There was an error</Text> 
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
        paddingHorizontal: 24
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