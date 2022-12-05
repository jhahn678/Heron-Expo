import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { AutocompleteResult as IAutocompleteResult } from '../../../hooks/queries/useAutocompleteSearch'
import { ExploreStackScreenProps } from '../../../types/navigation'
import { useSearchParamStore } from '../../../store/search/useSearchParamStore'
import FAIcon from 'react-native-vector-icons/FontAwesome5'//'water'
import MCIcon from 'react-native-vector-icons/MaterialIcons' //'park'
import IonIcon from 'react-native-vector-icons/Ionicons' // 'flag-outline'
import { waterbodyLocationLabel } from '../../../utils/conversions/waterbodyLocationToLabel'
import { Card } from 'react-native-paper'
import { autocompleteResultColor } from '../../../utils/conversions/autocompleteResultColor'
const { width } = Dimensions.get('screen')

interface Props {
  data: IAutocompleteResult,
  navigation: ExploreStackScreenProps<'SearchBarScreen'>['navigation']
}

const AutocompleteResult = ({ data, navigation }: Props) => {

  const setGeoplace = useSearchParamStore(state => state.setGeoplace)

  const handleNavigate = (data: IAutocompleteResult) => () => {
    if(data.type === 'GEOPLACE'){
      setGeoplace(data)
      navigation.navigate('SearchResultsScreen')
    }else{
      navigation.navigate('WaterbodyScreen', { id: data.id })
    }
  }


  return (
    <Card
      style={[styles.container, { backgroundColor: autocompleteResultColor(data) }]} 
      onPress={handleNavigate(data)}
    >
      <Card.Content style={styles.content}>
      { 
        data.type === 'GEOPLACE' ? 
        data.fcode === 'PRK' ?
          <MCIcon name='park' size={32}/> :
          <IonIcon name='flag-outline' size={32}/> :
          <FAIcon name='water' size={32}/>
      }
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1}>{data.name}</Text>
        <Text style={styles.location}>
        { data.type === 'WATERBODY' ? (
            waterbodyLocationLabel(data)
          ):(
            data.admin_one && data.admin_two ?
              `${data.admin_two}, ${data.admin_one}` :
              `${data.admin_one}, ${data.country}`          
          )
        }
        </Text>
      </View>
      </Card.Content>
    </Card>
  )
}

export default AutocompleteResult

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width - 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,.05)',
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 12
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    marginLeft: 16
  },
  name: {
    fontSize: 20,
    maxWidth: width * .72,
    fontWeight: '500'
  },
  location: {
    marginTop: 2
  }
})