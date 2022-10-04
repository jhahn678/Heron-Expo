import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../../../types/navigation'
import { UploadResult, useUploadImages } from '../../../hooks/mutations/useUploadImages'
import { useImageStore } from '../../../store/image/useImageStore'
import { useCreateLocation } from '../../../hooks/mutations/useCreateLocation'
import { useNewLocationStore } from '../../../store/mutations/useNewLocationStore'
import { useModalStore } from '../../../store/modal/useModalStore'
import { ErrorType } from '../../../utils/mapErrorTypeToDetails'
import LoadingBackdrop from '../../../components/loaders/LoadingBackdrop'
import { Button } from 'react-native-paper'
import Header from './sections/Header'
import TitleInput from './sections/TitleInput'
import DescriptionInput from './sections/DescriptionInput'
import ImageInput from '../../../components/inputs/ImageInput'
import LocationInput from './sections/LocationInput'


const NewLocationScreen = ({ navigation }: RootStackScreenProps<'NewLocationScreen'>) => {

  const [createLocation] = useCreateLocation()

  const location = useNewLocationStore(store => ({
    title: store.title,
    description: store.description,
    privacy: store.privacy,
    waterbody: store.waterbody,
    hexcolor: store.hexcolor,
    point: store.point,
    polygon: store.polygon
  }))

  const uploadImages = useUploadImages()
  const [loading, setLoading] = useState(false)
  const images = useImageStore(store => store.images)
  const clearImages = useImageStore(store => store.clearImages)

  const resetStore = useNewLocationStore(store => store.reset)
  const mapSnapshot = useNewLocationStore(store => store.mapSnapshot)
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
      await createLocation({ variables: {
        location: { ...location, media }
      }})
      setLoading(false)
      navigation.goBack()
    }catch(err){
      console.error(err)
      setLoading(false)
      showErrorModal(true, ErrorType.CreateLocation)
    }
  }

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', clearState)
    return listener;
  },[])
  
  return (
    <View>
      <Header navigation={navigation}/>
      <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps='handled'>
        <TitleInput/>
        <DescriptionInput/>
        <LocationInput navigation={navigation}/>
        <ImageInput/>
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

export default NewLocationScreen

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