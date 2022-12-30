import { RefreshControl, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BottomTabsScreenProps, MediaSource, ReviewQuery } from '../../../types/navigation'
import { useGetMyProfileTotals } from '../../../hooks/queries/useGetMyProfile'
import ProfileSection from './sections/ProfileSection'
import CatchIcon from '../../../components/icons/CatchIcon'
import DockIcon from '../../../components/icons/DockIcon'
import BookmarksIcon from '../../../components/icons/BookmarksIcon'
import ReviewsIcon from '../../../components/icons/ReviewsIcon'
import GalleryIcon from '../../../components/icons/GalleryIcon'
import TackleBoxIcon from '../../../components/icons/TackleBoxIcon'
import { CatchQuery } from '../../../types/Catch'
import { useAuth } from '../../../store/auth/useAuth'
import { LocationQuery } from '../../../types/Location'
import AvatarSection from './sections/AvatarSection'
import UserDetailsSection from './sections/UserDetailsSection'
import UserFollowsSection from './sections/UserFollowsSection'
import { FollowType } from '../../../types/User'
import HeaderSection from './sections/HeaderSection'
import { theme } from '../../../config/theme'



const MyProfileScreen = ({ navigation }: BottomTabsScreenProps<'MyProfileScreen'>) => {

  const id = useAuth(store => store.id)
  const { data, loading, refetch } = useGetMyProfileTotals()
  
  const [refreshing, setRefreshing] = useState(false)
  const handleRefetch = () => { setRefreshing(true); refetch().then(() => setRefreshing(false)) }

  const navigateCatches = () => {
    if(id) navigation.navigate("CatchListScreen", { 
      id, type: CatchQuery.User, 
      title: 'Your Catches', 
      total: data?.me?.total_catches
  })}

  const navigateLocations = () => {
    if(id) navigation.navigate('LocationListScreen', {
      id, type: LocationQuery.User, 
      title: 'Your Locations', 
      total: data?.me?.total_locations 
  })}

  const navigateSavedLocations = () => {
    if(id) navigation.navigate('LocationListScreen', {
      id, type: LocationQuery.UserSaved, 
      title: 'Saved Locations',
      total: data?.me?.total_saved_locations 
  })}

  const navigateReviews = () => {
    if(id) navigation.navigate('ReviewsScreen', { 
      id, type: ReviewQuery.User, 
      title: 'Your Reviews', 
      total: data?.me.total_reviews 
  })}

  const navigateMedia = () => {
    if(id) navigation.navigate('MediaGridScreen', { 
      id, source: MediaSource.User, 
      title: 'Your Media',
      total: data?.me?.total_media
  })}

  const navigateFollowers = () => {
    if(id) navigation.navigate("ContactsListScreen", { 
      id, type: FollowType.Followers
    })
  }
  const navigateFollowing = () => {
    if(id) navigation.navigate("ContactsListScreen", { 
      id, type: FollowType.Following 
    })
  }
  
  const navigateEditProfile = () => navigation.navigate('EditProfileScreen')

  const navigateImage = () => {
    if(data?.me?.avatar) navigation.navigate('ViewImageScreen', { 
      uri: data.me.avatar, title: "Your avatar" 
    })
  }

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl 
          tintColor={theme.colors.secondaryContainer}
          refreshing={refreshing} 
          onRefresh={handleRefetch}
        />}
    >
      <HeaderSection navigation={navigation}/>
      <AvatarSection 
        data={data?.me}
        loading={loading}
        onPressAvatar={navigateImage}/>
      <UserDetailsSection
        data={data?.me}
        onEditProfile={navigateEditProfile}/>
      <UserFollowsSection  
        totalFollowers={data?.me?.total_followers} 
        totalFollowing={data?.me?.total_following}
        onNavigateFollowers={navigateFollowers}
        onNavigateFollowing={navigateFollowing}/>
      <ProfileSection 
        loading={loading}
        label={'Catches'} 
        onPress={navigateCatches}
        icon={<CatchIcon size={32}/>} 
        value={data?.me.total_catches}
        style={{ marginTop: 16 }}
      />
      <ProfileSection 
        loading={loading}
        label={'Locations'} 
        onPress={navigateLocations}
        icon={<DockIcon size={32}/>} 
        value={data?.me.total_locations}
      />
      <ProfileSection 
        loading={loading}
        label={'Saved Locations'} 
        onPress={navigateSavedLocations}
        icon={<BookmarksIcon size={28}/>} 
        value={data?.me.total_saved_locations}
      />
      <ProfileSection 
        loading={loading}
        label={'Reviews'} 
        onPress={navigateReviews}
        icon={<ReviewsIcon size={28}/>} 
        value={data?.me.total_reviews}
      />
      <ProfileSection 
        loading={loading}
        label={'Media'} 
        onPress={navigateMedia}
        icon={<GalleryIcon size={28}/>} 
        value={data?.me.total_media}
      />
      <ProfileSection      
        label={'Gear'} 
        icon={<TackleBoxIcon size={32}/>} 
        value={'Coming soon'}
      />
    </ScrollView>
  )
}

export default MyProfileScreen;
