import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { IconButton, TouchableRipple } from "react-native-paper";
import dayjs from "../../../config/dayjs";
import { GetLocationsRes } from "../../../hooks/queries/useGetLocationsQuery";
import { useShareContent } from "../../../hooks/utils/useShareContent";
import Avatar from "../../users/Avatar";

interface Props {
    data: GetLocationsRes['locations'][number],
    navigateToUser: () => void
    navigateToWaterbody: () => void
    navigateToMap: () => void
}

const LocationListItem = ({ data, navigateToUser, navigateToWaterbody, navigateToMap }: Props) => {

    const handleShare = () => useShareContent()({ url: '', shareType: 'LOCATION' })

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
          <IconButton
            icon={"share-variant"}
            onPress={handleShare}
            style={{ paddingRight: 8 }}
          />
        </View>
        {data.title && <Text style={styles.title}>{data.title}</Text>}
        <Pressable onPress={navigateToMap}>
          <Image style={styles.image} source={{ uri: data.media[0]?.url }} />
        </Pressable>
        <View style={styles.footer}>
            <Text style={styles.label}>Saved at</Text>
            <Text style={styles.value}>{data.waterbody.name}</Text>
            <Text style={styles.label}>Near</Text>
            <Text style={styles.value}>{data.nearest_geoplace}</Text>
          <IconButton onPress={navigateToMap} icon="map" style={styles.map} />
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
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0",
  },
  footer: {
    paddingHorizontal: 12,
    paddingBottom: 24
  },
  value: {
    fontWeight: "500",
  },
  label: {
    fontWeight: "300",
    fontSize: 12,
    marginTop: 12,
    flexShrink: 2,
  },
  map: {
    position: "absolute",
    right: 4,
    top: 4,
    zIndex: 100,
  },
});

