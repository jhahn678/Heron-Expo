import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import dayjs from "../../../config/dayjs";
import { GetLocationsRes } from "../../../hooks/queries/useGetLocations";
import { ShareType, useShareContent } from "../../../hooks/utils/useShareContent";
import Avatar from "../../users/Avatar";
import Icon from 'react-native-vector-icons/FontAwesome'
import ShareButton from "../../buttons/ShareButton";
import SaveLocationButton from "../../buttons/SaveLocationButton";
import RecommendLocationButton from "../../buttons/RecommendLocationButton";

interface Props {
    data: GetLocationsRes['locations'][number],
    navigateToUser: () => void
    navigateToWaterbody: () => void
    navigateToMap: () => void
}

const LocationListItem = ({ data, navigateToUser, navigateToMap }: Props) => {

    return (
      <View style={styles.container}>
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

        {<Text style={styles.title}>One of the best spots on the Swatara</Text>}
        <Pressable onPress={navigateToMap}>
          <Image style={styles.image} source={{ uri: data.media[0]?.url }} />
        </Pressable>

        {data.total_favorites > 0 ? data.total_favorites === 1 ? (
          <Text style={styles.favorites}>
            {data.total_favorites} Person Recommends This Spot
          </Text>
        ) : (
          <Text style={styles.favorites}>
            {data.total_favorites} People Recommend This Spot
          </Text>
        ): null}

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
              active={data?.is_favorited}
              style={styles.footerButton}
            />
          </View>
          <View style={styles.footerButton}>
            <RecommendLocationButton
              active={data?.is_favorited}
              id={data?.id}
            />
          </View>
        </View>
      </View>
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
    paddingLeft: 12,
    paddingVertical: 8,
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
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0",
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingBottom: 8,
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

