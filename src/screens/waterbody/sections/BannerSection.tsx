import React, { useState } from "react";
import { FAB } from 'react-native-paper'
import { Pressable, StyleSheet, Image, View, FlatList, Dimensions } from "react-native";
import SaveIconButton from "../../../components/buttons/SaveIconButton";
import ShareButton from "../../../components/buttons/ShareButton";
import BackButton from "../../../components/buttons/BackButton";
import AddImageIcon from "../../../components/icons/AddImageIcon";
import FishIcon from "../../../components/icons/FishIcon";
import AddLocationIcon from "../../../components/icons/AddLocationIcon";
import { useAuth } from "../../../store/auth/useAuth";
import { useModalStore } from "../../../store/modal/useModalStore";
import { ExploreStackScreenProps, MediaSource } from "../../../types/navigation";
import { ShareType } from "../../../hooks/utils/useShareContent";
import { GetWaterbodyRes } from "../../../hooks/queries/useGetWaterbody";
import { useImagePaginationIndicator } from "../../../hooks/utils/useImagePaginationIndicator";
import ImagePagination from "../../../components/lists/shared/ImagePagination";
import { useBottomSheetStore } from "../../../store/modal/useBottomSheetStore";
const DEFAULT_IMAGE = Image.resolveAssetSource(require('../../../../assets/default-background.png')).uri
const { width } = Dimensions.get('screen')

interface Props {
    navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation'] 
    id: number
    name: string | undefined
    totalMedia: number | undefined
    isSaved: boolean | undefined
    media: GetWaterbodyRes['waterbody']['media'] | undefined
}

const BannerSection = ({ id, navigation, name, media=[], totalMedia, isSaved }: Props) => {

    const isAuthenticated = useAuth(store => store.isAuthenticated)
    const setAuthVisible = useModalStore(store => store.setAuth)
    const setUpload = useBottomSheetStore(store => store.setWaterbodyUpload)
    const showAuthModal = () => setAuthVisible(true)
    const [fabOpen, setFabOpen] = useState(false);
    const { currentIndex, handleViewableItemsChanged } = useImagePaginationIndicator()

    const handleAddImage = () => setUpload(id)

    const handleAddCatch = () => navigation.navigate('NewCatchScreen', { waterbody: id })

    const handleAddLocation = () => navigation.navigate('NewLocationScreen', { waterbody: id })

    const navigateMediaScreen = () => navigation.navigate('MediaGridScreen', { 
        source: MediaSource.Waterbody, id, total: totalMedia, title: name
    })


    return (
        <View style={styles.container}>
            { media.length ?
                <FlatList
                    data={media}
                    horizontal={true}
                    pagingEnabled={true}
                    onViewableItemsChanged={handleViewableItemsChanged}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable onPress={navigateMediaScreen}>
                            <Image source={{ uri: item.url }} resizeMode={'cover'} style={styles.image}/>
                        </Pressable>
                    )}
                /> :
                <Image source={{ uri: DEFAULT_IMAGE }} resizeMode={'cover'} style={styles.image}/>
            }
            { media.length > 1 &&  <ImagePagination currentIndex={currentIndex} media={media}/> }
            <BackButton style={styles.back}/>
            <ShareButton style={styles.share} shareType={ShareType.Waterbody} id={id}/>
            <SaveIconButton style={styles.save} waterbody={id} saved={isSaved}/>
            <FAB.Group
                visible={true} open={fabOpen}
                icon={fabOpen ? 'close' : 'plus'}
                onStateChange={({ open }) => setFabOpen(open)}
                onPress={() => setFabOpen(o => !o)}
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
            />
        </View>
    );
};

export default BannerSection;

const styles = StyleSheet.create({
    container: {
        width,
        height: 350,
    },
    back: {
        position: 'absolute',
        top: 36,
        left: 16,
        zIndex: 100
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
        width,
        height: 350,
        backgroundColor: '#d9d9d9'
    },
});
