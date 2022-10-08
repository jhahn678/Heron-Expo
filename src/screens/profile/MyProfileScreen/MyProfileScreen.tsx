import { RefreshControl, ScrollView, } from 'react-native'
import React, { useState } from 'react'
import { MediaSource, MyProfileTabsScreenProps, ReviewQuery } from '../../../types/navigation'
import BioSection from './sections/BioSection'
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


const MyProfileScreen = ({ navigation }: MyProfileTabsScreenProps<'ProfileTab'>) => {

  const { id } = useAuth()
  const { data, loading, error, refetch } = useGetMyProfileTotals()
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
      id, type: ReviewQuery.User, title: 'Your Reviews', total: data?.me.total_reviews 
  })}

  const navigateMedia = () => {
    if(id) navigation.navigate('MediaGridScreen', { 
      source: MediaSource.User, id, title: 'Your Media'
  })}
  
  const navigateEdit = () => navigation.navigate('EditProfileScreen')

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefetch}/>}
    >
      <BioSection 
        bio={data?.me.bio} 
        createdAt={data?.me.created_at}
        navigateToEdit={navigateEdit}
      />
      <ProfileSection 
        loading={loading}
        label={'Catches'} 
        onPress={navigateCatches}
        icon={<CatchIcon size={32}/>} 
        value={data?.me.total_catches}
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

export default MyProfileScreen
