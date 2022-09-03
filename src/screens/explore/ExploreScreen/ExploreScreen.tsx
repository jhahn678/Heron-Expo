import { StyleSheet, ScrollView } from 'react-native'
import { ExploreStackScreenProps } from '../../../types/navigation'
import CategorySection from './sections/CategorySection'
import HeaderSection from './sections/HeaderSection'
import NearbySection from './sections/NearbySection'
import ContactsSection from './sections/ContactsSection'

const ExploreScreen = ({ navigation }: ExploreStackScreenProps<'ExploreScreen'>) => {
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: '10%'}}>
      <HeaderSection navigation={navigation}/>
      <CategorySection navigation={navigation}/>
      <NearbySection navigation={navigation}/>
      <ContactsSection navigation={navigation}/>
      {/* <ContactsActivity/> */}
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