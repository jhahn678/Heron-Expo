import { useEffect, useState } from "react";
import { Text, Title } from 'react-native-paper'
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { StyleSheet, View, Image, Pressable, Dimensions } from "react-native";
import { useMapModalStore } from "../../../store/modal/useMapModalStore";
import { GetWaterbodyRes, useGetWaterbodyFragment } from "../../../hooks/queries/useGetWaterbody";
import RatingDisplay from '../../ratings/RatingDisplay';
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IceFishing from "../../svg/IceFishing";

const { width } = Dimensions.get("window");

const WaterbodyBottomSheet = () => {
    const navigation = useNavigation<NavigationProp>()
    const [data, setData] = useState<GetWaterbodyRes['waterbody'] | null>(null)
    const getFromCache = useGetWaterbodyFragment()
    const visible = useMapModalStore(store => store.waterbodyVisible)
    const waterbody = useMapModalStore(store => store.waterbodyId)

    const navigateToImage = (uri: string) => () => navigation.navigate('ViewImageScreen', { uri })
    const navigateToMedia = () => waterbody && navigation.navigate('MediaGridScreen', { waterbody, title: data?.name })

    useEffect(() => {
        if(!waterbody) setData(null)
        if(waterbody) setData(getFromCache(waterbody))
        // setData(useGetWaterbodyFragmentMock())
    },[waterbody])

    if(!visible) return null;

    return (
      <BottomSheet
        enableContentPanningGesture={false}
        snapPoints={["12%", "45%"]}
        index={0}
      >
        <Title style={styles.title}>{data?.name}</Title>
        <View style={styles.subheading}>
          <RatingDisplay
            rating={data?.average_rating}
            numberOfRatings={data?.total_reviews}
            ratingBackgroundColor={"#e0e0e0"}
            backgroundColor="white"
            style={{ marginLeft: 16 }}
          />
          <Text style={styles.stat}>
            {"  "}&bull;{"  "}
            {data?.total_catches} catches
          </Text>
          <Text style={styles.stat}>
            {"  "}&bull;{"  "}
            {data?.total_locations} locations
          </Text>
        </View>
        {data && data.media.length > 0 ? (
          <BottomSheetFlatList
            horizontal
            data={data.media}
            snapToInterval={width * 0.5}
            overScrollMode="never"
            contentContainerStyle={{ marginTop: 24 }}
            ListFooterComponent={
              <Pressable style={styles.footer} onPress={navigateToMedia}>
                <Text style={styles.text}>See more</Text>
                <Icon name="arrow-right" size={16} />
              </Pressable>
            }
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Pressable onPress={navigateToImage(item.url)}>
                <Image
                  source={{ uri: item.url }}
                  style={(index + 1) % 2 === 0 ? styles.right : styles.left}
                />
              </Pressable>
            )}
          />
        ) : (
          <View style={styles.noImages}>
            <IceFishing />
            <Text style={styles.noImagesText}>No uploaded images</Text>
          </View>
        )}
      </BottomSheet>
    );
};

export default WaterbodyBottomSheet;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  subheading:{
    flexDirection: 'row'
  },
  stat: {
    alignSelf: 'flex-end',
    fontWeight: '500'
  },
  left: {
    height: width * 0.5 - 12,
    width: width * 0.5 - 12,
    borderRadius: 12,
    marginLeft: 8,
    marginRight: 4,
  },
  right: {
    height: width * 0.5 - 12,
    width: width * 0.5 - 12,
    borderRadius: 12,
    marginLeft: 4,
    marginRight: 8,
  },
  footer: {
    height: width * 0.5 - 12,
    width: width * 0.5 - 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: '600',
    paddingRight: 2
  },
  noImages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48
  },
  noImagesText: {
    fontWeight: '500',
    marginTop: 12
  }
  
});
