import React, { useEffect } from 'react'
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

const NewCatchScreen = ({ navigation }: RootStackScreenProps<'NewCatchScreen'>) => {

  const resetStore = useNewCatchStore(store => store.reset)
  const clearImages = useImageStore(store => store.clearImages)

  const clearState = () => { resetStore(); clearImages() }

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
        <WaterbodyInput/>
        <LocationInput navigation={navigation}/>
        <MeasurementsInput/>
        <RigInput/>
      </ScrollView>
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
  }
})