import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabsScreenProps } from '../../types/navigation'


const MyLocationsScreen = (props: BottomTabsScreenProps<'MyLocationsScreen'>) => {

  return (
    <View>
      <Text>MyLocationsScreen</Text>
    </View>
  )
}

export default MyLocationsScreen

const styles = StyleSheet.create({})