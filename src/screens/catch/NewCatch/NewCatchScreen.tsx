import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../../types/navigation'
import Header from './sections/Header'
import TitleInput from './sections/TitleInput'
import DescriptionInput from './sections/DescriptionInput'
import ImageInput from './sections/ImageInput'
import WaterbodyInput from './sections/WaterbodyInput'
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
    coordinates: store.coordinates,
    length: store.length,
    weight: store.weight,
    rig: store.rig
  }))

  const resetStore = useNewCatchStore(store => store.reset)
  const mapSnapshot = useNewCatchStore(store => store.mapSnapshot)
  const showErrorModal = useModalStore(store => store.setError)
  const clearState = () => { resetStore(); clearImages() }

  const handleSave = async () => {
    setLoading(true)
    let newImages = images.map(({ uri, id }) => ({ uri, id }));
    if(mapSnapshot) newImages.push(mapSnapshot);
    try{
      let media: UploadResult['uploads'] | undefined;
      if(newImages.length > 0){
        const uploaded = await uploadImages(newImages)
        if(!uploaded) return setLoading(false)
        const { uploads, errors } = uploaded;
        // if(errors) //do something
        media = uploads;
      }
      const variables = { newCatch: { ...newCatch, media } }
      const results = await createCatch({ variables })
      console.log(results)
      setLoading(false)
      navigation.goBack()
    }catch(err){
      console.error(err)
      setLoading(false)
      showErrorModal(true, ErrorType.CreateCatch)
    }
  }

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', clearState)
    return listener;
  },[])

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps='handled'>
        <TitleInput/>
        <DescriptionInput/>
        <SpeciesInput/>
        <ImageInput/>
        <WaterbodyInput selectedWaterbody={params?.waterbody}/>
        <LocationInput navigation={navigation}/>
        <MeasurementsInput/>
        <RigInput/>
        <Button 
          mode='contained' 
          style={styles.button}
          labelStyle={styles.label}
          onPress={handleSave}
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