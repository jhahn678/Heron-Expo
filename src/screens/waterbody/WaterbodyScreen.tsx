import { ExploreStackScreenProps } from '../../types/navigation';
import { StyleSheet, ScrollView, View, RefreshControl, Dimensions } from 'react-native';
import { useGetWaterbody } from '../../hooks/queries/useGetWaterbody';
import ReviewsSection from './sections/ReviewsSection';
import MapSection from './sections/MapSection';
import MediaSection from './sections/MediaSection';
import HeaderSection from './sections/HeaderSection';
import LocationsSection from './sections/LocationsSection';
import CatchesSection from './sections/CatchesSection';
import BannerSection from './sections/BannerSection';
import ReviewRatingBottomSheet from '../../components/modals/review/ReviewRatingBottomSheet';
import ReviewBodyBottomSheet from '../../components/modals/review/ReviewBodyBottomSheet';
import ReviewImagesBottomSheet from '../../components/modals/review/ReviewImagesBottomSheet';
import Backdrop from '../../components/modals/Backdrop';
import { useReviewModalStore } from '../../store/mutations/useReviewModalStore';
import { useImageStore } from '../../store/image/useImageStore';
import React, { useEffect, useState } from 'react';
import { useCreateWaterbodyReview } from '../../hooks/mutations/useCreateWaterbodyReview';
import { useModalStore } from '../../store/modal/useModalStore';
import { ErrorType } from '../../utils/conversions/mapErrorTypeToDetails';
import { ApolloError } from '@apollo/client';
import { useUploadImages } from '../../hooks/mutations/useUploadImages';
import { useAddWaterbodyMediaMutation as useAddWaterbodyMedia } from '../../hooks/mutations/useAddWaterbodyMedia';
import WaterbodyMediaUploadModal from '../../components/modals/WaterbodyMediaUploadBottomSheet';
import SpeciesBottomSheet from '../../components/modals/SpeciesBottomSheet';
import { useBottomSheetStore } from '../../store/modal/useBottomSheetStore';
const { height, width } = Dimensions.get('window')

const handleError = (error: ApolloError) => error.message
    .includes('waterbody_review_one_per_user') ? ErrorType.ReviewDuplicate : ErrorType.Default

const WaterbodyScreen = ({ navigation, route }: ExploreStackScreenProps<'WaterbodyScreen'>): JSX.Element => {

    const { params: { id } } = route;
    const { data, refetch } = useGetWaterbody(id)

    const [refreshing, setRefreshing] = useState(false)
    const uploadVisible = useBottomSheetStore(store => store.waterbodyUpload)
    const setUploadVisible = useBottomSheetStore(store => store.setWaterbodyUpload)
    const setLoading = useModalStore(store => store.setLoading)
    const setShowSuccess = useModalStore(store => store.setSuccess)
    const setShowErrorModal = useModalStore(store => store.setError)
    const backdrop = useReviewModalStore(store => Boolean(
        store.ratingVisible || store.bodyVisible || store.addImagesVisible
    ))
    const reauthenticate = useModalStore(store => store.reauthenticate)
    const images = useImageStore(store => store.images)
    const resetReview = useReviewModalStore(store => store.reset)
    const clearImages = useImageStore(store => store.clearImages)
    const getValues = useReviewModalStore(store => store.getValues)
    const handleResetReview = () => { resetReview(); clearImages() }
    useEffect(() => navigation.addListener('blur', handleResetReview),[])

    const { uploadToS3 } = useUploadImages()
    const [createReview] = useCreateWaterbodyReview()
    const [saveImages] = useAddWaterbodyMedia(id)

    const handleRefetch = () => {
        setRefreshing(true);
        refetch().then(() => setRefreshing(false))
    }

    const handleSubmit = async () => {
        const input = getValues();
        if(!input) return; 
        setLoading(true);
        if(images.length > 0){
            const pending = images.map(({ uri, id }) => ({ uri, id }))
            const uploads = await uploadToS3(pending);
            if(uploads.length){
                if(uploads.length !== pending.length){
                    setShowErrorModal(true, ErrorType.UploadPartial)
                }
                await saveImages({ variables: { id, media: uploads } })
            }else{
                if(reauthenticate) return;
                setShowErrorModal(true, ErrorType.Upload)
            }
        } 
        await createReview({ 
            variables: { input },
            onCompleted: () => { handleResetReview(); setShowSuccess(true, 'REVIEW'); refetch() },
            onError: (err) => { setShowErrorModal(true, handleError(err)); handleResetReview() }
        })
        setLoading(false)
    }
  
    return (
         <View style={{ height }}>
            <ScrollView 
                style={styles.container} 
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={handleRefetch}
                    />
                }
            >
                <BannerSection 
                    id={id} 
                    navigation={navigation} 
                    name={data?.waterbody.name}
                    isSaved={data?.waterbody.is_saved}
                    media={data?.waterbody.media.slice(0,6)}
                    totalMedia={data?.waterbody.total_media} 
                />
                <HeaderSection 
                    id={id}
                    data={data?.waterbody}
                    navigation={navigation}
                />
                <CatchesSection
                    waterbody={id}
                    navigation={navigation}
                    name={data?.waterbody?.name}
                    totalCatches={data?.waterbody.total_catches}
                    totalSpecies={data?.waterbody.total_species}
                />
                <LocationsSection 
                    waterbody={id}
                    navigation={navigation} 
                    name={data?.waterbody.name} 
                    totalLocations={data?.waterbody.total_locations}
                />
                <MapSection 
                    waterbody={id} 
                    navigation={navigation} 
                    uri={data?.waterbody.media[0]?.url}
                />
                <MediaSection
                    waterbody={id} 
                    navigation={navigation} 
                    name={data?.waterbody.name}
                    totalMedia={data?.waterbody.total_media}
                />
                <ReviewsSection 
                    waterbody={id} 
                    navigation={navigation} 
                    name={data?.waterbody.name}
                    totalReviews={data?.waterbody.total_reviews}
                    averageRating={data?.waterbody.average_rating}
                />
            </ScrollView>
            <SpeciesBottomSheet/>
            <ReviewRatingBottomSheet/>
            <ReviewBodyBottomSheet/>
            <ReviewImagesBottomSheet onSubmit={handleSubmit}/>
            <WaterbodyMediaUploadModal visible={uploadVisible} setVisible={setUploadVisible}/>
            { backdrop && <Backdrop onPress={handleResetReview}/>}
        </View>
    )
}

export default WaterbodyScreen

const styles = StyleSheet.create({
    container: {
        width,
        minHeight: height
    },
    location: {
        fontWeight: '400',
        fontSize: 16
    }
})