import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MainTabsScreenProps } from '../../navigation/types'

const MyProfileScreen = (props: MainTabsScreenProps<'MyProfileScreen'>) => {
  return (
    <View>
      <Text>MyProfileScreen</Text>
    </View>
  )
}

export default MyProfileScreen

const styles = StyleSheet.create({})