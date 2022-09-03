import React from 'react'
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { IContact } from '../../../types/User'
import Avatar from '../../users/Avatar'

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
      <Avatar onPress={onPress} uri={data.avatar} fullname={data.fullname}/>
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