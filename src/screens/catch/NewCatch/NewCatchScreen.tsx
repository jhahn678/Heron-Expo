import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../../types/navigation'

const NewCatchScreen = (props: RootStackScreenProps<'NewCatchScreen'>) => {
  return (
    <View>
      <Text>NewCatchScreen</Text>
    </View>
  )
}

export default NewCatchScreen

const styles = StyleSheet.create({})