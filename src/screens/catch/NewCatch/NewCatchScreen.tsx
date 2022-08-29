import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../../../navigation/types'

const NewCatchScreen = (props: AppStackScreenProps<'NewCatchScreen'>) => {
  return (
    <View>
      <Text>NewCatchScreen</Text>
    </View>
  )
}

export default NewCatchScreen

const styles = StyleSheet.create({})