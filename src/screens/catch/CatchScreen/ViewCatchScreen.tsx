import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useGetCatchQuery } from '../../../hooks/queries/useGetCatch';
import { RootStackScreenProps } from '../../../types/navigation'
import BannerSection from './sections/BannerSection';
import DetailsSection from './sections/DetailsSection';
import HeadingSection from './sections/HeadingSection';
import MapSection from './sections/MapSection';

const ViewCatchScreen = ({ navigation, route }: RootStackScreenProps<'ViewCatchScreen'>) => {

  const { params: { id }} = route;

  const { data } = useGetCatchQuery({ id })

  return (
    <ScrollView style={styles.container}>
      <BannerSection 
        id={id} 
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