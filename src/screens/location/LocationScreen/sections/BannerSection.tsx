import { StackActions } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Image, View } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";
import BackButton from "../../../../components/buttons/BackButton";
import ShareButton from "../../../../components/buttons/ShareButton";
import ImagePagination from "../../../../components/lists/shared/ImagePagination";
import FisherWomanFishing from "../../../../components/svg/FisherwomanFishing";
import { theme } from "../../../../config/theme";
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
            { media.length > 1 &&
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
                <View style={styles.placeholder}><FisherWomanFishing/></View>
            }
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
        </View>
    );
};

export default BannerSection;

const styles = StyleSheet.create({
    container: {
        width,
        height: height * 0.45,
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
        justifyContent: 'space-between',
        position: "absolute",
        zIndex: 100,
        top: 32,
        right: 16
    },
    image: {
        width,
        flex: 1,
    },
    placeholder: {
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.secondary
    },
});
