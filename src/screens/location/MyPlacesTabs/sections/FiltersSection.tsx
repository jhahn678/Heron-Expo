import { gql, useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Chip } from 'react-native-paper'
import { useMyLocationsModalStore } from "../../../../store/modal/useMyLocationsModalStore";
import { dateRangeToLabel } from "../../../../utils/conversions/dateRangeToLabel";
import { locationSortToLabel } from "../../../../utils/conversions/locationSortToLabel";
import { privacyToLabel } from "../../../../utils/conversions/privacyToLabel";

const WATERBODY_NAME = gql`
    fragment WaterbodyName on Waterbody{
        name
    }
`

const FiltersSection = () => {

  const cache = useApolloClient()
  
  const sort = useMyLocationsModalStore(store => store.sort)
  const minDate = useMyLocationsModalStore(store => store.minDate)
  const maxDate = useMyLocationsModalStore(store => store.maxDate)
  const privacy = useMyLocationsModalStore(store => store.privacy)
  const waterbody = useMyLocationsModalStore(store => store.waterbody)
  const setSortVisible = useMyLocationsModalStore(store => store.setSortVisible)
  const setDateVisible = useMyLocationsModalStore(store => store.setDateVisible)
  const setWaterbodyVisible = useMyLocationsModalStore(store => store.setWaterbodyVisible)
  const setPrivacyVisible = useMyLocationsModalStore(store => store.setPrivacyVisible)

  const [dateLabel, setDateLabel] = useState('Date')
  useEffect(() => setDateLabel(dateRangeToLabel(minDate, maxDate)),[minDate, maxDate])
  const [privacyLabel, setPrivacyLabel] = useState('Privacy')
  useEffect(() => setPrivacyLabel(privacy ? privacyToLabel(privacy) : 'Privacy'),[privacy])
  const [sortLabel, setSortLabel] = useState('Sort')
  useEffect(() => setSortLabel(sort ? locationSortToLabel(sort) : 'Sort'),[sort])
  const [waterbodyLabel, setWaterbodyLabel] = useState('Waterbody')
  useEffect(() => {
    if(!waterbody) return setWaterbodyLabel('Waterbody')
    const names = waterbody.map(x => {
        return cache.readFragment({
            id: `Waterbody:${x}`,
            fragment: WATERBODY_NAME
        }).name;
    })
    setWaterbodyLabel(names.join(', '))
  }, [waterbody])

  return (
      <ScrollView 
      horizontal 
      style={{ flexGrow: 0 }}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      >
        <Chip 
          onPress={setDateVisible} 
          style={styles.chip} 
          icon='calendar-range'
        >{dateLabel}</Chip>
        <Chip 
          onPress={setWaterbodyVisible} 
          style={styles.chip} 
          icon='map-marker'
        >{waterbodyLabel}</Chip>
        <Chip 
          onPress={setPrivacyVisible} 
          style={styles.chip} 
          icon='share-variant'
        >{privacyLabel}</Chip>
        <Chip 
          onPress={setSortVisible} 
          style={styles.chip} 
          icon='sort-variant'
        >{sortLabel}</Chip>
      </ScrollView>
  );
};

export default FiltersSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 24,
    paddingLeft: 16,
    paddingRight: 4
  },
  chip: {
    height: 40,
    marginRight: 12,
    marginBottom: 0
  }
});
