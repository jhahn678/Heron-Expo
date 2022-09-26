import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../../types/navigation'
import HeaderSection from './sections/HeaderSection'

const NewCatchScreen = ({ navigation }: RootStackScreenProps<'NewCatchScreen'>) => {
  return (
    <ScrollView style={styles.container}>
      <HeaderSection navigation={navigation}/>
    </ScrollView>
  )
}

export default NewCatchScreen

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
})