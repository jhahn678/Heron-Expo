import React, { useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { useGetCatchQuery } from '../../../hooks/queries/useGetCatch';
import { RootStackScreenProps } from '../../../types/navigation'
import BannerSection from './sections/BannerSection';
import DetailsSection from './sections/DetailsSection';
import HeadingSection from './sections/HeadingSection';
import MapSection from './sections/MapSection';

const ViewCatchScreen = ({ navigation, route }: RootStackScreenProps<'ViewCatchScreen'>) => {

  const { params: { id }} = route;
  const { data, refetch } = useGetCatchQuery({ id })
  const [refetching, setRefetching] = useState(false)
  const handleRefetch = () => { setRefetching(true); refetch().then(() => setRefetching(false)) }

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={refetching} onRefresh={handleRefetch}/>
    }>
      <BannerSection 
        id={id} user={data?.catch.user.id}
        navigation={navigation} 
        media={data?.catch.media}
        mapImage={data?.catch.map_image}
      />
      <HeadingSection 
        id={id}
        navigation={navigation} 
        data={data?.catch}
      />
      <DetailsSection data={data?.catch}/>
      { data?.catch.geom &&
        <MapSection 
          id={id} 
          navigation={navigation} 
          uri={data?.catch.map_image?.url}
        />
      }
    </ScrollView>
  );
}

export default ViewCatchScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})