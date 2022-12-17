import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../../types/navigation'
import { useImageStore } from '../../../store/image/useImageStore'
import { Button } from 'react-native-paper'
import { useUploadImages } from '../../../hooks/mutations/useUploadImages'
import LoadingBackdrop from '../../../components/loaders/LoadingBackdrop'
import { useModalStore } from '../../../store/modal/useModalStore'
import { ErrorType } from '../../../utils/conversions/mapErrorTypeToDetails'
import { useEditCatchStore } from '../../../store/mutations/useEditCatchStore'
import WaterbodyInput from '../../../components/inputs/WaterbodyInput'
import HeaderSection from './sections/HeaderSection'
import { useEditCatchQuery } from '../../../hooks/queries/useEditCatchQuery'
import TitleInput from './sections/TitleInput'
import DescriptionInput from './sections/DescriptionInput'
import SpeciesInput from './sections/SpeciesInput'
import MeasurementsInput from './sections/MeasurementsInput'
import RigInput from './sections/RigInput'
import LocationInput from './sections/LocationInput'
import EditImageInput from '../../../components/inputs/EditImageInput'
import { useEditCatch } from '../../../hooks/mutations/useEditCatch'
import { MediaInput } from '../../../types/Media'


const EditCatchScreen = ({ navigation, route }: RootStackScreenProps<'EditCatchScreen'>) => {

    const { params: { id } } = route;
    
    const { data, loading: queryLoading } = useEditCatchQuery(id)
  
    const editCatch = useEditCatchStore(store => ({
        rig: store.rig,
        point: store.point,
        title: store.title,
        length: store.length,
        weight: store.weight,
        species: store.species,
        waterbody: store.waterbody,
        description: store.description,
    }))

    const deleteMedia = useEditCatchStore(store => store.deleteMedia)
    const mapSnapshot = useEditCatchStore(store => store.mapSnapshot)
    const handleDeleteMedia = useEditCatchStore(store => store.addDeleteMedia)
    const setWaterbody = useEditCatchStore(store => store.setWaterbody)
    const resetStore = useEditCatchStore(store => store.reset)
    const showErrorModal = useModalStore(store => store.setError)
    const reauthenticate = useModalStore(store => store.reauthenticate)
    const setSnack = useModalStore(store => store.setSnack)
    const { uploadToS3 } = useUploadImages()
    const [loading, setLoading] = useState(false)
    const images = useImageStore(store => store.images)
    const clearImages = useImageStore(store => store.clearImages)
    const [saveCatch] = useEditCatch()
    const clearState = () => { resetStore(); clearImages() }

    const handleSave = async () => {
        setLoading(true)
        let newImages = images.map(({ uri, id }) => ({ uri, id }));
        if(mapSnapshot) newImages.push(mapSnapshot);
        try{
            let media: MediaInput[] | undefined;
            let map_image: MediaInput | undefined;
            const uploads = await uploadToS3(newImages)
            // Handle errors
            if(uploads.length !== newImages.length){
                if(reauthenticate) return; //if auth fails, cancel save catch
                if(uploads.length === 0) showErrorModal(true, ErrorType.Upload)
                if(uploads.length > 0) showErrorModal(true, ErrorType.UploadPartial)
            }
            //Map snapshot should be the last image in the array
            if(uploads.length && mapSnapshot) map_image = uploads[uploads.length - 1];
            //All images excluding the map snapshot
            if(uploads.length > 1) media = uploads.slice(0, uploads.length - 1);
            await saveCatch({ variables: { id, details: {
                ...editCatch, map_image, media,
                deleteMedia: deleteMedia.length > 0 ? deleteMedia : undefined,
            }}})
            navigation.goBack()
            setSnack('Catch updated')
        }catch(err){
            console.error(err)
            showErrorModal(true, ErrorType.EditCatch)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => navigation.addListener('beforeRemove', clearState),[])

    return (
        <View style={styles.container}>
        <HeaderSection navigation={navigation}/>
        <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps='handled'>
            <TitleInput currentValue={data?.catch.title}/>
            <DescriptionInput currentValue={data?.catch.description}/>
            <SpeciesInput currentValue={data?.catch.species}/>
            <EditImageInput currentValues={data?.catch.media} onRemove={handleDeleteMedia}/>
            <WaterbodyInput 
                setWaterbody={setWaterbody}
                selectedWaterbody={data?.catch.waterbody.id} 
            />
            <LocationInput 
                navigation={navigation} 
                mapImage={data?.catch.map_image}
                geom={data?.catch.geom}
            />
            <MeasurementsInput
                currentLength={data?.catch.length}
                currentWeight={data?.catch.weight}
            />
            <RigInput currentValue={data?.catch.rig}/>
            <Button 
                mode={'contained'} 
                style={styles.button}
                labelStyle={styles.label}
                onPress={handleSave}
            >Save</Button>
        </ScrollView>
        { (queryLoading || loading) && <LoadingBackdrop/> }
        </View>
    )
};

export default EditCatchScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  main: {
    paddingVertical: 16,
    minHeight: 1500
  },
  button: {
    marginTop: 36,
    marginHorizontal: 16,
    borderRadius: 6
  },
  label: {
    fontSize: 16,
    paddingVertical: 4
  }
})
