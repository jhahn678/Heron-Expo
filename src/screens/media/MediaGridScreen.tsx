import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { MediaSource, RootStackScreenProps } from "../../types/navigation";
import { GetWaterbodyMedia, useGetWaterbodyMedia, useLazyGetWaterbodyMedia } from "../../hooks/queries/useGetWaterbodyMedia";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Surface, Title } from "react-native-paper";
import BoxLoader from "../../components/loaders/BoxLoader";
import { useModalStore } from "../../store/modal/useModalStore";
import { useImageStore } from "../../store/image/useImageStore";
import { useImagePicker } from "../../hooks/utils/useImagePicker";
import globalStyles from "../../globalStyles";
import { GetUserMediaRes, useGetUserMedia, useLazyGetUserMedia } from "../../hooks/queries/useGetUserMedia";
import CatchesListEmpty from "../../components/lists/shared/CatchesListEmpty";
import LocationsListEmpty from "../../components/lists/shared/LocationsListEmpty";
import { theme } from "../../config/theme";

const limit = 24;
const { width } = Dimensions.get('screen')  

type Data = GetWaterbodyMedia['waterbody']['media'] | GetUserMediaRes['user']['media'] | null
type Page = { offset: number, next: boolean }

const MediaGridScreen = ({ navigation, route }: RootStackScreenProps<'MediaGridScreen'>) => {

    const { params: { title, source, id, total } } = route;

    const [media, setMedia] = useState<Data>(null)
    const [loading, setLoading] = useState(false)
    const [allowAdd, setAllowAdd] = useState(false)
    const [{ next, offset }, setPage] = useState<Page>({ offset: 0, next: false })

    const { 
        data: waterbodyMedia, 
        loading: waterbodyLoading,
        fetchMore: fetchMoreWaterbodyMedia 
    } = useGetWaterbodyMedia({ id, limit, skip: source !== MediaSource.Waterbody });

    const { 
        data: userMedia, 
        loading: userLoading,
        fetchMore: fetchMoreUserMedia 
    } = useGetUserMedia({ id, limit, skip: source !== MediaSource.User })

    useEffect(() => {
        switch(source){
            case MediaSource.User:
                setAllowAdd(false)
                if(!userMedia) return;
                setMedia(userMedia.user.media);
                setPage({
                    offset: userMedia.user.media.length,
                    next: userMedia.user.media.length % limit === 0
                })
                break;
            case MediaSource.Waterbody:
                setAllowAdd(true)
                if(!waterbodyMedia) return;
                setMedia(waterbodyMedia.waterbody.media);
                setPage({
                    offset: waterbodyMedia.waterbody.media.length,
                    next: waterbodyMedia.waterbody.media.length % limit === 0
                })
                break;
        }
    },[waterbodyMedia, userMedia])

    useEffect(() => {
        setLoading((waterbodyLoading || userLoading) && media === null)
    },[waterbodyLoading, userLoading])

    const handleFetchMore = () => {
        if(!next) return;
        switch(source){
            case MediaSource.User:
                return fetchMoreUserMedia({ variables: { offset } })
            case MediaSource.Waterbody:
                return fetchMoreWaterbodyMedia({ variables: { offset } })
        }
    }

    const { openImagePicker } = useImagePicker()
    const setImages = useImageStore(state => state.setImages)
    const showConfirmUpload = useModalStore(state => state.setConfirmUpload)

    const handleAddImages = async () => {
        const result = await openImagePicker()
        if(!result) return;
        setImages(result)
        showConfirmUpload(id, true)
    }


    return (
        <View style={styles.container}>
            <Surface style={styles.heading}>
                <View style={globalStyles.frsb}>
                    <IconButton icon='arrow-left' onPress={navigation.goBack}/>
                    <Title style={{ fontWeight: '500' }}>
                        {title} {total !== undefined && `(${total})`}
                    </Title>
                </View>
                { allowAdd && <IconButton icon='plus' onPress={handleAddImages} size={28}/> }
            </Surface>
            { loading ? 
                <FlashList
                    numColumns={2}
                    data={new Array(12).fill(null)}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: width * .01 }}
                    renderItem={({ index }) => (
                        <BoxLoader 
                            key={index}
                            height={width * .49} 
                            width={width * .49} 
                            style={{
                                marginBottom: width * .01,
                                marginLeft: width * .005
                            }}
                        /> 
                    )}
                /> : (media && media.length > 0) ?
                <FlashList
                    numColumns={2}
                    data={media}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: width * .01 }}
                    onEndReachedThreshold={.3}
                    onEndReached={handleFetchMore}
                    renderItem={({ item }) => (
                        <Image key={item.id} 
                            source={{ uri: item.url }}
                            style={[styles.image, { 
                                width: width * .49,
                                height: width * .49,
                                marginBottom: width * .01,
                                marginLeft: width * .005
                            }]}
                        /> 
                    )}
                /> :
                <LocationsListEmpty 
                    scale={.8} 
                    fontSize={16} 
                    style={{ marginTop: '50%' }} 
                    caption={'No Media Available'}
                />
            }
        </View>
    );
};

export default MediaGridScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    heading: {
        height: 90,
        paddingTop: 24,
        paddingRight: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    image: {
        backgroundColor: '#e0e0e0',
    },
    add: {
        alignSelf: 'flex-end',
        marginBottom: 32,
        marginRight: 24
    },
    none: {
        maxWidth: '80%',
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'center',
        textAlign: 'center'
    }
});
