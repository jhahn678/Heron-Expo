import { StyleSheet, View, Image, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { MediaSource, RootStackScreenProps } from "../../types/navigation";
import { GetWaterbodyMedia, useGetWaterbodyMedia } from "../../hooks/queries/useGetWaterbodyMedia";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Surface, Title } from "react-native-paper";
import BoxLoader from "../../components/loaders/BoxLoader";
import globalStyles from "../../globalStyles";
import { GetUserMediaRes, useGetUserMedia } from "../../hooks/queries/useGetUserMedia";
import LocationsListEmpty from "../../components/lists/shared/LocationsListEmpty";
import { theme } from "../../config/theme";
import { MediaType } from "../../types/Media";
import { useBottomSheetStore } from "../../store/modal/useBottomSheetStore";
import WaterbodyMediaUploadModal from "../../components/modals/WaterbodyMediaUploadModal";

const limit = 24;
const { width } = Dimensions.get('screen')  

type Data = GetWaterbodyMedia['waterbody']['media'] | GetUserMediaRes['user']['media']

const MediaGridScreen = ({ navigation, route }: RootStackScreenProps<'MediaGridScreen'>) => {

    const { params: { title, source, id, total } } = route;

    const [media, setMedia] = useState<Data>([])
    const [loading, setLoading] = useState(true)
    const [allowAdd, setAllowAdd] = useState(false)
    const setUploadVisible = useBottomSheetStore(store => store.setMediaGridUpload)
    const uploadVisible = useBottomSheetStore(store => store.mediaGridUpload)
    const handleAddImages = () => setUploadVisible(id)

    const { 
        data: waterbodyMedia, 
        loading: waterbodyLoading,
        fetchMore: fetchMoreWaterbodyMedia,
    } = useGetWaterbodyMedia({ 
        id, limit, 
        skip: source !== MediaSource.Waterbody, 
        initialFetchPolicy: 'cache-and-network' 
    })

    const { 
        data: userMedia, 
        loading: userLoading,
        fetchMore: fetchMoreUserMedia,
    } = useGetUserMedia({ id, limit, skip: source !== MediaSource.User })

    useEffect(() => {
        switch(source){
            case MediaSource.User:
                setAllowAdd(false)
                if(!userMedia) return;
                setMedia(userMedia.user.media);
                break;
            case MediaSource.Waterbody:
                setAllowAdd(true)
                if(!waterbodyMedia) return;
                setMedia(waterbodyMedia.waterbody.media);
                break;
        }
    },[waterbodyMedia, userMedia])

    useEffect(() => {
        setLoading((waterbodyLoading || userLoading) && media.length === 0)
    },[waterbodyLoading, userLoading])

    const handleFetchMore = () => {
        if(media.length === 0 || media.length % limit !== 0) return;
        switch(source){
            case MediaSource.User:
                return fetchMoreUserMedia({ variables: { offset: media.length } })
            case MediaSource.Waterbody:
                return fetchMoreWaterbodyMedia({ variables: { offset: media.length } })
        }
    }

    const navigateImage = (id: number) => () => navigation
        .navigate('ViewImageScreen', { type: MediaType.Waterbody, id })

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
                /> : 
                <FlashList
                    numColumns={2}
                    data={media}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: width * .01 }}
                    onEndReachedThreshold={.3}
                    onEndReached={handleFetchMore}
                    ListEmptyComponent={
                        <LocationsListEmpty 
                            scale={.8} 
                            fontSize={16} 
                            style={{ marginTop: '50%' }} 
                            caption={'No Media Available'}
                        />
                    }
                    renderItem={({ item }) => (
                        <Pressable onPress={navigateImage(item.id)}>
                            <Image 
                                key={item.id}
                                source={{ uri: item.url }}
                                style={[styles.image, { 
                                    width: width * .49,
                                    height: width * .49,
                                    marginBottom: width * .01,
                                    marginLeft: width * .005
                                }]}
                            /> 
                        </Pressable>
                    )}
                />
            }
            <WaterbodyMediaUploadModal visible={uploadVisible} setVisible={setUploadVisible}/>
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
