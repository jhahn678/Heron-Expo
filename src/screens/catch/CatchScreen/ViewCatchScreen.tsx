import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useGetCatchesQueryMock } from '../../../../__mocks';
import { useGetCatchQuery } from '../../../hooks/queries/useGetCatch';
import { MapResource, RootStackScreenProps } from '../../../types/navigation'
import BannerSection from './sections/BannerSection';
import HeadingSection from './sections/HeadingSection';

const ViewCatchScreen = ({ navigation, route }: RootStackScreenProps<'ViewCatchScreen'>) => {

  const { params: { id }} = route;

  const { data, loading, error } = useGetCatchQuery({ id })
  console.log(error, data)
  const navigateToMap = () => navigation.navigate('ViewMapScreen', { resource: MapResource.Catch, id })

  const navigateToUser = () => {
    if(!data) return;
    navigation.navigate('UserProfileScreen', { id: data.catch.user.id })
  }

  return (
    <ScrollView style={styles.container}>
      <BannerSection navigation={navigation} id={id} data={data?.catch.media}/>
      {/* Title -- waterbody -- User - created at - species -- description */}
      <HeadingSection navigation={navigation} data={data?.catch}/>
      {/* Grid of length, weight, species, rig, stats compared to other catches? accolades? */}
      {/* <StatsSection/> */}
      {/* View catch on map */}
      {/* <LikeBar> */}
      {/* <MapSection/> */}
      {/* At location? */}
      {/* Image flatlist if theres images */}
      {/* <MediaSection> */}
    </ScrollView>
  );
}

export default ViewCatchScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})