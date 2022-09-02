import React from 'react'
import { StyleSheet, Pressable, View, Image } from 'react-native'
import { Text, Title } from 'react-native-paper'
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
        <Title style={styles.title}>{data.name}</Title>
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
    fontSize: 16,
    fontWeight: '600'
  },
  image: {
    height: '70%',
    width: '100%',
    backgroundColor: 'gray',
    borderRadius: 16
  }
})