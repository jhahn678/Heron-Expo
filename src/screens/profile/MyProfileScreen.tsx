import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabsScreenProps } from '../../navigation/types'

const MyProfileScreen = (props: BottomTabsScreenProps<'MyProfileScreen'>) => {
  return (
    <View>
      <Text>MyProfileScreen</Text>
    </View>
  )
}

export default MyProfileScreen

const styles = StyleSheet.create({})