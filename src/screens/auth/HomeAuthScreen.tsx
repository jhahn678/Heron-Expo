import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../navigation/types'

const HomeAuthScreen = (props: RootStackScreenProps<'HomeAuthScreen'>): JSX.Element => {
  return (
    <View>
      <Text>HomeAuthScreen</Text>
    </View>
  )
}

export default HomeAuthScreen

const styles = StyleSheet.create({})