import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Pressable, Image, FlatList } from "react-native";
import { RootStackScreenProps } from "../../../../types/navigation";
import BackButton from "../../../../components/buttons/BackButton";
import { GetCatchRes } from "../../../../hooks/queries/useGetCatch";
import ShareButton from "../../../../components/buttons/ShareButton";
import { ShareType } from "../../../../hooks/utils/useShareContent";
import ImagePagination from "../../../../components/lists/shared/ImagePagination";
import { useImagePaginationIndicator } from "../../../../hooks/utils/useImagePaginationIndicator";
import { IMedia, MediaType } from "../../../../types/Media";
import { useAuth } from "../../../../store/auth/useAuth";
import { Divider, IconButton, Menu } from "react-native-paper";
import { useDeleteCatch } from "../../../../hooks/mutations/useDeleteCatch";
import { useModalStore } from "../../../../store/modal/useModalStore";
import { theme } from "../../../../config/theme";
import FishermanFishingCattails from "../../../../components/svg/FishermanFishingCattails";
import FishermanHoldingFish from "../../../../components/svg/FishermanHoldingFish";

interface Props {
  id: number
  user: number | undefined
  navigation: RootStackScreenProps<'ViewCatchScreen'>['navigation']
  media: GetCatchRes['catch']['media'] | undefined
  mapImage: GetCatchRes['catch']['map_image'] | undefined
}

const { width, height } = Dimensions.get('window')

const BannerSection = ({ navigation, id, user, media=[], mapImage }: Props) => {

    const { currentIndex, handleViewableItemsChanged } = useImagePaginationIndicator()
    const [deleteCatch] = useDeleteCatch(id)
    const auth = useAuth(store => store.id)
    const setConfirm = useModalStore(store => store.setConfirmDelete)

    const [menuOpen, setMenuOpen] = useState(false)
    const handleEdit = () => { setMenuOpen(false); navigation.navigate('EditCatchScreen', { id }) }
    const handleDelete = () => {
      setMenuOpen(false)
      setConfirm({
        message: `Are you sure you want to permanently delete this catch?`,
        confirm: () => deleteCatch().then(navigation.goBack)
      })
    }
    
    const navigateToImage = (id: number) => () => {
        if(media.length === 0 && !mapImage) return;
        navigation.navigate("ViewImageScreen", { 
            id, type: media ? MediaType.Catch : MediaType.MapCatch 
        })
    }

    return (
      <View style={styles.container}>
        <BackButton style={styles.back}/>
        <View style={styles.buttons}>
          <ShareButton id={id} shareType={ShareType.Catch}/>
          { user === auth &&
            <Menu
              anchor={
                <IconButton 
                  icon={"dots-vertical"}
                  mode='contained'
                  onPress={() => setMenuOpen(true)}
                />
              }
              onDismiss={() => setMenuOpen(false)}
              visible={menuOpen}
            >
              <Menu.Item
                title="Edit"
                style={{ height: 40 }}
                onPress={handleEdit}
              />
              <Divider bold={true}/>
              <Menu.Item
                title="Delete"
                style={{ height: 40 }}
                onPress={handleDelete}
              />
            </Menu>
          }
        </View>
        { media.length > 0 && 
          <ImagePagination currentIndex={currentIndex} media={media}/>
        }
        { media.length > 0 ?
            <FlatList
              data={media}
              horizontal={true}
              pagingEnabled={true}
              onViewableItemsChanged={handleViewableItemsChanged}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable onPress={navigateToImage(item.id)}>
                  <Image source={{ uri: item.url }} style={styles.image}/>
                </Pressable>
              )}
            /> :
            <View style={styles.placeholder}><FishermanHoldingFish/></View>
        }
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    position: "absolute",
    zIndex: 100,
    top: 32,
    right: 12,
  },
  image: {
    flex: 1,
    width: width,
    backgroundColor: theme.colors.secondary
  },
  placeholder: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary
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
