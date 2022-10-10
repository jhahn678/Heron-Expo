import { ExploreStackScreenProps } from '../../types/navigation';
import { StyleSheet, ScrollView, View } from 'react-native';
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
import { useEffect } from 'react';
import { useCreateWaterbodyReview } from '../../hooks/mutations/useCreateWaterbodyReview';
import { useModalStore } from '../../store/modal/useModalStore';
import { ErrorType } from '../../utils/mapErrorTypeToDetails';
import { ApolloError } from '@apollo/client';
import { useUploadImages } from '../../hooks/mutations/useUploadImages';
import { useAddWaterbodyMediaMutation as useAddWaterbodyMedia } from '../../hooks/mutations/useAddWaterbodyMedia';

const handleError = (error: ApolloError) => error.message
    .includes('duplicate key value') ? ErrorType.ReviewDuplicate : ErrorType.Default

const WaterbodyScreen = ({ navigation, route }: ExploreStackScreenProps<'WaterbodyScreen'>): JSX.Element => {

    const { params: { id } } = route;

    const { data, loading, error } = useGetWaterbody(id)

    const setLoading = useModalStore(store => store.setLoading)
    const setShowSuccess = useModalStore(store => store.setSuccess)
    const setShowErrorModal = useModalStore(store => store.setError)
    const backdrop = useReviewModalStore(store => Boolean(
        store.ratingVisible || store.bodyVisible || store.addImagesVisible
    ))

    const images = useImageStore(store => store.images)
    const resetReview = useReviewModalStore(store => store.reset)
    const clearImages = useImageStore(store => store.clearImages)
    const handleResetReview = () => { resetReview(); clearImages() }

    const uploadImages = useUploadImages()
    const [createReview, result] = useCreateWaterbodyReview()
    const [saveImages] = useAddWaterbodyMedia()

    const getValues = useReviewModalStore(store => store.getValues)

    const handleSubmit = async () => {
        const input = getValues();
        if(!input) return;
        setLoading(true)
        await createReview({ 
            variables: { input },
            onCompleted: () => { handleResetReview(); setShowSuccess(true, 'REVIEW') },
            onError: (err) => { setShowErrorModal(true, handleError(err)); handleResetReview() }
        })
        if(images.length > 0){
            const pending = images.map(({ uri, id }) => ({ uri, id }))
            const res = await uploadImages(pending)
            if(res){
                await saveImages({ variables: { id, media: res.uploads } })
                if(res.uploads.length !== pending.length) setShowErrorModal(true, ErrorType.UploadPartial)
            }
        } 
        setLoading(false)
        handleResetReview()
    }

    useEffect(() => {},[])

    useEffect(() => navigation.addListener('blur', handleResetReview), [])
  
    return (
         <View style={{ height: '100%' }}>
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
                    navigation={navigation}
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
            <ReviewRatingBottomSheet/>
            <ReviewBodyBottomSheet/>
            <ReviewImagesBottomSheet onSubmit={handleSubmit}/>
            { backdrop && <Backdrop onPress={handleResetReview}/>}
        </View>
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