import { Dimensions, StyleSheet, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import CatchesListItem from '../../../components/lists/CatchList/CatchesListItem'
import { useGetMyCatches } from '../../../hooks/queries/useGetMyCatches'
import { useMyCatchesModalStore } from '../../../store/modal/useMyCatchesModalStore'
import { MapResource, MyCatchesTabsScreenProps } from '../../../types/navigation'
import FiltersSection from './sections/FiltersSection'
import { useState } from 'react'

const { width } = Dimensions.get('screen')
const limit = 15;

const CatchesTabView = ({ navigation }: MyCatchesTabsScreenProps<'MyCatchesList'>): JSX.Element => {

  const filters = useMyCatchesModalStore(store => ({
    waterbody: store.waterbody,
    species: store.species,
    minDate: store.minDate,
    maxDate: store.maxDate,
    minLegnth: store.minLength,
    maxLength: store.maxLength,
    minWeight: store.minWeight,
    maxWeight: store.maxWeight,
  }))

  const { data, loading, error, fetchMore, refetch } = useGetMyCatches({ ...filters, limit })

  const [refetching, setRetching] = useState(false)
  
  const handleRefetch = () => {
    setRetching(true);
    refetch().then(() => setRetching(false))
  }

  const handleFetchMore = () => {
    if(!data || data.me.catches.length % limit !== 0) return;
    fetchMore({ variables: { offset: data.me.catches.length }})
  }

  const navigateToCatch = (id: number) => () => navigation.navigate('ViewCatchScreen', { id })
  const navigateToMap = (id: number) => () => navigation.navigate('ViewMapScreen', { resource: MapResource.Catch, id })
  const navigateToUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

  return (
    <View style={styles.container}>
      <FiltersSection/>
      <FlashList 
        data={data?.me.catches} 
        estimatedItemSize={400}
        refreshing={refetching}
        onRefresh={handleRefetch}
        onEndReachedThreshold={.4}
        onEndReached={handleFetchMore}
        renderItem={({ item }) => (
          <CatchesListItem
            data={{ ...item, is_favorited: false }}
            navigateToCatch={navigateToCatch(item.id)}
            navigateToMap={navigateToMap(item.id)}
            navigateToUser={navigateToUser(item.user.id)}
          />
        )}
      />
    </View>
  )
}

export default CatchesTabView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    width: width - 48,
    marginTop: 16,
  }
})
