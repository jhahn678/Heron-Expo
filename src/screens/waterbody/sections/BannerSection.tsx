import React, { useState } from "react";
import { FAB } from 'react-native-paper'
import { Pressable, StyleSheet, Image, View } from "react-native";
import SaveIconButton from "../../../components/buttons/SaveIconButton";
import ShareButton from "../../../components/buttons/ShareButton";
import BackButton from "../../../components/buttons/BackButton";
import AddImageIcon from "../../../components/icons/AddImageIcon";
import FishIcon from "../../../components/icons/FishIcon";
import AddLocationIcon from "../../../components/icons/AddLocationIcon";
import { useAuth } from "../../../store/auth/useAuth";
import { useModalStore } from "../../../store/modal/useModalStore";
import { ExploreStackScreenProps, MediaSource } from "../../../types/navigation";
import { useImagePicker } from "../../../hooks/utils/useImagePicker";
import { useImageStore } from "../../../store/image/useImageStore";
import { ShareType } from "../../../hooks/utils/useShareContent";
import { GetWaterbodyRes } from "../../../hooks/queries/useGetWaterbody";

interface Props {
    navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation'] 
    id: number
    name: string | undefined
    totalMedia: number | undefined
    isSaved: boolean | undefined
    media: GetWaterbodyRes['waterbody']['media'] | undefined
}

const BannerSection = ({ id, navigation, name, media, totalMedia, isSaved }: Props) => {

    const { openImagePicker } = useImagePicker()
    const setImages = useImageStore(state => state.setImages)
    const showConfirmUpload = useModalStore(state => state.setConfirmUpload)
    const isAuthenticated = useAuth(store => store.isAuthenticated)
    const showAuthModal = useModalStore(store => () => store.setAuth(true))
    const [fabOpen, setFabOpen] = useState(false);

    const handleAddImage = async () => {
        const result = await openImagePicker()
        if(!result) return;
        setImages(result)
        showConfirmUpload(id, true)
    }

    const handleAddCatch = () => navigation.navigate('NewCatchScreen', { waterbody: id })

    const handleAddLocation = () => navigation.navigate('NewLocationScreen', { waterbody: id })

    const handleMediaScreen = () => navigation.navigate('MediaGridScreen', { 
        source: MediaSource.Waterbody, id, total: totalMedia, title: name
    })

    return (
        <View>
            <Pressable onPress={handleMediaScreen}>
                <Image 
                    source={{ 
                        uri: 
                            (media && media.length > 0)
                            ? media[0].url 
                            : undefined 
                    }} 
                    style={styles.image}
                />
            </Pressable>
            <BackButton style={styles.back}/>
            <ShareButton style={styles.share} shareType={ShareType.Waterbody} id={id}/>
            <SaveIconButton style={styles.save} waterbody={id} saved={isSaved}/>
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
    );
};

export default BannerSection;

const styles = StyleSheet.create({
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
});
