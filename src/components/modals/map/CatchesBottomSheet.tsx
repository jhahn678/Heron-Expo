import { Text } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";
import { Dimensions, Pressable, StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useMapModalStore } from "../../../store/modal/useMapModalStore";
import { useGetCatchFragment, GetCatchRes } from "../../../hooks/queries/useGetCatch";
import { RootStackScreenProps } from "../../../types/navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import globalStyles from "../../../globalStyles";
import Avatar from "../../users/Avatar";
import dayjs from "../../../config/dayjs";
import ShareButton from "../../buttons/ShareButton";
import { ShareType } from "../../../hooks/utils/useShareContent";
import NoImagesUploaded from "../../lists/shared/NoImagesUploaded";
import { theme } from "../../../config/theme";
import { MediaType } from "../../../types/Media";
import LikeButton, { LikeType } from "../../buttons/LikeButton";

const { width } = Dimensions.get('screen')

const CatchesBottomSheet = () => {
  
  const focused = useIsFocused()
  const navigation = useNavigation<RootStackScreenProps<'ViewMapScreen'>['navigation']>();
  const [data, setData] = useState<GetCatchRes["catch"] | null>(null);
  const getFromCache = useGetCatchFragment();
  const visible = useMapModalStore((store) => store.catchVisible);
  const catchId = useMapModalStore((store) => store.catchId);
  const dismissable = useMapModalStore(store => store.catchDismissable)
  const setCatch = useMapModalStore(store => store.setCatch)
  const onClose = () => setCatch()

  const navigateToImage = (id: number, uri: string) => () =>
    navigation.navigate("ViewImageScreen", { id, uri, type: MediaType.Catch });

  const navigateToUser = () => {
    if(data) navigation.navigate("UserProfileScreen", { id: data.user.id });
  }

  const navigateToCatch = () => {
    if(data) navigation.navigate('ViewCatchScreen', { id: data.id })
  }

  const navigateToWaterbody = () => {
    if(data) navigation.navigate('MainTabs', { 
      screen: 'ExploreStack', params: { 
        screen: 'WaterbodyScreen', 
        params: { id: data.waterbody.id } 
      }
    })
  }

  useEffect(() => {
    if (!catchId) setData(null);
    if (catchId) setData(getFromCache(catchId));
  }, [catchId, focused]);

  if (!visible) return null;

  return (
    <BottomSheet
      enablePanDownToClose={dismissable}
      onClose={onClose}
      snapPoints={[100, 400]}
      index={0}
    >
      <Pressable style={[globalStyles.frac, styles.hpadding]} onPress={navigateToCatch}>
        <Text style={styles.title} numberOfLines={1}>
          {data?.title || "Untitled Catch"}
        </Text>
      </Pressable>

      <View style={[globalStyles.baseline, styles.hpadding]}>
        <Text style={styles.label}>at</Text>
        <Text style={styles.waterbody} onPress={navigateToWaterbody}>
          {data?.waterbody.name}
        </Text>
      </View>

      <View style={[globalStyles.frac, { marginTop: 20 }, styles.hpadding]}>
        <Avatar
          size={24}
          fullname={data?.user.fullname}
          uri={data?.user.avatar}
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

      <View style={[styles.images, styles.hpadding]}>
        {data?.media && data.media.length > 0 ? (
          data.media.slice(0, 2).map(({ id, url }) => (
            <Pressable
              key={id} style={styles.image}
              onPress={navigateToImage(id, url)}
            >
              <Image source={{ uri: url }} style={{ flex: 1 }}/>
            </Pressable>
          ))
        ) : (
          <NoImagesUploaded />
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <ShareButton
            mode="none"
            id={catchId}
            shareType={ShareType.Catch}
          />
        </View>
        <View style={styles.fdivider}/>
        <View style={styles.footerButton}>
          <LikeButton 
            id={data?.id} 
            type={LikeType.Catch}
            active={data?.is_favorited}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default CatchesBottomSheet;

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
    marginTop: 10,
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
    overflow: 'hidden'
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 12,
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
