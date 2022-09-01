import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Surface, Text, useTheme } from 'react-native-paper'
import { ExploreStackScreenProps } from '../../types/navigation'

interface Props {
  /** value to be send to for query */
  value: string,
  /** label to be displayed */
  label: string
  navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
}

const CategoryChip = ({ value, label, navigation }: Props) => {

  const { colors } = useTheme()

  return (
      <View style={[styles.container, { 
        shadowColor: colors.backdrop, 
        shadowOffset: { height: 2, width: 0 }, 
        shadowRadius: 2, shadowOpacity: .2 }
      ]}>
        <Text>{label}</Text>
      </View>
  )
}

export default CategoryChip

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: '45%',
    backgroundColor: 'white',
    marginTop: '5%',
    borderRadius: 12
  }
})