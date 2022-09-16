import React, { useEffect, useRef, useState } from 'react'
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
import { useGetWaterbodyQuery } from '../../hooks/queries/useGetWaterbody';
import ReviewsSection from './sections/ReviewsSection';
import MapSection from './sections/MapSection';
import MediaSection from './sections/MediaSection';
import HeaderSection from './sections/HeaderSection';
import LocationsSection from './sections/LocationsSection';
import CatchesSection from './sections/CatchesSection';
import { useGetWaterbodyMock } from '../../../__mocks';


const WaterbodyScreen = ({ navigation, route }: ExploreStackScreenProps<'WaterbodyScreen'>): JSX.Element => {

    const { params } = route;
    const [fabOpen, setFabOpen] = useState(false)
    // const { data, loading, error } = useGetWaterbodyQuery(params.id)
    const { data } = useGetWaterbodyMock({ loading: false, error: false })
    const { openImagePicker } = useImagePicker()
    const setImages = useImageStore(state => state.setImages)
    const showConfirmUpload = useModalStore(state => state.setConfirmUpload)
    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const showAuthModal = useModalStore(state => state.setAuth)

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
            <HeaderSection 
                id={params.id}
                data={data?.waterbody}
            />
            <CatchesSection
                navigation={navigation}
                waterbody={params.id}
                name={data?.waterbody.name}
                totalCatches={data?.waterbody.total_catches}
                totalSpecies={data?.waterbody.total_species}
            />
            <LocationsSection 
                name={data?.waterbody.name} 
                navigation={navigation} 
                totalLocations={data?.waterbody.total_locations}
                waterbody={params.id}
            />
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
        backgroundColor: 'rgba(0,0,0,.1)'
    },
    location: {
        fontWeight: '400',
        fontSize: 16
    }
})