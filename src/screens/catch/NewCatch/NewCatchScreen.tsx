import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../../types/navigation'
import Header from './sections/Header'
import TitleInput from './sections/TitleInput'
import DescriptionInput from './sections/DescriptionInput'
import ImageInput from './sections/ImageInput'

const NewCatchScreen = ({ navigation }: RootStackScreenProps<'NewCatchScreen'>) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <ScrollView style={styles.main}>
        <TitleInput/>
        <DescriptionInput/>
        <ImageInput/>
        {/* <WaterbodyInput/> */}
        {/* <LocationInput/> */}
        {/* <SpeciesInput/> */}
        {/* <DetailsInput/> */}
        {/* <RigInput/> */}
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
    paddingVertical: 16
  }
})