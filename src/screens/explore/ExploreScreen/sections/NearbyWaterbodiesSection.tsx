import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'
import { useLocationStore } from '../../../../store/location/useLocationStore'
import { ExploreStackScreenProps } from '../../../../types/navigation'
import EnableLocationButton from '../../../../components/buttons/EnableLocationButton'
import WaterbodiesListHorizontal from '../../../../components/lists/WaterbodiesListHorizontal/WaterbodiesListHorizontal'
import { useGetNearbyWaterbodies } from '../../../../hooks/queries/useGetNearbyWaterbodies'
import { useSearchParamStore } from '../../../../store/search/useSearchParamStore'
import ScrollViewListLoader from '../../../../components/loaders/ScrollViewListLoader'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const NearbyWaterbodiesSection = ({ navigation }: Props) => {

    const { setSort } = useSearchParamStore()
    const { latitude, longitude, hasPermission } = useLocationStore()
    
    const { data } = useGetNearbyWaterbodies({ latitude, longitude })

    const navigateViewMore = (): void => {
        setSort('distance')
        navigation.navigate('SearchResultsScreen', { title: 'Results near you'})
    }

    const navigateToWaterbody = (id: number): void => {
        navigation.navigate('WaterbodyScreen', { id })
    }

    return (
        <View style={[styles.container, { height: (hasPermission === false) ? 150 : 400}]}>
            <Title style={styles.title}>What's nearby</Title>
            { 
                hasPermission === false ? 
                    <EnableLocationButton 
                        for='waterbodies' 
                        style={styles.nearby}
                    /> 
                : data ?
                    <WaterbodiesListHorizontal 
                        data={data?.waterbodies}
                        navigateViewMore={navigateViewMore}
                        navigateToWaterbody={navigateToWaterbody}
                    />
                :
                    <ScrollViewListLoader 
                        itemSize={{ height: 320, width: 300 }}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
                    />
            }
        </View>
    )
}

export default NearbyWaterbodiesSection;

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
        width: '90%'
    },
    error: { 
        width: '75%',
        marginTop: 48,
        fontWeight: '600',
        alignSelf: 'center',
        paddingHorizontal: 24,
        textAlign: 'center'
    }
})