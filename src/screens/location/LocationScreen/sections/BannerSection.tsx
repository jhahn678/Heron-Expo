import React from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Image, View } from "react-native";
import BackButton from "../../../../components/buttons/BackButton";
import ShareButton from "../../../../components/buttons/ShareButton";
import ImagePagination from "../../../../components/lists/shared/ImagePagination";
import { GetLocationRes } from "../../../../hooks/queries/useGetLocation";
import { useImagePaginationIndicator } from "../../../../hooks/utils/useImagePaginationIndicator";
import { ShareType } from "../../../../hooks/utils/useShareContent";
import { MediaType } from "../../../../types/Media";
import { RootStackScreenProps } from "../../../../types/navigation";

const { height, width } = Dimensions.get('screen')

interface Props {
    navigation: RootStackScreenProps<'ViewLocationScreen'>['navigation'],
    id: number | undefined
    media: GetLocationRes['location']['media'] | undefined
    mapImage: GetLocationRes['location']['map_image'] | undefined
}

const BannerSection = ({ navigation, media=[], mapImage, id }: Props) => {

    const { currentIndex, handleViewableItemsChanged } = useImagePaginationIndicator()
    
    const navigateToImage = (id: number) => () => {
        if(!media && !mapImage) return;
        navigation.navigate("ViewImageScreen", { 
            id, type: media ? MediaType.Location : MediaType.MapLocation 
        })
    }

    return (
        <View style={styles.container}>
            <BackButton style={styles.back}/>
            <ShareButton id={id} shareType={ShareType.Catch} style={styles.share}/>
            { (media && media.length > 0) &&
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
    }
});
