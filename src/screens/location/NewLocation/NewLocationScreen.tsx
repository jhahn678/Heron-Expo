import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../../../types/navigation'
import { useUploadImages } from '../../../hooks/mutations/useUploadImages'
import { useImageStore } from '../../../store/image/useImageStore'
import { useCreateLocation } from '../../../hooks/mutations/useCreateLocation'
import { useNewLocationStore } from '../../../store/mutations/useNewLocationStore'
import { useModalStore } from '../../../store/modal/useModalStore'
import { ErrorType } from '../../../utils/conversions/mapErrorTypeToDetails'
import LoadingBackdrop from '../../../components/loaders/LoadingBackdrop'
import { Button } from 'react-native-paper'
import Header from './sections/Header'
import TitleInput from './sections/TitleInput'
import DescriptionInput from './sections/DescriptionInput'
import ImageInput from '../../../components/inputs/ImageInput'
import LocationInput from './sections/LocationInput'
import PrivacyInput from './sections/PrivacyInput'
import SelectPrivacyBottomSheet from './sections/SelectPrivacyBottomSheet'
import WaterbodyInput from '../../../components/inputs/WaterbodyInput'
import { MediaInput } from '../../../types/Media'


const NewLocationScreen = ({ navigation, route }: RootStackScreenProps<'NewLocationScreen'>) => {

  const { params } = route;

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

  const { uploadToS3 } = useUploadImages()
  const [loading, setLoading] = useState(false)
  const images = useImageStore(store => store.images)
  const clearImages = useImageStore(store => store.clearImages)
  const reauthenticate = useModalStore(store => store.reauthenticate)
  const resetStore = useNewLocationStore(store => store.reset)
  const mapSnapshot = useNewLocationStore(store => store.mapSnapshot)
  const setWaterbody = useNewLocationStore(store => store.setWaterbody)
  const showErrorModal = useModalStore(store => store.setError)
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
      await createLocation({ variables: {
        location: { ...location, media, map_image }
      }})
      setLoading(false)
      navigation.goBack()
      setSnack('New Location Saved')
    }catch(err){
      console.error(err)
      setLoading(false)
      showErrorModal(true, ErrorType.CreateLocation)
    }
  }

  useEffect(() => navigation.addListener('beforeRemove', clearState),[])
  
  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps='handled'>
        <TitleInput/>
        <DescriptionInput/>
        <WaterbodyInput 
          title={"Select Fishery"}
          required={true}
          setWaterbody={setWaterbody} 
          selectedWaterbody={params?.waterbody}
        />
        <PrivacyInput/>
        <LocationInput navigation={navigation}/>
        <ImageInput/>
        <Button 
          mode={'contained'} 
          theme={{ colors: { surfaceDisabled: '#d9d9d9' }}}
          style={styles.button}
          labelStyle={styles.label}
          onPress={handleSave}
          disabled={!location.waterbody || (!location.point && !location.polygon)}
        >Save</Button>
      </ScrollView>
      { loading && <LoadingBackdrop/> }
      <SelectPrivacyBottomSheet/>
    </View>
  )
}

export default NewLocationScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  main: {
    paddingTop: 16,
    paddingBottom: 50
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