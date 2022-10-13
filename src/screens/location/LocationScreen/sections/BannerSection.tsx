import { StackActions } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Image, View } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";
import BackButton from "../../../../components/buttons/BackButton";
import ShareButton from "../../../../components/buttons/ShareButton";
import ImagePagination from "../../../../components/lists/shared/ImagePagination";
import { useDeleteLocation } from "../../../../hooks/mutations/useDeleteLocation";
import { GetLocationRes } from "../../../../hooks/queries/useGetLocation";
import { useImagePaginationIndicator } from "../../../../hooks/utils/useImagePaginationIndicator";
import { ShareType } from "../../../../hooks/utils/useShareContent";
import { useAuth } from "../../../../store/auth/useAuth";
import { useModalStore } from "../../../../store/modal/useModalStore";
import { MediaType } from "../../../../types/Media";
import { RootStackScreenProps } from "../../../../types/navigation";

const { height, width } = Dimensions.get('screen')

interface Props {
    navigation: RootStackScreenProps<'ViewLocationScreen'>['navigation'],
    id: number
    user: number | undefined
    media: GetLocationRes['location']['media'] | undefined
    mapImage: GetLocationRes['location']['map_image'] | undefined
}

const BannerSection = ({ navigation, media=[], mapImage, id, user }: Props) => {

    const { currentIndex, handleViewableItemsChanged } = useImagePaginationIndicator()
    const auth = useAuth(store => store.id)
    const [menuOpen, setMenuOpen] = useState(false)
    const setConfirm = useModalStore(store => store.setConfirmDelete)
    const [deleteLocation] = useDeleteLocation(id)
    
    const navigateToImage = (id: number) => () => {
        if(!media && !mapImage) return;
        navigation.navigate("ViewImageScreen", { 
            id, type: media ? MediaType.Location : MediaType.MapLocation 
        })
    }

    const handleEdit = () => { setMenuOpen(false); navigation.navigate("EditLocationScreen", { id }) }
    const handleDelete = () => { setMenuOpen(false); 
        const history = navigation.getState().routes
        setConfirm({
            message: `Are you sure you want to permanently delete this location?`,
            confirm: history.length > 1 && history[history.length - 2].name === 'ViewMapScreen' ? 
                () => deleteLocation().then(() => navigation.dispatch(StackActions.pop(2))) :
                () => deleteLocation().then(navigation.goBack)
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
            { media.length > 1 &&
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
    }
});
