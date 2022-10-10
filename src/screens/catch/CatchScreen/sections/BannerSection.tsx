import React from "react";
import { StyleSheet, View, Dimensions, Pressable, Image, FlatList, ViewToken } from "react-native";
import { RootStackScreenProps } from "../../../../types/navigation";
import BackButton from "../../../../components/buttons/BackButton";
import { GetCatchRes } from "../../../../hooks/queries/useGetCatch";
import ShareButton from "../../../../components/buttons/ShareButton";
import { ShareType } from "../../../../hooks/utils/useShareContent";
import ImagePagination from "../../../../components/lists/shared/ImagePagination";
import { useImagePaginationIndicator } from "../../../../hooks/utils/useImagePaginationIndicator";
import { MediaType } from "../../../../types/Media";

interface Props {
    navigation: RootStackScreenProps<'ViewCatchScreen'>['navigation']
    media: GetCatchRes['catch']['media'] | undefined
    mapImage: GetCatchRes['catch']['map_image'] | undefined
    id: number
}

const { width, height } = Dimensions.get('window')

const BannerSection = ({ navigation, id, media=[], mapImage }: Props) => {

    
    const { currentIndex, handleViewableItemsChanged } = useImagePaginationIndicator()

    const navigateToImage = (id: number) => () => {
        if(!media && !mapImage) return;
        navigation.navigate("ViewImageScreen", { 
            id, type: media ? MediaType.Catch : MediaType.MapCatch 
        })
    }

    return (
      <View style={styles.container}>
        <BackButton style={styles.back}/>
        <ShareButton id={id} shareType={ShareType.Catch} style={styles.share}/>
        { media && media.length > 0 && 
          <ImagePagination currentIndex={currentIndex} media={media}/>
        }
        <FlatList
          data={media.length > 0 ? media : mapImage ? [mapImage] : undefined}
          horizontal={true}
          pagingEnabled={true}
          onViewableItemsChanged={handleViewableItemsChanged}
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
