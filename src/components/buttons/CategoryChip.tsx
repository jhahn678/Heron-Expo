import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useSearchParamStore } from '../../store/search/useSearchParamStore'
import { ExploreStackScreenProps } from '../../types/navigation'
import { WaterbodyClassification } from '../../types/Waterbody'

interface Props {
  navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
  /** value to be send to for query */
  value: WaterbodyClassification,
  /** label to be displayed */
  label: string
}

const CategoryChip = ({ value, label, navigation }: Props) => {

  const { colors } = useTheme()
  const { classificationsAppend } = useSearchParamStore()

  const handleSelect = () => {
    classificationsAppend(value)
    navigation.navigate('SearchResultsScreen')
  }

  return (
    <TouchableOpacity onPress={handleSelect} 
      style={[styles.container, {
        elevation: 3, shadowColor: colors.backdrop, 
        shadowOffset: { height: 2, width: 0 }, 
        shadowRadius: 2, shadowOpacity: .2 
    }]}>
        <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default CategoryChip

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: '45%',
    backgroundColor: 'white',
    marginTop: '5%',
    borderRadius: 12,
  },
  label: {
    fontWeight: '700'
  }
})