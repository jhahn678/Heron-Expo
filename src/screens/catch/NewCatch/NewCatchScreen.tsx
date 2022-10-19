import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
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
import { UploadResult, useUploadImages } from '../../../hooks/mutations/useUploadImages'
import LoadingBackdrop from '../../../components/loaders/LoadingBackdrop'
import { useModalStore } from '../../../store/modal/useModalStore'
import { ErrorType } from '../../../utils/mapErrorTypeToDetails'
import WaterbodyInput from '../../../components/inputs/WaterbodyInput'
import DateTimeInput from './sections/DateTimeInput'

const NewCatchScreen = ({ navigation, route }: RootStackScreenProps<'NewCatchScreen'>) => {

  const { params } = route;

  const [createCatch] = useCreateCatch()
  const uploadImages = useUploadImages()
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
  const setSnack = useModalStore(store => store.setSnack)
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
      await createCatch({ variables: { 
        newCatch: { ...newCatch, media, map_image }
      }})
      setLoading(false)
      navigation.goBack()
      setSnack('New Catch Saved')
    }catch(err){
      console.error(err)
      setLoading(false)
      showErrorModal(true, ErrorType.CreateCatch)
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
          mode='contained'
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
    width: '100%'
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