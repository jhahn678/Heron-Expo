import React, { useState } from "react";
import { theme } from "../../../config/theme";
import { ActivityIndicator, Text } from 'react-native-paper'
import { Pressable, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MyProfileTabsScreenProps } from "../../../types/navigation";
import { useGetMyContacts } from "../../../hooks/queries/useGetMyContacts";
import { FlashList } from "@shopify/flash-list";
import ContactsListItem from "../../../components/lists/ContactsList/ContactsListItem";

const ContactsTabScreen = ({ navigation }: MyProfileTabsScreenProps<'FriendsTab'>) => {

  const navigateUserSearch = () => {}

  const navigateToUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

  const { data, loading, error, refetch } = useGetMyContacts()

  const [refetching, setRefetching] = useState(false)
  const handleRefetch = () => { setRefetching(true); refetch().then(() => setRefetching(false))}

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.date}>{
          data ? data.me.contacts.length === 1 ? 
          `${data.me.contacts.length} Friend` :
          `${data.me.contacts.length} Friends` :
          <ActivityIndicator color={theme.colors.surfaceVariant}/>
        }</Text>
        <Pressable onPress={navigateUserSearch} style={styles.button}>
            <Text style={styles.edit}>Find Users</Text>
            <Icon name='magnify' color={theme.colors.primary} size={14}/>
        </Pressable>
      </View>
      { data ? 
        <FlashList
          data={data.me.contacts}
          estimatedItemSize={80}
          refreshing={refetching}
          onRefresh={handleRefetch}
          renderItem={({ item }) => (
            <ContactsListItem data={item} navigateUser={navigateToUser(item.id)}/>
          )}
        /> 
      :null}
    </View>
  );
};

export default ContactsTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.secondary
    },
    date: {
        fontWeight: '500',
        color: theme.colors.onSecondary
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: theme.colors.primary,
      borderWidth: 2,
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 6,
      backgroundColor: theme.colors.surfaceVariant,
    },
    edit: {
      marginRight: 4,
      fontWeight: '500',
      color: theme.colors.primary
    },
    list: {
      flex: 1,
      width: '100%'
    }
});
