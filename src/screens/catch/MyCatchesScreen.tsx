import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MainTabsScreenProps } from '../../navigation/types'

const MyCatchesScreen = (props: MainTabsScreenProps<'MyCatchesScreen'>): JSX.Element => {

  return (
    <View>
      <Text>CatchesListScreen</Text>
    </View>
  )
}

export default MyCatchesScreen;

const styles = StyleSheet.create({})