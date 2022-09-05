import { StyleSheet, Text, Pressable, View } from 'react-native'
import React, { useState } from 'react'
import { AutocompleteResult as IAutocompleteResult } from '../../../hooks/queries/useAutocompleteSearch'
import { ExploreStackScreenProps } from '../../../types/navigation'
import { useSearchParamStore } from '../../../store/search/useSearchParamStore'
import { AutocompleteGeoplace } from '../../../types/Geoplace'
import FAIcon from 'react-native-vector-icons/FontAwesome5'//'water'
import MCIcon from 'react-native-vector-icons/MaterialIcons' //'park'
import IonIcon from 'react-native-vector-icons/Ionicons' // 'flag-outline'
import { Title } from 'react-native-paper'


interface Props {
  data: IAutocompleteResult,
  navigation: ExploreStackScreenProps<'SearchBarScreen'>['navigation']
}

const AutocompleteResult = ({ data, navigation }: Props) => {

  const setGeoplace = useSearchParamStore(state => state.setGeoplace)
  
  const handleNavigateWaterbody = (id: number) => navigation.navigate('WaterbodyScreen', { id })
  const handleNavigateToResults = (geoplace: AutocompleteGeoplace) => {
    setGeoplace(geoplace)
    navigation.navigate('SearchResultsScreen')
  }


  return (
    <Pressable 
      style={[styles.container, { 
        backgroundColor: 
          data.type === 'GEOPLACE' ? 
          data.fcode === 'PRK' ?  
          'rgb(200, 223, 194)' : 
          'rgb(226, 213, 233)' : 
          'rgb(188, 207, 219)'
      }]} 
      onPress={
        data.type === 'GEOPLACE' ? 
        () => handleNavigateToResults(data) : 
        () => handleNavigateWaterbody(data.id)
      }
    >
      { 
        data.type === 'GEOPLACE' ? 
        data.fcode === 'PRK' ?
          <MCIcon name='park' size={32}/> :
          <IonIcon name='flag-outline' size={32}/> :
          <FAIcon name='water' size={32}/>
      }
      <View style={styles.text}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.location}>
        { data.type === 'WATERBODY' ? (
            data.admin_two && data.admin_two.length === 1 ?
                `${data.admin_two[0]}, ${data.admin_one[0]}` :
            data.admin_one.length === 1 ?
                `${data.admin_one[0]}, ${data.country}` :
            data.admin_one.length > 1 && data.subregion ?
                `${data.subregion} ${data.country}` :
            data.admin_one.length > 1 ?
                `${data.admin_one[0]} + ${data.admin_one.length - 1} more, ${data.ccode}` :
                `${data.country}`
          ) : (
            data.admin_one && data.admin_two ?
              `${data.admin_two}, ${data.admin_one}` :
              `${data.admin_one}, ${data.country}`          
          )
        }
        </Text>
      </View>
    </Pressable>
  )
}

export default AutocompleteResult

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.05)',
    marginBottom: 8,
    paddingLeft: 24,
    borderRadius: 12
  },
  text: {
    justifyContent: 'center',
    marginLeft: 16
  },
  name: {
    fontSize: 20,
    fontWeight: '500'
  },
  location: {
    marginTop: 2
  }
})