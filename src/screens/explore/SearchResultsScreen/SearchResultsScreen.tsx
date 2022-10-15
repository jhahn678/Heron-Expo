import React, { useEffect, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet, View, Dimensions } from 'react-native'
import { ActivityIndicator, Card, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSearchWaterbodiesQuery } from '../../../hooks/queries/useSearchWaterbodies'
import { useLocationStore } from '../../../store/location/useLocationStore'
import { useSearchParamStore } from '../../../store/search/useSearchParamStore'
import { ExploreStackScreenProps } from '../../../types/navigation'
import WaterbodySearchResult from '../../../components/lists/WaterbodySearch/WaterbodySearchResult'
import globalStyles from '../../../globalStyles'
import NoImagesUploaded from '../../../components/lists/shared/NoImagesUploaded'
const { height } = Dimensions.get('screen')
const limit = 20;

const SearchResultsScreen = ({ navigation, route }: ExploreStackScreenProps<'SearchResultsScreen'>) => {

  const { params } = route; 
  const { latitude, longitude } = useLocationStore()
  const [refreshing, setRefreshing] = useState(false)
  const value = useSearchParamStore(store => store.value)
  const { classifications, adminOne, geoplace, sort, resetSearchParams } = useSearchParamStore()

  const { data, loading, error, refetch, fetchMore } = useSearchWaterbodiesQuery({
    value, classifications, adminOne, sort, 
    longitude: geoplace ? geoplace.geom.coordinates[0] : longitude, 
    latitude: geoplace ? geoplace.geom.coordinates[1] : latitude
  })

  useEffect(() => navigation.addListener('beforeRemove', resetSearchParams),[])

  const handleBack = () => navigation.goBack()
  
  const handleFetchMore = () => {
    if(data && data.waterbodies.length && data.waterbodies.length % limit === 0){
      fetchMore({ variables: { offset: data?.waterbodies.length } })
    }
  }

  const handleRefetch = () => {
    setRefreshing(true)
    refetch().then(() => setRefreshing(false))
  }

  const navigateToWaterbody = (id: number) => () => {
    resetSearchParams()
    navigation.navigate('WaterbodyScreen', { id })
  }



  return (
    <View style={styles.container}>
      <Card style={styles.header}>
        <View style={globalStyles.frac}>
          <Icon name={'arrow-left'} size={24} onPress={handleBack}/>
          <Text style={styles.title} numberOfLines={1}>{
            params ? params.title : 
            geoplace ? `Results near ${geoplace.name}` : 
            'Search place or waterbody'
          }</Text>
        </View>
      </Card>
      { 
        data ? 
          <FlashList
            data={data.waterbodies}
            estimatedItemSize={300}
            contentContainerStyle={styles.content}
            refreshing={refreshing}
            onRefresh={handleRefetch}
            onEndReachedThreshold={.5}
            onEndReached={handleFetchMore}
            ListEmptyComponent={
              <NoImagesUploaded 
                caption='0 Results Found' 
                style={{ marginTop: height * .15 }}
              />
            }
            renderItem={({ item }) => (
              <WaterbodySearchResult 
                key={item.id}
                data={item} 
                onPress={navigateToWaterbody(item.id)}
              />
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderRadius: 0,
  },
  empty: {
    textAlign: 'center',
    marginTop: 64,
    fontSize: 16,
    fontWeight: '500'
  },
  content: {
    paddingTop: 24
  },
  title: {
    fontSize: 20,
    marginLeft: 16
  }
})