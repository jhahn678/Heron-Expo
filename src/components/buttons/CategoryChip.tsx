import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useSearchParamStore } from '../../store/search/useSearchParamStore'
import { ExploreStackScreenProps } from '../../types/navigation'
import { WaterbodyClassification } from '../../types/Waterbody'
import IsometricLake from '../icons/svg/IsometricLake'
import IsometricPond from '../icons/svg/IsometricPond'
import IsometricRiver from '../icons/svg/IsometricRiver'
import IsometricCreek from '../icons/svg/IsometricCreek'

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
    navigation.navigate('SearchResultsScreen', { placeholder: `${label} near you`})
  }

  return (
    <Pressable onPress={handleSelect} 
      style={[styles.container, {
        elevation: 3, shadowColor: colors.backdrop, 
        shadowOffset: { height: 2, width: 0 }, 
        shadowRadius: 2, shadowOpacity: .2 
    }]}>
      {
        value === 'river' ?
          <IsometricRiver />
        : value === 'lake' ?
          <IsometricLake/>
        : value === 'pond' ? 
          <IsometricPond/>
        : value === 'creek' ?
          <IsometricCreek/>
        : null
      }
        <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

export default CategoryChip

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    height: 72,
    width: '45%',
    marginTop: '5%',
    borderRadius: 12,
    paddingRight: 16
  },
  label: {
    fontWeight: '700',
  }
})