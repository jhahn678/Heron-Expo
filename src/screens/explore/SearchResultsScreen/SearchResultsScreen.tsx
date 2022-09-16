import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet, View, Dimensions } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import SearchBar from '../../../components/inputs/SearchBar'
import { useSearchWaterbodiesQuery } from '../../../hooks/queries/useSearchWaterbodies'
import { useLocationStore } from '../../../store/location/useLocationStore'
import { useSearchParamStore } from '../../../store/search/useSearchParamStore'
import { ExploreStackScreenProps } from '../../../types/navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import WaterbodySearchResult from '../../../components/lists/WaterbodySearch/WaterbodySearchResult'


const SearchResultsScreen = ({
  navigation, route
}: ExploreStackScreenProps<'SearchResultsScreen'>) => {

  const { width } = Dimensions.get('screen')
  const { params } = route; 
  const { latitude, longitude } = useLocationStore()
  const { value, classifications, adminOne, geoplace, sort, resetSearchParams } = useSearchParamStore()

  const { data, loading, error, fetchMore } = useSearchWaterbodiesQuery({
    value, classifications, adminOne, sort, 
    longitude: geoplace ? geoplace.geom.coordinates[0] : longitude, 
    latitude: geoplace ? geoplace.geom.coordinates[1] : latitude
  })

  const handleBack = () => {
    resetSearchParams()
    navigation.goBack()
  }

  const navigateToWaterbody = (id: number) => () => {
    resetSearchParams()
    navigation.navigate('WaterbodyScreen', { id })
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { width: width * .94 }]}>
        <SearchBar 
          onPress={handleBack}
          goBack={handleBack}
          value={value || undefined}
          enabled={false}
          placeholder={
            params ? params.placeholder : 
            geoplace ? geoplace.name : 
            'Search place or waterbody'
          }
          style={{ marginLeft: 8, width: (width*.90)}}
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
                onPress={navigateToWaterbody(item.id)}
              />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.empty}>0 results matched</Text>
            )}
            onEndReachedThreshold={.5}
            onEndReached={() => fetchMore({ 
              variables: { 
                offset: data?.waterbodies.length 
              }
            })}
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