import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { TouchableRipple, Text, Card } from "react-native-paper";
import dayjs from "../../../config/dayjs";
import { GetLocationsRes } from "../../../hooks/queries/useGetLocations";
import { ShareType } from "../../../hooks/utils/useShareContent";
import Avatar from "../../users/Avatar";
import ShareButton from "../../buttons/ShareButton";
import SaveLocationButton from "../../buttons/SaveLocationButton";
import LikeButton, { LikeType } from "../../buttons/LikeButton";
import { theme } from "../../../config/theme";

interface Props {
    data: GetLocationsRes['locations'][number],
    navigateToUser: () => void
    navigateToWaterbody: () => void
    navigateToMap: () => void
}

const LocationListItem = ({ data, navigateToUser, navigateToMap }: Props) => {

    return (
      <Card style={styles.container}>
        <Pressable onPress={navigateToMap}>
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

          <Text style={styles.near} numberOfLines={1}>
            {data.waterbody.name}
            {"  "}&bull;{"  "}
            {data.nearest_place}
          </Text>

          { Boolean(data.media.length || data.map_image) &&
            <Image 
              style={styles.image} 
              source={{ uri: 
                data.media.length > 0 ? 
                data.media[0].url : 
                data.map_image ? 
                data.map_image.url :
                undefined
              }}
            />
          }

          {data.total_favorites > 0 ? (
            data.total_favorites === 1 ? (
              <Text style={styles.favorites}>
                {data.total_favorites} Person Recommends This Spot
              </Text>
            ) : (
              <Text style={styles.favorites}>
                {data.total_favorites} People Recommend This Spot
              </Text>
            )
          ) : null}
        </Pressable>
        <View style={styles.footer}>
          <View style={styles.footerButton}>
            <ShareButton
              shareType={ShareType.Location}
              id={data.id}
              mode="none"
            />
          </View>
          <View style={styles.footerButtonCenter}>
            <SaveLocationButton
              id={data?.id}
              active={data?.is_saved}
              style={styles.footerButton}
            />
          </View>
          <View style={styles.footerButton}>
            <LikeButton
              type={LikeType.Location}
              active={data?.is_favorited}
              id={data?.id}
            />
          </View>
        </View>
      </Card>
    );
};

export default LocationListItem;

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
    padding: 12,
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
  near: {
    paddingHorizontal: 12,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '500'
  },
  title: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 6,
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: theme.colors.secondaryContainer
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
  favorites: {
    fontWeight: "500",
    fontSize: 12,
    alignSelf: "flex-end",
    marginRight: 12,
    marginVertical: 8,
  },
});

