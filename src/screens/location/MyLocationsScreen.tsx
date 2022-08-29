import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MainTabsScreenProps } from '../../navigation/types'


const MyLocationsScreen = (props: MainTabsScreenProps<'MyLocationsScreen'>) => {

  return (
    <View>
      <Text>MyLocationsScreen</Text>
    </View>
  )
}

export default MyLocationsScreen

const styles = StyleSheet.create({})