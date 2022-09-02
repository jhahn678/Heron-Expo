import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Text, ActivityIndicator } from 'react-native-paper'
import { useLocationStore } from '../../../store/location/useLocationStore'
import { ExploreStackScreenProps } from '../../../types/navigation'
import EnableLocationButton from '../../buttons/EnableLocationButton'
import WaterbodiesListHorizontal from '../../lists/WaterbodiesListHorizontal/WaterbodiesListHorizontal'
import { useGetNearbyWaterbodiesQuery } from '../../../hooks/queries/useGetNearbyWaterbodiesQuery'
import { useGetNearbyWaterbodiesQueryMock } from '../../../../__mocks'

interface Props {
    navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const NearbySection = ({ navigation }: Props) => {

    const { hasCoordinates, latitude, longitude } = useLocationStore()
    const data = useGetNearbyWaterbodiesQueryMock;
    const { loading, error } = useGetNearbyWaterbodiesQuery({ latitude, longitude })

    const navigateViewMore = () => navigation.navigate('SearchResultsScreen')

    return (
        <View style={styles.container}>
            <Title style={styles.title}>What's nearby</Title>
            { hasCoordinates ? 
                data ? 

                    //data available
                    <WaterbodiesListHorizontal 
                        navigation={navigation}
                        navigateViewMore={navigateViewMore}
                        data={data}
                    /> 
                    
                    //loading state
                    : loading ? 
                        <ActivityIndicator 
                            style={{ marginTop: 64 }}
                            animating 
                            size='large'
                        />
                    
                    //Error state    
                    : <Text style={styles.error}>There was an error</Text> 
                
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
        height: 320,
        marginTop: 24
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