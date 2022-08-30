import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ExploreStackScreenProps } from '../../../types/navigation'

const ExploreScreen = (props: ExploreStackScreenProps<'ExploreScreen'>) => {
  return (
    <View>
      <Text>ExploreScreen</Text>
    </View>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({})