import { ExploreStackScreenProps } from '../../types/navigation';
import { StyleSheet, ScrollView, View, RefreshControl, Dimensions, Platform } from 'react-native';
import { useGetWaterbody } from '../../hooks/queries/useGetWaterbody';
import ReviewsSection from './sections/ReviewsSection';
import MapSection from './sections/MapSection';
import MediaSection from './sections/MediaSection';
import HeaderSection from './sections/HeaderSection';
import LocationsSection from './sections/LocationsSection';
import CatchesSection from './sections/CatchesSection';
import BannerSection from './sections/BannerSection';
import { useEffect, useState } from 'react';
import { useBottomSheetStore } from '../../store/modal/useBottomSheetStore';
import { useReviewModalStore } from '../../store/mutations/useReviewModalStore';
const { height, width } = Dimensions.get('window')

const WaterbodyScreen = ({ navigation, route }: ExploreStackScreenProps<'WaterbodyScreen'>): JSX.Element => {

    const { params: { id } } = route;
    const { data, refetch } = useGetWaterbody(id)

    const handleResetReview = useReviewModalStore(store => store.reset)
    const handleResetBottomSheet = useBottomSheetStore(store => store.reset)
    const handleResetModals = () => { handleResetReview(); handleResetBottomSheet() };
    useEffect(() => navigation.addListener('beforeRemove', handleResetModals),[])

    const [refreshing, setRefreshing] = useState(false)
    const setUploadVisible = useBottomSheetStore(store => store.setWaterbodyUpload)
    const handleShowUploadModal = () => setUploadVisible(id)

    const handleRefetch = () => {
        setRefreshing(true);
        refetch().then(() => setRefreshing(false))
    }
  
    return (
         <View>
            <ScrollView 
                style={styles.container} 
                contentContainerStyle={{ 
                    paddingBottom: Platform.OS === 'ios' ? 72 : 0
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={handleRefetch}/>
                }
            >
                <BannerSection 
                    id={id} 
                    navigation={navigation} 
                    name={data?.waterbody.name}
                    isSaved={data?.waterbody.is_saved}
                    media={data?.waterbody.media.slice(0,6)}
                    totalMedia={data?.waterbody.total_media}/>
                <HeaderSection 
                    id={id}
                    data={data?.waterbody}
                    navigation={navigation}
                    refetch={handleRefetch}/>
                <CatchesSection
                    waterbody={id}
                    navigation={navigation}
                    name={data?.waterbody?.name}
                    totalCatches={data?.waterbody.total_catches}
                    totalSpecies={data?.waterbody.total_species}/>
                <LocationsSection 
                    waterbody={id}
                    navigation={navigation} 
                    name={data?.waterbody.name} 
                    totalLocations={data?.waterbody.total_locations}/>
                <MapSection 
                    waterbody={id} 
                    navigation={navigation} 
                    uri={data?.waterbody.media[0]?.url}/>
                <MediaSection
                    waterbody={id} 
                    navigation={navigation} 
                    name={data?.waterbody.name}
                    onShowUploadModal={handleShowUploadModal}
                    totalMedia={data?.waterbody.total_media}/>
                <ReviewsSection 
                    waterbody={id} 
                    navigation={navigation} 
                    name={data?.waterbody.name}
                    totalReviews={data?.waterbody.total_reviews}
                    averageRating={data?.waterbody.average_rating}
                    onRefetch={handleRefetch}/>
            </ScrollView>
        </View>
    )
}

export default WaterbodyScreen

const styles = StyleSheet.create({
    container: {
        width,
        minHeight: height,
    },
    location: {
        fontWeight: '400',
        fontSize: 16
    }
})