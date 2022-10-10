import React from 'react'
import { ScrollView, View } from 'react-native'
import { ExploreStackScreenProps } from '../../../types/navigation'
import CategorySection from './sections/CategorySection'
import HeaderSection from './sections/HeaderSection'
import NearbySection from './sections/NearbySection'
import ContactsSection from './sections/ContactsSection'
import ContactsActivity from './sections/ContactsActivity'
import { useAuth } from '../../../store/auth/useAuth'
import NearbyCategorySection from './sections/NearbyCategorySection'
import { useLocationStore } from '../../../store/location/useLocationStore'

const ExploreScreen = ({ navigation }: ExploreStackScreenProps<'ExploreScreen'>) => {

  const isAuthenticated = useAuth(state => state.isAuthenticated)
  const { hasCoordinates } = useLocationStore()
  
  return (
      <ScrollView contentContainerStyle={{ paddingBottom: '10%'}}>
        <HeaderSection navigation={navigation}/>
        <CategorySection navigation={navigation}/>
        <NearbySection navigation={navigation}/>
        <ContactsSection navigation={navigation}/>
        { isAuthenticated && <ContactsActivity navigation={navigation}/> }
        { hasCoordinates &&
          <>
            <NearbyCategorySection navigation={navigation} classification='lake'/>
            <NearbyCategorySection navigation={navigation} classification='river'/>
          </>
        }
      </ScrollView>
  )
}

export default ExploreScreen