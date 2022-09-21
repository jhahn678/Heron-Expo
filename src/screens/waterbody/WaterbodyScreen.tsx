import { ExploreStackScreenProps } from '../../types/navigation';
import { StyleSheet, ScrollView } from 'react-native';
import { useGetWaterbody } from '../../hooks/queries/useGetWaterbody';
import ReviewsSection from './sections/ReviewsSection';
import MapSection from './sections/MapSection';
import MediaSection from './sections/MediaSection';
import HeaderSection from './sections/HeaderSection';
import LocationsSection from './sections/LocationsSection';
import CatchesSection from './sections/CatchesSection';
import BannerSection from './sections/BannerSection';


const WaterbodyScreen = ({ navigation, route }: ExploreStackScreenProps<'WaterbodyScreen'>): JSX.Element => {

    const { params: { id } } = route;
    const { data, loading, error } = useGetWaterbody(id)
  
    return (
        <ScrollView style={styles.container}>
            <BannerSection 
                id={id} 
                navigation={navigation} 
                name={data?.waterbody.name}
                media={data?.waterbody.media}
                isSaved={data?.waterbody.is_saved}
                totalMedia={data?.waterbody.total_media} 
            />
            <HeaderSection 
                id={id}
                data={data?.waterbody}
            />
            <CatchesSection
                navigation={navigation}
                waterbody={id}
                name={data?.waterbody.name}
                totalCatches={data?.waterbody.total_catches}
                totalSpecies={data?.waterbody.total_species}
            />
            <LocationsSection 
                name={data?.waterbody.name} 
                navigation={navigation} 
                totalLocations={data?.waterbody.total_locations}
                waterbody={id}
            />
            <MapSection 
                navigation={navigation} 
                waterbody={id} 
                uri={data?.waterbody.media[0]?.url}
            />
            <MediaSection
                navigation={navigation} 
                waterbody={id} name={data?.waterbody.name}
                totalMedia={data?.waterbody.total_media}
            />
            <ReviewsSection 
                navigation={navigation} 
                waterbody={id} name={data?.waterbody.name}
                totalReviews={data?.waterbody.total_reviews}
                averageRating={data?.waterbody.average_rating}
            />
        </ScrollView>
    )
}

export default WaterbodyScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%',
    },
    location: {
        fontWeight: '400',
        fontSize: 16
    }
})