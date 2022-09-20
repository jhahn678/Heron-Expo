import { Text } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";
import { Dimensions, Pressable, StyleSheet, View, Image, GestureResponderEvent } from "react-native";
import React, { useEffect, useState } from "react";
import { useMapModalStore } from "../../../store/modal/useMapModalStore";
import { useGetCatchFragment, GetCatchRes } from "../../../hooks/queries/useGetCatch";
import { NavigationProp } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../../globalStyles";
import Avatar from "../../users/Avatar";
import dayjs from "../../../config/dayjs";
import ShareButton from "../../buttons/ShareButton";
import RecommendLocationButton from "../../buttons/RecommendLocationButton";
import { ShareType } from "../../../hooks/utils/useShareContent";
import NoImagesUploaded from "../../lists/shared/NoImagesUploaded";

const { width } = Dimensions.get('screen')

const CatchesBottomSheet = () => {
  
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<GetCatchRes["catch"] | null>(null);
  const getFromCache = useGetCatchFragment();
  const visible = useMapModalStore((store) => store.catchVisible);
  const catchId = useMapModalStore((store) => store.catchId);
  const dismissable = useMapModalStore(store => store.catchDismissable)
  const onClose = useMapModalStore(store => () => store.setCatch())
  const handleTouch = (e: GestureResponderEvent) => e.stopPropagation()

  const navigateToImage = (uri: string) => () =>
    navigation.navigate("ViewImageScreen", { uri });

  const navigateToUser = () => {
    if (!data?.user.id) return;
    navigation.navigate("UserProfileScreen", { id: data?.user.id });
  }

  const navigateToCatch = () => {
    if(!data?.id) return;
    navigation.navigate('ViewCatchScreen', { id: data.id })
  }

  const navigateToWaterbody = () => {
    if(!data?.waterbody.id) return;
    navigation.navigate('WaterbodyScreen', { id: data?.waterbody.id})
  }

  useEffect(() => {
    if (!catchId) setData(null);
    if (catchId) setData(getFromCache(catchId));
  }, [catchId]);

  if (!visible) return null;

  return (
    <BottomSheet
      enablePanDownToClose={dismissable}
      onClose={onClose}
      style={{ paddingHorizontal: 16 }}
      snapPoints={["12%", "45%"]}
      index={0}
    >
      <Pressable style={globalStyles.frac} onPress={navigateToCatch}>
        <Text style={styles.title} numberOfLines={1}>
          {data?.title || "Untitled Catch"}
        </Text>
      </Pressable>

      <View style={globalStyles.baseline}>
        <Text style={styles.label}>at</Text>
        <Text style={styles.waterbody} onPress={navigateToWaterbody}>
          {data?.waterbody.name}
        </Text>
      </View>

      <View style={[globalStyles.frac, { marginTop: 12 }]}>
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
        <Text style={styles.detail}>{data?.species}</Text>
      </View>

      <View style={styles.images}>
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
          <NoImagesUploaded />
        )}
      </View>

      <Pressable style={styles.footer} onPress={handleTouch}>
        <View style={styles.footerButton}>
          <ShareButton
            shareType={ShareType.Location}
            id={catchId}
            mode="none"
          />
        </View>
        <View style={styles.footerButton}>
          <RecommendLocationButton active={data?.is_favorited} id={data?.id} />
        </View>
      </Pressable>
    </BottomSheet>
  );
};

export default CatchesBottomSheet;

const styles = StyleSheet.create({
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
  label: {
    fontWeight: "400",
    paddingRight: 4,
  },
  name: {
    fontWeight: "500",
    marginLeft: 6,
  },
  detail: {
    fontSize: 12,
    fontWeight: '500'
  },
  images: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 16,
  },
  image: {
    backgroundColor: "#e0e0e0",
    width: width * 0.5 - 20,
    borderRadius: 12,
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 12,
  },
  footer: {
    flexDirection: "row",
    marginBottom: 16,
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
