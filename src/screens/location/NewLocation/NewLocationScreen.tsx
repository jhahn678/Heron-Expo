import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../../../types/navigation'
import { UploadResult, useUploadImages } from '../../../hooks/mutations/useUploadImages'
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

  const uploadImages = useUploadImages()
  const [loading, setLoading] = useState(false)
  const images = useImageStore(store => store.images)
  const clearImages = useImageStore(store => store.clearImages)

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
      let media: UploadResult['uploads'] | undefined;
      let map_image: UploadResult['uploads'][number] | undefined;
      if(newImages.length > 0){
        const res = await uploadImages(newImages)
        if(!res) return setLoading(false)
        if(mapSnapshot) map_image = res.uploads.pop()
        if(res.uploads.length > 0) media = res.uploads;
      }
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
          mode='contained' 
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