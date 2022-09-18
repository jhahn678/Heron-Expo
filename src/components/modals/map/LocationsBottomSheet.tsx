import { MD3Theme, Text, Title, useTheme } from "react-native-paper";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useMapModalStore } from "../../../store/modal/useMapModalStore";
import { GetLocationRes, useGetLocationFragment } from "../../../hooks/queries/useGetLocation";
import { NavigationProp } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../store/auth/useAuth";
import Avatar from "../../users/Avatar";
import { useGetLocationFragementMock, useGetLocationsQueryMock } from "../../../../__mocks";
import { Privacy } from "../../../types/Location";
import dayjs from "../../../config/dayjs";
import globalStyles from "../../../globalStyles";
import SaveLocationButton from "../../buttons/SaveLocationButton";
import RecommendLocationButton from "../../buttons/RecommendLocationButton";
import ShareButton from "../../buttons/ShareButton";
import { ShareType } from "../../../hooks/utils/useShareContent";
import IceFishing from "../../svg/IceFishing";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('window')

const LocationsBottomSheet = () => {

  const { id } = useAuth()
  const theme = useTheme() as MD3Theme
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<GetLocationRes['location'] | null>(null);
  const getFromCache = useGetLocationFragment();
  const visible = useMapModalStore((store) => store.locationVisible);
  const location = useMapModalStore((store) => store.locationId);

  const navigateToImage = (uri: string) => () =>
    navigation.navigate("ViewImageScreen", { uri });

  const navigateToUser = () => {
    if(!data?.user.id || data.user.id === id ) return;
    navigation.navigate('UserProfileScreen', { id: data?.user.id })
  }

  useEffect(() => {
    // if (!location) setData(null);
    // if (location) setData(getFromCache(location));
    setData(useGetLocationFragementMock(Privacy.Public)())
  }, [location]);

  if (!visible) return null;

  return (
    <BottomSheet
      style={{ paddingHorizontal: 16 }}
      snapPoints={["12%", "45%"]}
      index={0}
    >
      <View style={globalStyles.frac}>
        <Text style={styles.title} numberOfLines={1}>
          {data?.title}
        </Text>
      </View>

      <View style={globalStyles.baseline}>
        <Text style={styles.label}>on</Text>
        <Text style={styles.waterbody}>{data?.waterbody.name}</Text>
      </View>

      <View style={styles.main}>
        <View style={styles.mainLeft}>
          <Text style={styles.name}>Description</Text>
          { data?.description ? 
            <Text style={styles.desc}>{data?.description}</Text> :
            <Text style={styles.nodesc}>None</Text>
          }
        </View>
        {data && data.media.length > 0 ? (
          <Pressable onPress={navigateToImage(data.media[0].url)}>
            <Image source={{ uri: data.media[0].url }} style={styles.image} />
          </Pressable>
        ) : (
          <View style={styles.noImages}>
            <IceFishing />
            <Text style={styles.noImagesText}>No uploaded images</Text>
          </View>
        )}
      </View>


      <View style={styles.subfooter}>
        <View style={globalStyles.frsb}>
          <Avatar
            size={36}
            fullname={data?.user.fullname}
            uri={data?.user.avatar}
            onPress={navigateToUser}
          />
          <View style={styles.user}>
            <Text style={styles.name}>{data?.user.fullname}</Text>
            <Text style={styles.created}>
              {dayjs(data?.created_at).fromNow()}
            </Text>
          </View>
        </View>
        {data?.total_favorites && (
          <Text style={styles.favorites}>
            {data.total_favorites}
            {data.total_favorites > 1
              ? " People Recommend This Spot"
              : " Person Recommends This Spot"}
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <ShareButton
            shareType={ShareType.Location}
            id={location}
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
          <RecommendLocationButton active={data?.is_favorited} id={data?.id} />
        </View>
      </View>
    </BottomSheet>
  );
};

export default LocationsBottomSheet;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 4,
  },
  waterbody: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 4,
  },
  label: {
    fontWeight: "400",
    paddingRight: 4,
  },
  user: {
    marginHorizontal: 8,
  },
  name: {
    fontWeight: "500",
  },
  created: {
    fontSize: 12,
  },
  main: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 16,
  },
  mainLeft: {
    width: width * .5
  },
  desc: {
    marginTop: 4
  },
  nodesc: {
    fontStyle: 'italic'
  },
  noImages: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noImagesText: {
    fontWeight: "500",
    fontSize: 10,
    marginTop: 12,
  },
  subfooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  image: {
    flex: 1,
    width: width * 0.4,
    borderRadius: 12
  },
  favorites: {
    fontWeight: "500",
    fontSize: 12,
    alignSelf: "flex-end",
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 8,
    marginBottom: 8,
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
