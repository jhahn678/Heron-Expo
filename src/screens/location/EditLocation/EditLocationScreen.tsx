import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../../types/navigation'
import { useImageStore } from '../../../store/image/useImageStore'
import { Button, Text } from 'react-native-paper'
import { UploadResult, useUploadImages } from '../../../hooks/mutations/useUploadImages'
import LoadingBackdrop from '../../../components/loaders/LoadingBackdrop'
import { useModalStore } from '../../../store/modal/useModalStore'
import { ErrorType } from '../../../utils/conversions/mapErrorTypeToDetails'
import EditImageInput from '../../../components/inputs/EditImageInput'
import { useEditLocationQuery } from '../../../hooks/queries/useEditLocationQuery'
import { useEditLocationStore } from '../../../store/mutations/useEditLocationStore'
import { useEditLocation } from '../../../hooks/mutations/useEditLocation'
import HeaderSection from './sections/HeaderSection'
import TitleInput from './sections/TitleInput'
import DescriptionInput from './sections/DescriptionInput'
import PrivacyInput from './sections/PrivacyInput'
import SelectPrivacyBottomSheet from './sections/SelectPrivacyBottomSheet'
import LocationInput from './sections/LocationInput'
import { waterbodyLocationLabel } from '../../../utils/conversions/waterbodyLocationToLabel'
import { theme } from '../../../config/theme'


const EditLocationScreen = ({ navigation, route }: RootStackScreenProps<'EditLocationScreen'>) => {

    const { params: { id } } = route;
    
    const { data, loading: queryLoading } = useEditLocationQuery(id)
  
    const editLocation = useEditLocationStore(store => ({
        title: store.title,
        point: store.point,
        polygon: store.polygon,
        privacy: store.privacy,
        description: store.description,
    }))

    const deleteMedia = useEditLocationStore(store => store.deleteMedia)
    const mapSnapshot = useEditLocationStore(store => store.mapSnapshot)
    const resetStore = useEditLocationStore(store => store.reset)
    const handleDeleteMedia = useEditLocationStore(store => store.addDeleteMedia)
    const showErrorModal = useModalStore(store => store.setError)
    const setSnack = useModalStore(store => store.setSnack)
    const uploadImages = useUploadImages()
    const [loading, setLoading] = useState(false)
    const images = useImageStore(store => store.images)
    const clearImages = useImageStore(store => store.clearImages)
    const [saveLocation] = useEditLocation()
    const clearState = () => { resetStore(); clearImages() }

    const handleSave = async () => {
        setLoading(true)
        let newImages = images.map(({ uri, id }) => ({ uri, id }));
        if(mapSnapshot) newImages.push(mapSnapshot);
        try{
            let media: UploadResult['uploads'] | undefined;
            let map_image: UploadResult['uploads'][number] | undefined;
            if(newImages.length > 0){
                const res = await uploadImages(newImages)
                if(!res) return setLoading(false)
                if(mapSnapshot) map_image = res.uploads.pop()
                if(res.uploads.length > 0) media = res.uploads;
            }
            await saveLocation({ variables: { id, update: {
                ...editLocation, map_image, media,
                deleteMedia: deleteMedia.length > 0 ? deleteMedia : undefined,
            }}})
            setLoading(false); 
            navigation.goBack();
            setSnack('Location Updated'); 
        }catch(err){
            console.error(err)
            setLoading(false)
            showErrorModal(true, ErrorType.EditLocation)
        }
    }

    useEffect(() => navigation.addListener('beforeRemove', clearState),[])

    return (
        <View style={styles.container}>
            <HeaderSection navigation={navigation}/>
            <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps='handled'>
                <TitleInput currentValue={data?.location.title}/>
                <DescriptionInput currentValue={data?.location.description}/>
                <View style={styles.waterbody}>
                    <Text style={styles.name}>{data?.location.waterbody.name}</Text>
                    <Text>{data ? waterbodyLocationLabel(data.location.waterbody) : ""}</Text>
                </View>
                <EditImageInput currentValues={data?.location.media} onRemove={handleDeleteMedia}/>
                <PrivacyInput currentValue={data?.location.privacy}/>
                <LocationInput 
                    navigation={navigation} 
                    mapImage={data?.location.map_image}
                    geom={data?.location.geom}
                />
                <Button 
                mode='contained' 
                style={styles.button}
                labelStyle={styles.label}
                onPress={handleSave}
                >Save</Button>
            </ScrollView>
            { (queryLoading || loading) && <LoadingBackdrop/> }
            <SelectPrivacyBottomSheet currentValue={data?.location.privacy}/>
        </View>
    )
};

export default EditLocationScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  main: {
    paddingVertical: 16,
    minHeight: 1150
  },
  button: {
    marginTop: 36,
    marginHorizontal: 16,
    borderRadius: 6
  },
  label: {
    fontSize: 16,
    paddingVertical: 4
  },
  waterbody: {
    marginTop: 24,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.background,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.onSecondaryContainer,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 2
  }
})
