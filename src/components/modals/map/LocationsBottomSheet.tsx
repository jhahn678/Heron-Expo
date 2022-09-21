import { Text } from "react-native-paper";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useMapModalStore } from "../../../store/modal/useMapModalStore";
import { GetLocationRes, useGetLocationFragment } from "../../../hooks/queries/useGetLocation";
import { NavigationProp } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../store/auth/useAuth";
import Avatar from "../../users/Avatar";
import dayjs from "../../../config/dayjs";
import globalStyles from "../../../globalStyles";
import SaveLocationButton from "../../buttons/SaveLocationButton";
import RecommendLocationButton from "../../buttons/RecommendLocationButton";
import ShareButton from "../../buttons/ShareButton";
import { ShareType } from "../../../hooks/utils/useShareContent";
import NoImagesUploaded from "../../lists/shared/NoImagesUploaded";
import PrivacyLabel from "../../locations/PrivacyLabel";
import { theme } from "../../../config/theme";

const { width } = Dimensions.get('window')

const LocationsBottomSheet = () => {

  const { id } = useAuth()
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<GetLocationRes['location'] | null>(null);
  const getFromCache = useGetLocationFragment();
  const visible = useMapModalStore((store) => store.locationVisible);
  const location = useMapModalStore((store) => store.locationId);
  const dismissable = useMapModalStore(store => store.locationDismissable)
  const onClose = useMapModalStore(store => () => store.setLocation())

  const navigateToImage = (uri: string) => () =>
    navigation.navigate("ViewImageScreen", { uri });

  const navigateToUser = () => {
    if(!data?.user.id || data.user.id === id ) return;
    navigation.navigate('UserProfileScreen', { id: data?.user.id })
  }

  useEffect(() => {
    if (!location) setData(null);
    if (location) setData(getFromCache(location));
  }, [location]);

  if (!visible) return null;

  return (
    <BottomSheet
      enablePanDownToClose={dismissable}
      snapPoints={["12%", "45%"]}
      index={0}
      onClose={onClose}
    >
      <View style={[globalStyles.frac, styles.hpadding]}>
        <Text style={styles.title} numberOfLines={1}>
          {data?.title || "Untitled Location"}
        </Text>
      </View>

      <View style={[globalStyles.baseline, styles.hpadding]}>
        <Text style={styles.label}>on</Text>
        <Text style={styles.waterbody}>{data?.waterbody.name}</Text>
      </View>

      <View style={[globalStyles.frac, { marginTop: 12 }, styles.hpadding]}>
        <Avatar
          fullname={data?.user.fullname}
          uri={data?.user.avatar}
          size={24}
          onPress={navigateToUser}
        />
        <Text style={styles.name} onPress={navigateToUser}>
          {data?.user.fullname}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.detail}>{dayjs(data?.created_at).fromNow()}</Text>
        <View style={styles.divider} />
        <PrivacyLabel privacy={data?.privacy}/>
      </View>

      <View style={[styles.images, styles.hpadding]}>
        {data?.media && data.media.length > 0 ? (
          data.media.slice(0, 2).map(({ id, url }) => (
            <Pressable
              key={id}
              style={styles.image}
              onPress={navigateToImage(url)}
            >
              <Image source={{ uri: url }} />
            </Pressable>
          ))
        ) : (
          <NoImagesUploaded/>
        )}
      </View>

      { data && data.total_favorites > 0 ? (
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

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <ShareButton
            shareType={ShareType.Location}
            id={location}
            mode="none"
          />
        </View>
        <View style={styles.fdivider}/>
        <View style={styles.footerButton}>
          <SaveLocationButton
            id={data?.id}
            active={data?.is_saved}
          />
        </View>
        <View style={styles.fdivider}/>
        <View style={styles.footerButton}>
          <RecommendLocationButton active={data?.is_favorited} id={data?.id} />
        </View>
      </View>
    </BottomSheet>
  );
};

export default LocationsBottomSheet;

const styles = StyleSheet.create({
  hpadding: {
    paddingHorizontal: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 4,
  },
  waterbody: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
  },
  detail: { 
    fontWeight: '500', 
    fontSize: 12 
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
    marginLeft: 6,
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 12,
  },
  text: {
    fontWeight: "600",
    paddingRight: 2,
  },
  images: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 24,
    paddingBottom: 16,
  },
  image: {
    backgroundColor: "#e0e0e0",
    width: width * 0.5 - 20,
    borderRadius: 12,
  },
  favorites: {
    fontWeight: "500",
    fontSize: 12,
    alignSelf: 'flex-end',
    paddingVertical: 4
  },
  footer: {
    flexDirection: "row",
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.surfaceVariant
  },
  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fdivider: {
    height: 24,
    width: 1,
    backgroundColor: 'rgba(0,0,0,.1)',
    alignSelf: 'center'
  }
});
