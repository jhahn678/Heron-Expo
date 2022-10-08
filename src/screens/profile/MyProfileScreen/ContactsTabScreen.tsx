import React, { useEffect, useState } from "react";
import { theme } from "../../../config/theme";
import { Text, TouchableRipple } from 'react-native-paper'
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MyProfileTabsScreenProps } from "../../../types/navigation";
import { GetMyFollowing, useGetMyFollowing } from "../../../hooks/queries/useGetUserFollowing";
import { useGetMyTotalFollows } from "../../../hooks/queries/useGetTotalFollows";
import { FlashList } from "@shopify/flash-list";
import ContactsListItem from "../../../components/lists/ContactsList/ContactsListItem";
import globalStyles from "../../../globalStyles";
import { GetMyFollowers, useGetMyFollowers } from "../../../hooks/queries/useGetUserFollowers";
import FindUsers from "./sections/FindUsers";
import { FollowType } from "../../../types/User";

const limit = 20;

const ContactsTabScreen = ({ navigation }: MyProfileTabsScreenProps<'FriendsTab'>) => {

  const [followType, setFollowType] = useState(FollowType.Following)

  const [data, setData] = useState<GetMyFollowing['me']['following'] | GetMyFollowers['me']['followers']>([])

  const navigateUserSearch = () => navigation.navigate('UserSearchScreen')
  const navigateToUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

  const following = useGetMyFollowing({ limit, skip: followType !== FollowType.Following })
  const followers = useGetMyFollowers({ limit, skip: followType !== FollowType.Followers })
  const totals = useGetMyTotalFollows()

  useEffect(() => {
    switch(followType){
      case FollowType.Following:
        if(following.data){
          setData(following.data.me.following);
        }
      case FollowType.Followers:
        if(followers.data){
          setData(followers.data.me.followers);
        }
    }
  }, [followers.data, following.data])

  const [refetching, setRefetching] = useState(false)

  const handleRefetch = async () => { 
    setRefetching(true)
    if(followType === FollowType.Followers) await followers.refetch()
    if(followType === FollowType.Following) await following.refetch()
    setRefetching(false)
  }

  const handleFetchMore = async () => {
    if(!totals.data) return;
    switch(followType){
      case FollowType.Followers:
        if(data.length === totals.data.me.total_followers) return;
        await followers.fetchMore({ variables: { offset: data.length }})
      case FollowType.Following:
        if(data.length === totals.data.me.total_following) return;
        await following.fetchMore({ variables: { offset: data.length }})
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={globalStyles.frac}>
          <TouchableRipple 
            onPress={() => setFollowType(FollowType.Following)} 
            style={
              followType === FollowType.Following ? 
              [styles.active, styles.margin] : 
              [styles.button, styles.margin]}>
              <Text style={styles.edit}>Following</Text>
          </TouchableRipple>
          <TouchableRipple 
            onPress={() => setFollowType(FollowType.Followers)} 
            style={followType === FollowType.Followers ? styles.active : styles.button}>
              <Text style={styles.edit}>Followers</Text>
          </TouchableRipple>
        </View>
         <TouchableRipple onPress={navigateUserSearch} style={styles.button}>
          <View style={globalStyles.frac}>
            <Text style={styles.edit}>Search Users</Text>
            <Icon name='magnify' color={theme.colors.primary} size={18}/>
          </View>
        </TouchableRipple>
      </View>
      { data ? 
        data.length > 0 ?
          <FlashList
            data={data}
            estimatedItemSize={80}
            refreshing={refetching}
            onRefresh={handleRefetch}
            onEndReachedThreshold={.3}
            onEndReached={handleFetchMore}
            renderItem={({ item }) => (
              <ContactsListItem data={item} navigateUser={navigateToUser(item.id)}/>
            )}
          /> 
        : <FindUsers navigateUserSearch={navigateUserSearch}/>
        : (following.loading || followers.loading) ?
          <Text>Failed to load users</Text>
        : (following.error || followers.error) ?
          <Text>Failed to load users</Text>
        : null
      }
    </View>
  );
};

export default ContactsTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.secondary
  },
  date: {
    fontWeight: '500',
    color: theme.colors.onSecondary
  },
  edit: {
    marginRight: 4,
    fontWeight: '500',
    color: theme.colors.primary
  },
  list: {
    flex: 1,
    width: '100%'
  },
  button: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceVariant,
  },
  active: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.secondaryContainer,
  },
  margin: {
    marginRight: 8 
  }
});
