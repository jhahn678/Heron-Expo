import { StyleSheet, View } from 'react-native'
import { ExploreStackScreenProps } from '../../../types/navigation'
import CategorySection from '../../../components/screens/ExploreScreen/CategorySection'
import HeaderSection from '../../../components/screens/ExploreScreen/HeaderSection'
import NearbySection from '../../../components/screens/ExploreScreen/NearbySection'

const ExploreScreen = ({ navigation }: ExploreStackScreenProps<'ExploreScreen'>) => {

  return (
    <View style={styles.container}>
      <HeaderSection navigation={navigation}/>
      <CategorySection navigation={navigation}/>
      <NearbySection navigation={navigation}/>
      {/* <BrowseContacts/> */}
      {/* <ContactsActivity/> */}
      {/* <LakesNearby/> */}
      {/* <RiversNearby/> */}
    </View>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '6%',
  }
})