import React from 'react'
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { IContact } from '../../../types/User'

interface Props<T> {
  data: T
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

const ContactsListItem = <T extends IContact>({
   data, onPress, style
}: Props<T>) => {

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      {
        data.avatar ?  
        <Avatar.Image source={{ uri: data.avatar }}/> : 
        <Avatar.Text label={data.fullname.split(' ').map(x => x[0]).join('')}/> 
      }
      <Text style={styles.name}>{data.fullname}</Text>
    </Pressable>
  )
}

export default ContactsListItem

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center'
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6
  }
})