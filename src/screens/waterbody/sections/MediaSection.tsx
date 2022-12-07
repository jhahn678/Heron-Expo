import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { Button, Title } from "react-native-paper";
import ListFooterSeeMore from "../../../components/lists/shared/ListFooterSeeMore";
import ScrollViewListLoader from "../../../components/loaders/ScrollViewListLoader";
import { useGetWaterbodyMedia } from "../../../hooks/queries/useGetWaterbodyMedia";
import { MediaType } from "../../../types/Media";
import { ExploreStackScreenProps, MediaSource } from "../../../types/navigation";

interface Props {
    navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
    waterbody: number
    totalMedia: number | undefined
    name: string | undefined
}

const limit = 8;

const MediaSection = ({ navigation, waterbody, name, totalMedia: total=0 }: Props) => {

    const { data } = useGetWaterbodyMedia({ id: waterbody, limit })

    const navigateToImage = (id: number) => () => navigation.navigate('ViewImageScreen', { 
        id, type: MediaType.Waterbody, title: name })

    const navigateToMedia = () => navigation.navigate('MediaGridScreen', { 
        source: MediaSource.Waterbody,  title: name, id: waterbody, total })

    return (
        <View style={styles.container}>
            <View style={styles.divider}/>
            <View style={styles.header}>
                <Title style={styles.title}>Photos {`(${total})`}</Title>
                <Button onPress={navigateToMedia}>See all photos</Button>
            </View>
            { data ? 
                data.waterbody.media.length > 0 ?
                    <View style={styles.flashlist}>
                        <FlashList 
                            horizontal
                            estimatedItemSize={200}
                            data={data.waterbody.media.slice(0,limit)} 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 16 }}
                            ListFooterComponent={<ListFooterSeeMore onPress={navigateToMedia}/>}
                            renderItem={({ item }) => (
                                <Pressable onPress={navigateToImage(item.id)} style={styles.imageSurface}>
                                    <Image source={{ uri: item.url }} style={styles.image} resizeMode='cover'/>
                                </Pressable>
                            )}
                        />
                    </View>
                : null :  
                    <ScrollViewListLoader 
                        itemSize={{ height: 200, width: 200 }} 
                        contentContainerStyle={{ padding: 16 }}
                    />
            }
            <View style={styles.divider}/>
        </View>
    );
};

export default MediaSection;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        paddingLeft: 16,
        paddingRight: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: '600'
    },
    flashlist: {
        height: 232
    },
    imageSurface: {
        height: 200,
        width: 200,
        borderRadius: 12,
        marginRight: 12,
        marginTop: 24
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 12
    },
    divider: {
        marginHorizontal: 16,
        height: 1,
        backgroundColor: '#d9d9d9',
        marginVertical: 24
    }
});
