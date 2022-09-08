import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    ScrollView, 
    Image 
} from 'react-native'
import { Text, Title, FAB } from 'react-native-paper'
import { useGetWaterbodyQuery } from '../../hooks/queries/useGetWaterbodyQuery';
import { ExploreStackScreenProps } from '../../types/navigation'
import FishIcon from '../../components/icons/FishIcon';
import AddImageIcon from '../../components/icons/AddImageIcon';
import AddLocationIcon from '../../components/icons/AddLocationIcon';
import BackButton from '../../components/buttons/BackButton';
import ShareButton from '../../components/buttons/ShareButton';
import SaveIconButton from '../../components/buttons/SaveIconButton';
import { useImagePicker } from '../../hooks/utils/useImagePicker';
import { useImageStore } from '../../store/image/useImageStore';
import { useModalStore } from '../../store/modal/useModalStore';
import { useAuth } from '../../store/auth/useAuth';


const WaterbodyScreen = ({ navigation, route }: ExploreStackScreenProps<'WaterbodyScreen'>): JSX.Element => {

    const { params } = route;
    const [fabOpen, setFabOpen] = useState(false)
    const { data, loading, error } = useGetWaterbodyQuery(params.id)

    const { openImagePicker } = useImagePicker()
    const setImages = useImageStore(state => state.setImages)
    const showConfirmUpload = useModalStore(state => state.setConfirmUpload)
    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const showAuthModal = useModalStore(state => state.setAuth)
    

    const handleAddImage = async () => {
        const result = await openImagePicker()
        if(result) {
            setImages(result)
            showConfirmUpload(params.id, true)
        }
    }

    const handleAddCatch = () => {
        navigation.navigate('NewCatchScreen', { waterbody: params.id })
    }
    const handleAddLocation = () => navigation.navigate('NewLocationScreen', { waterbody: params.id })
  
    return (
        <ScrollView style={styles.container}>
            <View>
                <Image source={{ uri: data?.waterbody.media[0]?.url}} style={styles.image}/>
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
                </View>
            </View>
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
        padding: 24,
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