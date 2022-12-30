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
import ProfileSection from '../MyProfileScreen/sections/ProfileSection'
import { nameOrUsername } from '../../../utils/conversions/nameOrUsername'
import AvatarSection from './sections/AvatarSection'
import UserDetailsSection from './sections/UserDetailsSection'
import UserFollowsSection from './sections/UserFollowsSection'
import { FollowType } from '../../../types/User'
import UserProfileHeader from './sections/UserProfileHeader'

const UserProfileScreen = ({ navigation, route }: RootStackScreenProps<'UserProfileScreen'>) => {

  const { params: { id }} = route;

  const { data, loading, refetch } = useGetUserProfile({ id })

  const [refreshing, setRefreshing] = useState(false)
  const handleRefetch = () => { setRefreshing(true); refetch().then(() => setRefreshing(false)) }

  const navigateEditProfile = () => navigation.navigate('EditProfileScreen')

  const navigateImageScreen = () => {
    if(data?.user?.avatar) navigation
      .navigate('ViewImageScreen', { uri: data.user.avatar })
  }

  const navigateFollowers = () => {
    navigation.navigate("ContactsListScreen", { 
      id, type: FollowType.Followers
    })
  }

  const navigateFollowing = () => {
    navigation.navigate("ContactsListScreen", { 
      id, type: FollowType.Following
    })
  }

  const navigateCatches = () => {
    if(id) navigation.navigate("CatchListScreen", { 
      id, type: CatchQuery.User, 
      title: `${nameOrUsername(data?.user)}'s Catches`
  })}

  const navigateLocations = () => {
    if(id) navigation.navigate('LocationListScreen', {
      id, type: LocationQuery.User, 
      title: `${nameOrUsername(data?.user)}'s Locations`
  })}

  const navigateSavedLocations = () => {
    if(id) navigation.navigate('LocationListScreen', {
      id, type: LocationQuery.UserSaved, 
      title: `${nameOrUsername(data?.user)}'s Saved Locations`
  })}

  const navigateReviews = () => {
    if(id) navigation.navigate('ReviewsScreen', { 
      id, type: ReviewQuery.User, 
      total: data?.user.total_reviews, 
      title: `${nameOrUsername(data?.user)}'s Reviews`,
  })}

  const navigateMedia = () => {
    if(id) navigation.navigate('MediaGridScreen', { 
      source: MediaSource.User, id, 
      title: `${nameOrUsername(data?.user)}'s Media`,
  })}

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefetch}/>
        }>
        <UserProfileHeader
          data={data?.user}
          onNavigateBack={navigation.goBack}/>
        <AvatarSection 
          data={data?.user}
          loading={loading}
          onPressAvatar={navigateImageScreen}/>
        <UserDetailsSection
          data={data?.user}
          loading={loading}
          onEditProfile={navigateEditProfile}/>
        <UserFollowsSection  
          totalFollowers={data?.user?.total_followers} 
          totalFollowing={data?.user?.total_following}
          onNavigateFollowers={navigateFollowers}
          onNavigateFollowing={navigateFollowing}/>
        <ProfileSection 
          loading={loading}
          label={'Catches'} 
          onPress={navigateCatches}
          icon={<CatchIcon size={32}/>} 
          value={data?.user?.total_catches}
          style={{ marginTop: 16 }}/>
        <ProfileSection 
          loading={loading}
          label={'Locations'} 
          onPress={navigateLocations}
          icon={<DockIcon size={32}/>} 
          value={data?.user?.total_locations}/>
        <ProfileSection 
          loading={loading}
          label={'Saved Locations'} 
          onPress={navigateSavedLocations}
          icon={<BookmarksIcon size={28}/>} 
          value={data?.user?.total_saved_locations}/>
        <ProfileSection 
          loading={loading}
          label={'Reviews'} 
          onPress={navigateReviews}
          icon={<ReviewsIcon size={28}/>} 
          value={data?.user?.total_reviews}/>
        <ProfileSection 
          loading={loading}
          label={'Media'} 
          onPress={navigateMedia}
          icon={<GalleryIcon size={28}/>} 
          value={data?.user?.total_media}/>
        <ProfileSection      
          label={'Gear'} 
          icon={<TackleBoxIcon size={32}/>} 
          value={'Coming soon'}/>
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