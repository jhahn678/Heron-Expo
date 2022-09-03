import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useLocationStore } from '../../../store/location/useLocationStore'
import { useSearchParamStore } from '../../../store/search/useSearchParamStore'
import { ExploreStackScreenProps } from '../../../types/navigation'

const SearchResultsScreen = (props: ExploreStackScreenProps<'SearchResultsScreen'>) => {

  const {
    hasCoordinates,
    latitude,
    longitude
  } = useLocationStore()

  const {
    value,
    classifications,
    adminOne,
    geoplace,
    sort
  } = useSearchParamStore()

  return (
    <View style={styles.container}>

    </View>
  )
}

export default SearchResultsScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})