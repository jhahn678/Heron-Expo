import React from 'react'
import { StyleSheet, Pressable, Dimensions } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useSearchParamStore } from '../../store/search/useSearchParamStore'
import { ExploreStackScreenProps } from '../../types/navigation'
import { WaterbodyClassification } from '../../types/Waterbody'
import IsometricLake from '../svg/IsometricLake'
import IsometricPond from '../svg/IsometricPond'
import IsometricRiver from '../svg/IsometricRiver'
import IsometricCreek from '../svg/IsometricCreek'
import { theme } from '../../config/theme'
const { width } = Dimensions.get('screen')

interface Props {
  navigation: ExploreStackScreenProps<'ExploreScreen'>['navigation']
  /** value to be send to for query */
  value: WaterbodyClassification,
  /** label to be displayed */
  label: string
}

const CategoryChip = ({ value, label, navigation }: Props) => {

  const { classificationsAppend } = useSearchParamStore()

  const handleSelect = () => {
    classificationsAppend(value)
    navigation.navigate('SearchResultsScreen', { title: `${label} near you`})
  }

  return (
    <Pressable onPress={handleSelect} 
      style={[styles.container, {
        elevation: 3, shadowColor: theme.colors.backdrop, 
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
    backgroundColor: theme.colors.background,
    height: 76,
    width: (width - 72) / 2, // 24 PL + 24 PR on parent container + 24 for space between
    marginBottom: 24,
    borderRadius: 12,
    paddingRight: 16
  },
  label: {
    fontWeight: '700',
  }
})