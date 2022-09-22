import React, { useCallback, useState } from "react";
import { StyleSheet, View, Dimensions, Pressable, Image, FlatList, ViewToken } from "react-native";
import { RootStackScreenProps } from "../../../../types/navigation";
import { Text, Button } from 'react-native-paper'
import BackButton from "../../../../components/buttons/BackButton";
import { GetCatchRes } from "../../../../hooks/queries/useGetCatch";
import ShareButton from "../../../../components/buttons/ShareButton";
import { ShareType } from "../../../../hooks/utils/useShareContent";

interface Info {
  viewableItems: ViewToken[],
  changed: ViewToken[]
}

interface Props {
    navigation: RootStackScreenProps<'ViewCatchScreen'>['navigation']
    media: GetCatchRes['catch']['media'] | undefined
    id: number
}

const { width, height } = Dimensions.get('window')

const BannerSection = ({ navigation, id, media }: Props) => {
    
    const [currentIndex, setCurrentIndex] = useState<number | null>(0)

    const handleImageInView = useCallback(({ viewableItems }: Info) => {
      setCurrentIndex(viewableItems[0].index)
    },[]);

    const navigateToImage = (id: number) => () => navigation.navigate("ViewImageScreen", { id });

    return (
      <View style={styles.container}>
        <BackButton style={styles.back}/>
        <ShareButton id={id} shareType={ShareType.Catch} style={styles.share}/>
        { media && media.length > 0 && 
          <View style={styles.indexbar}>
            {media.map((x, index) => (
              <View key={x.id} style={[styles.dot, {
                backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,.6)',
                height: index === currentIndex ? 7 : 6,
                width: index === currentIndex ? 7 : 6,
              }]}/>
            ))}
          </View>
        }
        <FlatList
          data={media}
          horizontal={true}
          pagingEnabled={true}
          onViewableItemsChanged={handleImageInView}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable onPress={navigateToImage(item.id)}>
              <Image source={{ uri: item.url }} style={styles.image}/>
            </Pressable>
          )}
        />
      </View>
    );
};

export default BannerSection;

const styles = StyleSheet.create({
  container: {
    height: height * 0.45,
    backgroundColor: "#e0e0e0",
  },
  back: {
    position: "absolute",
    zIndex: 100,
    top: 32,
    left: 12,
  },
  share: {
    position: "absolute",
    zIndex: 100,
    top: 32,
    right: 12,
  },
  image: {
    flex: 1,
    width: width,
  },
  indexbar: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 100,
    bottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    padding: 8,
    paddingLeft: 16,
    borderRadius: 12
  },
  dot: {
    borderRadius: 100,
    marginRight: 8
  }
});
