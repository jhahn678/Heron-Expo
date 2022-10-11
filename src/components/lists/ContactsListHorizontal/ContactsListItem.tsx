import React from 'react'
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native'
import { Card, Text } from 'react-native-paper'
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
    <Card onPress={onPress} style={[styles.container, style]} elevation={0}>
      <Card.Content style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Avatar onPress={onPress} uri={data.avatar} fullname={data.fullname} size={78}/>
        <Text style={styles.name}>{data.fullname}</Text>
      </Card.Content>
    </Card>
  )
}

export default ContactsListItem

const styles = StyleSheet.create({
  container: {
    height: 152,
    width: 124,
    borderRadius: 12
  },
  name: {
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center'
  }
})