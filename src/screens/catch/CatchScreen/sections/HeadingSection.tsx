import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";
import LikeButton, { LikeType } from "../../../../components/buttons/LikeButton";
import ShareButton from "../../../../components/buttons/ShareButton";
import Avatar from "../../../../components/users/Avatar";
import dayjs from "../../../../config/dayjs";
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { GetCatchRes } from "../../../../hooks/queries/useGetCatch";
import { ShareType } from "../../../../hooks/utils/useShareContent";
import { RootStackScreenProps } from "../../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
  navigation: RootStackScreenProps<"ViewCatchScreen">["navigation"];
  data: GetCatchRes["catch"] | undefined
}

const HeadingSection = ({ navigation, data }: Props) => {
    
    const navigateToWaterbody = () => {
        if(!data) return;
        navigation.navigate('MainTabs', {
            screen: "ExploreStack",
            params: {
                screen: 'WaterbodyScreen',
                params: { id: data.waterbody.id }
            }
        })
    }

    const navigateToUser = () => {
        if(!data) return;
        navigation.navigate('UserProfileScreen', { id: data.user.id })
    }
    
    return (
      <View style={styles.container}>
        <Title style={styles.title}>{data?.title || "Untitled Catch"}</Title>
        <Pressable style={globalStyles.baseline} onPress={navigateToWaterbody}>
          <Text style={styles.at}>at</Text>
          <Text style={styles.place} numberOfLines={1}>
            {data?.waterbody.name}
          </Text>
        </Pressable>
        <View style={styles.user}>
          <Avatar
            size={28}
            fullname={data?.user.fullname}
            uri={data?.user.avatar}
            onPress={navigateToUser}
          />
          <Text style={styles.name}>{data?.user.fullname}</Text>
          <View style={styles.divider} />
          <Text style={styles.created}>
            Logged {dayjs(data?.created_at).fromNow()}
          </Text>
        </View>
        {data && data.total_favorites > 0 &&
          <Text style={styles.likes}>
            {
              data.total_favorites > 1 ? 
              `${data.total_favorites} People Have Liked This Catch`:
              `1 Person Has Liked This Catch`
            }
          </Text>
        }
        <View style={styles.actionbar}>
          <LikeButton active={false} id={data?.id} type={LikeType.Catch} />
          <View style={styles.bardivider}/>
          <Icon name="map" size={24} color={theme.colors.primary} />
          <View style={styles.bardivider} />
          <ShareButton shareType={ShareType.Catch} id={data?.id} mode="none" />
        </View>
      </View>
    );
};

export default HeadingSection;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    paddingHorizontal: 16,
    fontWeight: "600",
    fontSize: 28,
  },
  at: {
    paddingHorizontal: 16,
    fontSize: 20,
    paddingRight: 6,
  },
  place: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "500",
  },
  user: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24
  },
  name: {
    fontWeight: "500",
    paddingLeft: 6,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  created: {
    fontWeight: "500",
    fontSize: 12
  },
  likes: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontSize: 12,
    fontWeight: '500'
  },
  actionbar: {
    width: '100%',
    height: 50,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.surfaceVariant
  },
  bardivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(0,0,0,.2)',
    marginHorizontal: 16,
  }
});