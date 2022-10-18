import React, { useState } from 'react'
import { StyleSheet, ScrollView, RefreshControl, View } from 'react-native'
import BookmarksIcon from '../../../components/icons/BookmarksIcon'
import CatchIcon from '../../../components/icons/CatchIcon'
import DockIcon from '../../../components/icons/DockIcon'
import GalleryIcon from '../../../components/icons/GalleryIcon'
import ReviewsIcon from '../../../components/icons/ReviewsIcon'
import TackleBoxIcon from '../../../components/icons/TackleBoxIcon'
import { useGetUserProfile } from '../../../hooks/queries/useGetUserProfile'
import { CatchQuery } from '../../../types/Catch'
import { LocationQuery } from '../../../types/Location'
import { MediaSource, ReviewQuery, RootStackScreenProps } from '../../../types/navigation'
import BioSection from './sections/BioSection'
import ProfileSection from '../MyProfileScreen/sections/ProfileSection'
import HeaderSection from './sections/HeaderSection'

const UserProfileScreen = ({ navigation, route }: RootStackScreenProps<'UserProfileScreen'>) => {

  const { params: { id }} = route;

  const { data, loading, refetch } = useGetUserProfile({ id })

  const [refreshing, setRefreshing] = useState(false)
  const handleRefetch = () => { setRefreshing(true); refetch().then(() => setRefreshing(false)) }

  const navigateCatches = () => {
    if(id) navigation.navigate("CatchListScreen", { 
      type: CatchQuery.User, title: 'Your Catches', id 
  })}

  const navigateLocations = () => {
    if(id) navigation.navigate('LocationListScreen', {
      type: LocationQuery.User, title: 'Your Locations', id
  })}

  const navigateSavedLocations = () => {
    if(id) navigation.navigate('LocationListScreen', {
      type: LocationQuery.UserSaved, title: 'Saved Locations', id
  })}

  const navigateReviews = () => {
    if(id) navigation.navigate('ReviewsScreen', { 
      id, type: ReviewQuery.User, 
      title: 'Your Reviews', 
      total: data?.user.total_reviews
  })}

  const navigateMedia = () => {
    if(id) navigation.navigate('MediaGridScreen', { 
      source: MediaSource.User, id, title: 'Your Media'
  })}

  return (
    <View style={styles.container}>
      <HeaderSection 
        data={data?.user} 
        loading={loading} 
        navigation={navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefetch}/>}
      >
        <BioSection 
          id={data?.user.id}
          username={data?.user.username}
          bio={data?.user.bio}
          following={data?.user.am_following}
        />
        <ProfileSection 
          loading={loading}
          label={'Catches'} 
          onPress={navigateCatches}
          icon={<CatchIcon size={32}/>} 
          value={data?.user.total_catches}
        />
        <ProfileSection 
          loading={loading}
          label={'Locations'} 
          onPress={navigateLocations}
          icon={<DockIcon size={32}/>} 
          value={data?.user.total_locations}
        />
        <ProfileSection 
          loading={loading}
          label={'Saved Locations'} 
          onPress={navigateSavedLocations}
          icon={<BookmarksIcon size={28}/>} 
          value={data?.user.total_saved_locations}
        />
        <ProfileSection 
          loading={loading}
          label={'Reviews'} 
          onPress={navigateReviews}
          icon={<ReviewsIcon size={28}/>} 
          value={data?.user.total_reviews}
        />
        <ProfileSection 
          loading={loading}
          label={'Media'} 
          onPress={navigateMedia}
          icon={<GalleryIcon size={28}/>} 
          value={data?.user.total_media}
        />
        <ProfileSection      
          label={'Gear'} 
          icon={<TackleBoxIcon size={32}/>} 
          value={'Coming soon'}
        />
      </ScrollView>
    </View>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})