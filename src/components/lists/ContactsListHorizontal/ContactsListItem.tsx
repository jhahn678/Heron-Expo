import React from 'react'
import { StyleSheet, Pressable, StyleProp, ViewStyle, View } from 'react-native'
import { Button, Card, Text, Title } from 'react-native-paper'
import { theme } from '../../../config/theme'
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
      <View style={{ alignItems: 'center' }}>
        <Avatar onPress={onPress} uri={data.avatar} fullname={data.fullname} size={90}/>
        <Title style={styles.name} numberOfLines={2}>{data.fullname}</Title>
      </View>
      <Button 
        onPress={onPress} 
        mode='contained' 
        theme={{ roundness: 2 }}
        labelStyle={{ marginTop: 6, fontSize: 12 }}
        style={{ height: 34 }}
      >View Profile</Button>
    </Pressable>
  )
}

export default ContactsListItem

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginRight: 12,
    height: 230,
    width: 170,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: theme.colors.surfaceVariant,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center'
  }
})