import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet, View, Dimensions } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import SearchBar from '../../../components/inputs/SearchBar'
import { useSearchWaterbodiesQuery } from '../../../hooks/queries/useSearchWaterbodiesQuery'
import { useLocationStore } from '../../../store/location/useLocationStore'
import { useSearchParamStore } from '../../../store/search/useSearchParamStore'
import { ExploreStackScreenProps } from '../../../types/navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import WaterbodySearchResult from '../../../components/lists/WaterbodySearch/WaterbodySearchResult'


const SearchResultsScreen = ({
  navigation
}: ExploreStackScreenProps<'SearchResultsScreen'>) => {

  const { width } = Dimensions.get('screen')

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

  const { data, loading, error } = useSearchWaterbodiesQuery({
    value, classifications, adminOne, sort, 
    longitude: geoplace ? geoplace.geom.coordinates[0] : longitude, 
    latitude: geoplace ? geoplace.geom.coordinates[1] : latitude
  })

  return (
    <View style={styles.container}>
      <View style={[styles.header, { width: width * .94 }]}>
        <Icon name='arrow-left' size={30} onPress={navigation.goBack}/>
        <SearchBar 
          value={geoplace ? geoplace.name : (value || '')} 
          placeholder='Search place or waterbody'
          style={{ marginLeft: 12, width: (width*.9) - 48}}
        />
      </View>
      { 
        data ? 
          <FlashList
            data={data?.waterbodies}
            estimatedItemSize={300}
            renderItem={({ item }) => (
              <WaterbodySearchResult 
                key={item.id}
                data={item} 
                onPress={() => navigation.navigate('WaterbodyScreen', { id: item.id })}
              />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.empty}>0 results matched</Text>
            )}
          />
        : loading ? <ActivityIndicator size={48}/>
        : error && <Text style={styles.empty}>There was an error</Text>
      }
    </View>
  )
}

export default SearchResultsScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  header: {
    alignSelf: 'center',
    paddingTop: 64,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 64,
    fontSize: 16,
    fontWeight: '500'
  }
})