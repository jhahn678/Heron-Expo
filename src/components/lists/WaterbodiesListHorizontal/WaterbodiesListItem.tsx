import React from 'react'
import { StyleSheet, Pressable, View, Image } from 'react-native'
import { Text } from 'react-native-paper'
import { WaterbodyListItem } from '../../../types/Waterbody'



interface Props<T> {
  data: T,
  /** Navigates to waterbody screen */
  navigate: (id: number) => void
}

const WaterbodiesListItem = <T extends WaterbodyListItem>({ data, navigate }: Props<T>) => {
  
  return (
    <Pressable onPress={() => navigate(data.id)}>
      <View style={styles.container}>
        <Image source={{ uri: data.media[0]?.url}} style={styles.image}/>
        <Text style={styles.title}>{data.name}</Text>
        { 
          data.admin_two && data.admin_two.length === 1 ?
              <Text>{data.admin_two[0]}, {data.admin_one[0]}</Text> :
          data.admin_one.length === 1 ?
              <Text>{data.admin_one[0]}, {data.country}</Text> :
          data.admin_one.length > 1 && data.subregion ?
              <Text>{data.subregion} {data.country}</Text> :
          data.admin_one.length > 1 ?
              <Text>{`${data.admin_one[0]} + ${data.admin_one.length - 1} more`}, {data.ccode}</Text> :
              <Text>{data.country}</Text>
        }
        <View style={styles.totals}>
          <Text style={styles.totalsItem}>{data.total_catches} catches logged  &bull;</Text>
          <Text>{data.total_locations} saved locations</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default WaterbodiesListItem

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginTop: 24,
    width: 300,
    marginLeft: '2%'
  },
  title: {
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 4,
    fontWeight: '600'
  },
  image: {
    height: '60%',
    width: '100%',
    backgroundColor: 'gray',
    borderRadius: 12
  },
  totals: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  totalsItem: {
    marginRight: 6
  }
})