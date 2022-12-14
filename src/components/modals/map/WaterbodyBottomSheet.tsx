import { useEffect, useState } from "react";
import { Text, Title } from 'react-native-paper'
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { StyleSheet, View, Image, Pressable, Dimensions } from "react-native";
import { useMapModalStore } from "../../../store/modal/useMapModalStore";
import { GetWaterbodyRes, useGetWaterbodyFragment } from "../../../hooks/queries/useGetWaterbody";
import RatingDisplay from '../../ratings/RatingDisplay';
import { useNavigation } from "@react-navigation/native";
import { MediaSource, RootStackScreenProps } from "../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IceFishing from "../../svg/IceFishing";
import FishIcon from "../../icons/FishIcon";
import { MediaType } from "../../../types/Media";

const { width } = Dimensions.get("window");

const WaterbodyBottomSheet = () => {
    const navigation = useNavigation<RootStackScreenProps<'ViewMapScreen'>['navigation']>()
    const [data, setData] = useState<GetWaterbodyRes['waterbody'] | null>(null)
    const getFromCache = useGetWaterbodyFragment()
    const visible = useMapModalStore(store => store.waterbodyVisible)
    const waterbody = useMapModalStore(store => store.waterbodyId)

    const navigateToImage = (id: number, uri: string) => () => navigation
      .navigate('ViewImageScreen', { id, uri, type: MediaType.Waterbody })
    
    const navigateToMedia = () => {
      if(waterbody) navigation.navigate('MediaGridScreen', {
        source: MediaSource.Waterbody,
        id: waterbody,
        title: data?.name 
      })
    }

    useEffect(() => {
      if(!waterbody) setData(null)
      if(waterbody) setData(getFromCache(waterbody))
    },[waterbody])

    if(!visible) return null;

    return (
      <BottomSheet
        enableContentPanningGesture={false}
        snapPoints={[100, 400]}
        index={0}
      >
        <Title style={styles.title}>{data?.name}</Title>
        <View style={styles.subheading}>
          <RatingDisplay
            noRatingLabel={"No Reviews Available"}
            rating={data?.average_rating}
            numberOfRatings={data?.total_reviews}
            ratingBackgroundColor={"#d9d9d9"}
            backgroundColor="white"
          />
          <View style={styles.stats}>
            <Text style={styles.stat}>{data?.total_catches}</Text>
            <FishIcon color="#000" size={20}/>
            <View style={styles.divider}/>
            <Text style={styles.stat}>{data?.total_catches}</Text>
            <Icon name='map-marker-multiple-outline' size={20}/>
          </View>
        </View>
        {data && data.media.length > 0 ? (
          <BottomSheetFlatList
            horizontal
            data={data.media}
            contentContainerStyle={{ marginTop: 24 }}
            ListFooterComponent={
              <Pressable style={styles.footer} onPress={navigateToMedia}>
                <Text style={styles.text}>See more</Text>
                <Icon name="arrow-right" size={16} />
              </Pressable>
            }
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable onPress={navigateToImage(item.id, item.url)}>
                <Image
                  source={{ uri: item.url }}
                  style={styles.image}
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
    marginVertical: 12,
    marginHorizontal: 16,
  },
  subheading:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8
  },
  stat: {
    fontSize: 16,
    marginRight: 4,
    fontWeight: '500'
  },
  image: {
    height: width * 0.5 - 12,
    width: width * 0.5 - 18,
    borderRadius: 12,
    marginLeft: 12,
  },
  footer: {
    height: width * 0.5 - 12,
    width: width * 0.4 - 12,
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
  },
  divider: {
    marginHorizontal: 12,
    height: 16,
    width: 1,
    backgroundColor: '#d9d9d9'
  }
});
