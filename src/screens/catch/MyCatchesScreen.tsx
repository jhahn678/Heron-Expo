import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabsScreenProps } from '../../navigation/types'

const MyCatchesScreen = (props: BottomTabsScreenProps<'MyCatchesScreen'>): JSX.Element => {

  return (
    <View>
      <Text>CatchesListScreen</Text>
    </View>
  )
}

export default MyCatchesScreen;

const styles = StyleSheet.create({})