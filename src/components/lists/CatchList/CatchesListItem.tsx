import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text, TouchableRipple } from 'react-native-paper'
import { GetCatchesRes } from "../../../hooks/queries/useGetCatches";
import Avatar from "../../users/Avatar";
import dayjs from '../../../config/dayjs'
import { ShareType } from "../../../hooks/utils/useShareContent";
import ShareButton from "../../buttons/ShareButton";
import LikeButton, { LikeType } from "../../buttons/LikeButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from "../../../config/theme";

interface Props {
    data: GetCatchesRes['catches'][number]
    navigateToUser: () => void
    navigateToMap: () => void,
    navigateToCatch: () => void
}

const CatchesListItem = ({ 
    data, 
    navigateToUser, 
    navigateToCatch,
    navigateToMap
}: Props) => {
    
    return (
      <View style={styles.container}>
        <Pressable onPress={navigateToCatch}>
          <View style={styles.header}>
            <TouchableRipple onPress={navigateToUser}>
              <View style={styles.user}>
                <Avatar
                  size={40}
                  fullname={data.user.fullname}
                  uri={data.user.avatar}
                  onPress={navigateToUser}
                />
                <View style={{ paddingLeft: 12 }}>
                  <Text style={styles.name}>{data.user.fullname}</Text>
                  <Text style={styles.date}>
                    {dayjs(data.created_at).fromNow()}
                  </Text>
                </View>
              </View>
            </TouchableRipple>
          </View>

          {data.title && (
            <Text style={styles.title} numberOfLines={1}>
              {data.title}
            </Text>
          )}

          <Text style={styles.details} numberOfLines={1}>
            {data.waterbody.name}
            {data.species && `  \u2022  ${data.species}`}
            {data.length && `  \u2022  ${data.length} in`}
            {data.weight && `  \u2022  ${data.weight} oz`}
          </Text>

          {data.media.length > 0 && (
            <Image
              source={{ uri: data.media[0]?.url }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </Pressable>
        <View style={styles.footer}>
          <View style={styles.footerButton}>
            <ShareButton shareType={ShareType.Catch} id={data.id} mode="none"/>
          </View>
          {data.geom ?
            <Pressable style={styles.footerButtonCenter} onPress={navigateToMap}>
              <Icon
                name="map"
                size={24}
                color={theme.colors.primary}
                style={styles.footerButton}
              />
            </Pressable>
            : <View style={{ width: 1, backgroundColor: '#e0e0e0' }}/>
          }
          <View style={styles.footerButton}>
            <LikeButton
              type={LikeType.Catch}
              active={data.is_favorited}
              id={data.id}
            />
          </View>
        </View>
      </View>
    );
};

export default CatchesListItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: "white",
    marginBottom: 24,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
  },
  title: {
    paddingHorizontal: 12,
    paddingTop: 6,
    fontSize: 16,
    fontWeight: "600",
  },
  details: {
    fontWeight: "500",
    fontSize: 12,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: '#e0e0e0'
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 12
  },
  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0,0,0,.1)",
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
