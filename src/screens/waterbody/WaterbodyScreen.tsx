import React, { useEffect, useState } from 'react'
import { Text, Title, FAB } from 'react-native-paper'
import { useAuth } from '../../store/auth/useAuth'
import FishIcon from '../../components/icons/FishIcon';
import BackButton from '../../components/buttons/BackButton';
import AddImageIcon from '../../components/icons/AddImageIcon';
import ShareButton from '../../components/buttons/ShareButton';
import { useImageStore } from '../../store/image/useImageStore';
import { useModalStore } from '../../store/modal/useModalStore';
import { ExploreStackScreenProps } from '../../types/navigation';
import RatingDisplay from '../../components/ratings/RatingDisplay';
import { useImagePicker } from '../../hooks/utils/useImagePicker';
import { StyleSheet, View, ScrollView, Image, Pressable } from 'react-native';
import AddLocationIcon from '../../components/icons/AddLocationIcon';
import SaveIconButton from '../../components/buttons/SaveIconButton';
import { useGetWaterbodyQuery } from '../../hooks/queries/useGetWaterbodyQuery';
import ReviewsSection from './sections/ReviewsSection';
import MapSection from './sections/MapSection';
import MediaSection from './sections/MediaSection';


const WaterbodyScreen = ({ navigation, route }: ExploreStackScreenProps<'WaterbodyScreen'>): JSX.Element => {

    const { params } = route;
    const [fabOpen, setFabOpen] = useState(false)
    const { data, loading, error } = useGetWaterbodyQuery(params.id)
    const { openImagePicker } = useImagePicker()
    const setImages = useImageStore(state => state.setImages)
    const showConfirmUpload = useModalStore(state => state.setConfirmUpload)
    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const showAuthModal = useModalStore(state => state.setAuth)
    const showReviewModal = useModalStore(state => state.setReview)


    const handleAddImage = async () => {
        const result = await openImagePicker()
        if(!result) return;
        setImages(result)
        showConfirmUpload(params.id, true)
    }

    const handleAddCatch = () => navigation.navigate('NewCatchScreen', { waterbody: params.id })
    const handleAddLocation = () => navigation.navigate('NewLocationScreen', { waterbody: params.id })
    const handleMediaScreen = () => navigation.navigate('MediaGridScreen', { 
        waterbody: params.id, 
        total: data?.waterbody.total_media, 
        title: data?.waterbody.name 
    })
    const handleStartReview = () => showReviewModal(params.id)
  
    return (
        <ScrollView style={styles.container}>
            <View>
                <Pressable onPress={handleMediaScreen}>
                    <Image source={{ uri: data?.waterbody.media[0]?.url}} style={styles.image}/>
                </Pressable>
                <BackButton style={styles.back}/>
                <ShareButton style={styles.share} waterbody={data?.waterbody.id}/>
                <SaveIconButton style={styles.save} waterbody={data?.waterbody.id}/>
                <FAB.Group
                    visible={true} open={fabOpen}
                    icon={fabOpen ? 'close' : 'plus'}
                    actions={[
                        { 
                            icon: ({ color }) => <AddImageIcon color={color}/>,
                            onPress: isAuthenticated ? handleAddImage : showAuthModal
                        },
                        {
                            icon: ({ color }) => <FishIcon color={color}/>,
                            onPress: isAuthenticated ? handleAddCatch : showAuthModal
                        },
                        {
                            icon: ({ color }) => <AddLocationIcon color={color}/>,
                            onPress: isAuthenticated ? handleAddLocation : showAuthModal
                        }
                    ]}
                    onStateChange={({ open }) => setFabOpen(open)}
                    onPress={() => setFabOpen(o => !o)}
                />
            </View>
            <View style={styles.header}>
                <View>
                    <Title style={styles.title}>{data?.waterbody.name}</Title>
                    <Text style={styles.location}>{
                        data?.waterbody.admin_one && data?.waterbody.admin_one.length > 0 ? 
                        data?.waterbody.admin_two && data?.waterbody.admin_two.length === 1 ?
                        `${data?.waterbody.admin_two[0]}, ${data?.waterbody.admin_one[0]}` :
                        data?.waterbody.admin_one.length === 1 ?
                        `${data?.waterbody.admin_one[0]}, ${data?.waterbody.country}` :
                        `${data?.waterbody.admin_one[0]} + ${data?.waterbody.admin_one.length - 1} more, ${data?.waterbody.ccode}` :    
                        data?.waterbody.subregion ?
                        `${data?.waterbody.subregion} ${data?.waterbody.country}` :
                        `${data?.waterbody.country}`
                    }</Text>
                    <RatingDisplay 
                        onPress={handleStartReview} style={{ marginTop: 16 }} 
                        numberOfRatings={data?.waterbody.total_reviews} 
                        rating={data?.waterbody.average_rating}
                    />
                </View>
            </View>
            <MapSection 
                navigation={navigation} 
                waterbody={params.id} 
                uri={data?.waterbody.media[0]?.url}
            />
            <MediaSection
                navigation={navigation} 
                waterbody={params.id} name={data?.waterbody.name}
                totalMedia={data?.waterbody.total_media}
            />
            <ReviewsSection 
                navigation={navigation} 
                waterbody={params.id} name={data?.waterbody.name}
                totalReviews={data?.waterbody.total_reviews}
                rating={data?.waterbody.average_rating}
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
    header: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontWeight: '600',
        fontSize: 24,
        paddingBottom: 2
    },
    back: {
        position: 'absolute',
        top: 36,
        left: 16
    },
    save: {
        position: 'absolute',
        top: 36,
        right: 68
    },
    share: {
        position: 'absolute',
        top: 36,
        right: 16,
    },
    image: {
        height: 320,
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    location: {
        fontWeight: '400',
        fontSize: 16
    }
})