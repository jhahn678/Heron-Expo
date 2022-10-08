import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import SearchBar from '../../../components/inputs/SearchBar'
import { FlashList } from '@shopify/flash-list'
import { ExploreStackScreenProps } from '../../../types/navigation'
import { useAutoCompleteSearch } from '../../../hooks/queries/useAutocompleteSearch'
import { useLocationStore } from '../../../store/location/useLocationStore'
import SearchNearby from '../../../components/lists/AutocompleteSearch/SearchNearby'
import AutocompleteResult from '../../../components/lists/AutocompleteSearch/AutocompleteResult'
import SearchInputValue from '../../../components/lists/AutocompleteSearch/SearchInputValue'
import { Card } from 'react-native-paper'
const { width } = Dimensions.get('screen')

const SearchBarScreen = ({ navigation }: ExploreStackScreenProps<'SearchBarScreen'>): JSX.Element => {

  const { latitude, longitude } = useLocationStore()
  const [input, setInput] = useState('')
  const autocomplete = useAutoCompleteSearch({ latitude, longitude, input }) 
  
  return (
    <View style={styles.container}>
      <Card style={[styles.header]}>
        <SearchBar 
          value={input} 
          autofocus={true}
          goBack={navigation.goBack}
          onClear={() => setInput('')}
          setValue={setInput}
          placeholder='Search place or waterbody'
        />
      </Card>
      <FlashList 
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 0,
    width
  },
  content: {
    paddingTop: 16
  }
})