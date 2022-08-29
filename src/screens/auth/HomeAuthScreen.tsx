import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../../navigation/types'

const HomeAuthScreen = (props: AppStackScreenProps<'HomeAuthScreen'>): JSX.Element => {
  return (
    <View>
      <Text>HomeAuthScreen</Text>
    </View>
  )
}

export default HomeAuthScreen

const styles = StyleSheet.create({})