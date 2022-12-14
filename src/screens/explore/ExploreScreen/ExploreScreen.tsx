import React from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { ExploreStackScreenProps } from '../../../types/navigation'
import CategorySection from './sections/CategorySection'
import HeaderSection from './sections/HeaderSection'
import NearbyWaterbodiesSection from './sections/NearbyWaterbodiesSection'
import ContactsSection from './sections/ContactsSection'
import ContactsActivity from './sections/ContactsActivity'
import { useAuth } from '../../../store/auth/useAuth'
import NearbyCategorySection from './sections/NearbyCategorySection'
import { useLocationStore } from '../../../store/location/useLocationStore'
import NearbyCatchesSection from './sections/NearbyCatchesSection'
const { height } = Dimensions.get('screen')

const ExploreScreen = ({ navigation }: ExploreStackScreenProps<'ExploreScreen'>) => {

  const isAuthenticated = useAuth(state => state.isAuthenticated)
  const { hasCoordinates } = useLocationStore()
  
  return (
      <ScrollView contentContainerStyle={{ paddingBottom: height * .05 }}>
        <HeaderSection navigation={navigation}/>
        <CategorySection navigation={navigation}/>
        <NearbyWaterbodiesSection navigation={navigation}/>
        <ContactsSection navigation={navigation}/>
        { isAuthenticated && <ContactsActivity navigation={navigation}/> }
        { hasCoordinates &&
          <>
            <NearbyCatchesSection navigation={navigation}/>
            <NearbyCategorySection navigation={navigation} classification='lake'/>
            <NearbyCategorySection navigation={navigation} classification='river'/>
          </>
        }
      </ScrollView>
  )
}

export default ExploreScreen