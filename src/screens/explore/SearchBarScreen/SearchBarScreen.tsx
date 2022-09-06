import React, { useRef, useState } from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import SearchBar from '../../../components/inputs/SearchBar'
import { FlashList } from '@shopify/flash-list'
import { ExploreStackScreenProps } from '../../../types/navigation'
import { useAutoCompleteSearch } from '../../../hooks/queries/useAutocompleteSearch'
import { useLocationStore } from '../../../store/location/useLocationStore'
import SearchNearby from '../../../components/lists/AutocompleteSearch/SearchNearby'
import AutocompleteResult from '../../../components/lists/AutocompleteSearch/AutocompleteResult'
import SearchInputValue from '../../../components/lists/AutocompleteSearch/SearchInputValue'

const SearchBarScreen = ({ navigation }: ExploreStackScreenProps<'SearchBarScreen'>): JSX.Element => {

  const { width } = Dimensions.get('screen')
  const { latitude, longitude } = useLocationStore()
  const [input, setInput] = useState('')
  const autocomplete = useAutoCompleteSearch({ latitude, longitude, input }) 
  
  return (
    <View style={styles.container}>
      <View style={[styles.header, { width: width * .94 }]}>
        <SearchBar 
          
          value={input} 
          autofocus={true}
          goBack={navigation.goBack}
          setValue={setInput}
          placeholder='Search place or waterbody'
          style={{ marginLeft: 8, width: (width*.9)}}
        />
      </View>
      <FlashList 
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        data={autocomplete.results} 
        keyboardShouldPersistTaps='handled'
        ListHeaderComponent={() => <SearchNearby navigation={navigation}/>}
        renderItem={({ item }) => (
          <AutocompleteResult 
            navigation={navigation} 
            data={item} key={item.id}
          />
        )}
        ListFooterComponent={
          input.length > 0 ? () => (
            <SearchInputValue 
              navigation={navigation} 
              value={input}
            /> 
        ): null}
      />
    </View>
  )
}

export default SearchBarScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  header: {
    alignSelf: 'center',
    paddingTop: 64,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  }
})