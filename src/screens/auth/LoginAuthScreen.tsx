import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../navigation/types'

const LoginAuthScreen = (props: RootStackScreenProps<'LoginAuthScreen'>): JSX.Element => {
  return (
    <View>
      <Text>LoginAuthScreen</Text>
    </View>
  )
}

export default LoginAuthScreen

const styles = StyleSheet.create({})