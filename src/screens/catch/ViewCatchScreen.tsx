import { StyleSheet, Text, View } from 'react-native'
import { RootStackScreenProps } from '../../types/navigation'
import React from 'react'

interface Props {
  navigation: RootStackScreenProps<'ViewCatchScreen'>['navigation']
}

const ViewCatchScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>ViewCatchScreen</Text>
    </View>
  )
}

export default ViewCatchScreen

const styles = StyleSheet.create({})