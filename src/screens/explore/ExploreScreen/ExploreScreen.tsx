import { StyleSheet, ScrollView } from 'react-native'
import { ExploreStackScreenProps } from '../../../types/navigation'
import CategorySection from '../../../components/screens/ExploreScreen/CategorySection'
import HeaderSection from '../../../components/screens/ExploreScreen/HeaderSection'
import NearbySection from '../../../components/screens/ExploreScreen/NearbySection'

const ExploreScreen = ({ navigation }: ExploreStackScreenProps<'ExploreScreen'>) => {

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: '10%'}}>
      <HeaderSection navigation={navigation}/>
      <CategorySection navigation={navigation}/>
      <NearbySection navigation={navigation}/>
      {/* <BrowseContacts/> */}
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