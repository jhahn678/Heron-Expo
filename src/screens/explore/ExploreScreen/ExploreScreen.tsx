import { StyleSheet, ScrollView } from 'react-native'
import { ExploreStackScreenProps } from '../../../types/navigation'
import CategorySection from './sections/CategorySection'
import HeaderSection from './sections/HeaderSection'
import NearbySection from './sections/NearbySection'
import ContactsSection from './sections/ContactsSection'
import ContactsActivity from './sections/ContactsActivity'
import { useAuth } from '../../../store/auth/useAuth'

const ExploreScreen = ({ navigation }: ExploreStackScreenProps<'ExploreScreen'>) => {

  const isAuthenticated = useAuth(state => state.isAuthenticated)
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: '10%'}}>
      <HeaderSection navigation={navigation}/>
      <CategorySection navigation={navigation}/>
      <NearbySection navigation={navigation}/>
      <ContactsSection navigation={navigation}/>
      { !isAuthenticated && <ContactsActivity navigation={navigation}/> }
      {/* <LakesNearby/> */}
      {/* <RiversNearby/> */}
    </ScrollView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {

  }
})