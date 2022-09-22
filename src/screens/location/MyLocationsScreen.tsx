import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useAuth } from '../../store/auth/useAuth'
import { BottomTabsScreenProps } from '../../types/navigation'


const MyLocationsScreen = ({ navigation }: BottomTabsScreenProps<'MyLocationsScreen'>) => {

  const userId = useAuth(store => store.id)

  return (
    <View style={styles.container}>

    </View>
  )
}

export default MyLocationsScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
})