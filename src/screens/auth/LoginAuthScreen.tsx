import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../../navigation/types'

const LoginAuthScreen = (props: AppStackScreenProps<'LoginAuthScreen'>): JSX.Element => {
  return (
    <View>
      <Text>LoginAuthScreen</Text>
    </View>
  )
}

export default LoginAuthScreen

const styles = StyleSheet.create({})