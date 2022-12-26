import { useEffect, useRef, useState } from "react";
import { theme } from "../../../config/theme";
import { Chip, Text } from 'react-native-paper'
import { Dimensions, StyleSheet, View, Animated, Easing } from "react-native";
import { MyProfileTabsScreenProps } from "../../../types/navigation";
import { GetMyFollowing, useGetMyFollowing } from "../../../hooks/queries/useGetUserFollowing";
import { useGetMyTotalFollows } from "../../../hooks/queries/useGetTotalFollows";
import { FlashList } from "@shopify/flash-list";
import ContactsListItem from "../../../components/lists/ContactsList/ContactsListItem";
import globalStyles from "../../../globalStyles";
import { GetMyFollowers, useGetMyFollowers } from "../../../hooks/queries/useGetUserFollowers";
import { FollowType } from "../../../types/User";
import PromptAddFriendsCard from "../../../components/cards/PromptAddFriendsCard";
const { width } = Dimensions.get('screen')
const limit = 20;

const ContactsTabScreen = ({ navigation }: MyProfileTabsScreenProps<'FriendsTab'>) => {

  const scaleFollowing = useRef(new Animated.Value(1)).current
  const scaleFollowers = useRef(new Animated.Value(1)).current

  const [followType, setFollowType] = useState(FollowType.Following)

  useEffect(() => {
    Animated.timing(scaleFollowers, { 
      useNativeDriver: true,
      toValue: followType === FollowType.Followers ? 1.1 : 1, 
      duration: 100,
      easing: Easing.ease
    }).start()
    Animated.timing(scaleFollowing, { 
      useNativeDriver: true,
      toValue: followType === FollowType.Following ? 1.1 : 1, 
      duration: 100,
      easing: Easing.ease
    }).start()
  },[followType])

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
          <Animated.View style={{ marginRight: 12, transform: [{ scale: scaleFollowing }]}}>
            <Chip
            icon='account-multiple'
            onPress={() => setFollowType(FollowType.Following)}
            selectedColor={followType === FollowType.Following ? theme.colors.primary : undefined}
            >{`Following`}</Chip>
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: scaleFollowers }]}}>
            <Chip
            icon='account-multiple-outline' 
            onPress={() => setFollowType(FollowType.Followers)} 
            selectedColor={followType === FollowType.Followers ? theme.colors.primary : undefined}
            >{`Followers`}</Chip>
          </Animated.View>
        </View>
        <Chip 
          mode='outlined'
          style={styles.search}
          onPress={navigateUserSearch}
          icon='magnify'
        >{`Search`}</Chip>
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
        : <PromptAddFriendsCard containerStyle={styles.prompt}/>
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
    width,
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
  },
  search: {
    backgroundColor: theme.colors.secondaryContainer,
    borderColor: theme.colors.primary,
    borderWidth: 2
  },
  prompt: {
    margin: 12
  }
});
