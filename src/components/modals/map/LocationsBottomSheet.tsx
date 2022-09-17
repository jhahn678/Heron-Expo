import { Text, Title } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";
import { Dimensions, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useMapModalStore } from "../../../store/modal/useMapModalStore";
import { GetLocationRes, useGetLocationFragment } from "../../../hooks/queries/useGetLocation";
import { NavigationProp } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../store/auth/useAuth";
import Avatar from "../../users/Avatar";

const { width } = Dimensions.get("window");

const LocationsBottomSheet = () => {

  const { id } = useAuth()
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<GetLocationRes['location'] | null>(null);
  const getFromCache = useGetLocationFragment();
  const visible = useMapModalStore((store) => store.locationVisible);
  const location = useMapModalStore((store) => store.locationId);

  const navigateToUser = () => {
    if(!data?.user.id) return;
    navigation.navigate('UserProfileScreen', { id: data?.user.id })
  }

  useEffect(() => {
    if (!location) setData(null);
    if (location) setData(getFromCache(location));
  }, [location]);

  if (!visible) return null;

  return (
    <BottomSheet
      style={{ paddingHorizontal: 16 }}
      snapPoints={["10%", "40%"]}
      index={0}
    >
      <Title style={styles.title}>{data?.title}</Title>
      <Avatar fullname={data?.user.fullname} uri={data?.user.avatar} onPress={navigateToUser}/>
      <Text>{data?.user.fullname}</Text>
    </BottomSheet>
  );
};

export default LocationsBottomSheet;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
