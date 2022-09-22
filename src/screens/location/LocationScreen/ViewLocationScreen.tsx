import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../../types/navigation'
import HeadingSection from './sections/HeadingSection'
import BannerSection from './sections/BannerSection'
import { useGetLocation } from '../../../hooks/queries/useGetLocation'
import ActionBar from './sections/ActionBar'
import Description from './sections/Description'
import MapSection from './sections/MapSection'
import CatchesNearby from './sections/CatchesNearby'

const ViewLocationScreen = ({ navigation, route }: RootStackScreenProps<'ViewLocationScreen'>) => {
    
    const { params: { id } } = route;
    const { data, loading, error } = useGetLocation({ id })

    return (
        <ScrollView style={styles.container}>
            <BannerSection 
                id={id}
                navigation={navigation} 
                media={data?.location.media} 
            />
            <HeadingSection 
                data={data?.location}
                navigation={navigation}
            />
            <ActionBar 
                id={id}
                navigation={navigation} 
                isSaved={data?.location.is_saved}
                isFavorited={data?.location.is_favorited}
                totalFavorites={data?.location.total_favorites}
            />
            <Description description={data?.location.description}/>
            <MapSection 
                id={id} 
                navigation={navigation} 
                uri={data?.location.media[0]?.url}
            />
            <CatchesNearby geom={data?.location.geom}/>
        </ScrollView>
    )
}

export default ViewLocationScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
})