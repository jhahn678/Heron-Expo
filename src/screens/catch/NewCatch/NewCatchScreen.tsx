import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../../types/navigation'
import Header from './sections/Header'
import TitleInput from './sections/TitleInput'
import DescriptionInput from './sections/DescriptionInput'
import ImageInput from '../../../components/inputs/ImageInput'
import { useNewCatchStore } from '../../../store/mutations/useNewCatchStore'
import { useImageStore } from '../../../store/image/useImageStore'
import LocationInput from './sections/LocationInput'
import SpeciesInput from './sections/SpeciesInput'
import MeasurementsInput from './sections/MeasurementsInput'
import RigInput from './sections/RigInput'
import { Button } from 'react-native-paper'
import { useCreateCatch } from '../../../hooks/mutations/useCreateCatch'
import { useUploadImages } from '../../../hooks/mutations/useUploadImages'
import LoadingBackdrop from '../../../components/loaders/LoadingBackdrop'
import { useModalStore } from '../../../store/modal/useModalStore'
import { ErrorType } from '../../../utils/conversions/mapErrorTypeToDetails'
import WaterbodyInput from '../../../components/inputs/WaterbodyInput'
import DateTimeInput from './sections/DateTimeInput'
import { MediaInput } from '../../../types/Media'
const { width } = Dimensions.get("window")

const NewCatchScreen = ({ navigation, route }: RootStackScreenProps<'NewCatchScreen'>) => {

  const { params } = route;

  const [createCatch] = useCreateCatch()
  const { uploadToS3 } = useUploadImages()
  const [loading, setLoading] = useState(false)
  const images = useImageStore(store => store.images)
  const clearImages = useImageStore(store => store.clearImages)
  
  const newCatch = useNewCatchStore(store => ({
    title: store.title,
    description: store.description,
    species: store.species,
    waterbody: store.waterbody,
    point: store.point,
    length: store.length,
    weight: store.weight,
    rig: store.rig,
    created_at: store.createdAt
  }))

  const setWaterbody = useNewCatchStore(store => store.setWaterbody)
  const resetStore = useNewCatchStore(store => store.reset)
  const mapSnapshot = useNewCatchStore(store => store.mapSnapshot)
  const showErrorModal = useModalStore(store => store.setError)
  const reauthenticate = useModalStore(store => store.reauthenticate)
  const setSnack = useModalStore(store => store.setSnack)
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
      await createCatch({ variables: { 
        newCatch: { ...newCatch, media, map_image }
      }})
      navigation.goBack()
      setSnack('New Catch Saved')
    }catch(err){
      console.error(err)
      showErrorModal(true, ErrorType.CreateCatch)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => navigation.addListener('beforeRemove', clearState),[])

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps='handled'>
        <TitleInput/>
        <DescriptionInput/>
        <DateTimeInput/>
        <SpeciesInput/>
        <ImageInput/>
        <WaterbodyInput 
          selectedWaterbody={params?.waterbody} 
          setWaterbody={setWaterbody}
        />
        <LocationInput navigation={navigation}/>
        <MeasurementsInput/>
        <RigInput/>
        <Button 
          mode={'contained'}
          onPress={handleSave} 
          theme={{ colors: { surfaceDisabled: '#d9d9d9' }}}
          style={styles.button}
          labelStyle={styles.label}
          disabled={
            !newCatch.title && 
            !newCatch.description && 
            !newCatch.species && 
            !newCatch.waterbody && 
            !newCatch.point && 
            !newCatch.length && 
            !newCatch.weight &&
            !newCatch.rig
          }
        >Save</Button>
      </ScrollView>
      { loading && <LoadingBackdrop/> }
    </View>
  )
}

export default NewCatchScreen

const styles = StyleSheet.create({
  container: {
    width
  },
  main: {
    paddingVertical: 16,
    minHeight: 1450
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