import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { Button, Title } from "react-native-paper";
import ListFooterSeeMore from "../../../components/lists/shared/ListFooterSeeMore";
import { useGetWaterbodyMedia } from "../../../hooks/queries/useGetWaterbodyMedia";
import { MediaType } from "../../../types/Media";
import { ExploreStackScreenProps, MediaSource } from "../../../types/navigation";

interface Props {
    navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
    waterbody: number
    totalMedia: number | undefined
    name: string | undefined
}

const LIMIT = 8;

const MediaSection = ({ navigation, waterbody, name, totalMedia }: Props) => {

    const { data, loading, error } = useGetWaterbodyMedia({ id: waterbody, limit: LIMIT })
    
    const navigateToImage = (id: number) => () => navigation.navigate('ViewImageScreen', { 
        id, type: MediaType.Waterbody, title: name })

    const navigateToMedia = () => navigation.navigate('MediaGridScreen', { 
        title: name, source: MediaSource.Waterbody, id: waterbody, total: totalMedia })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Title style={styles.title}>Photos {`(${totalMedia || 0})`}</Title>
                <Button onPress={navigateToMedia}>See all photos</Button>
            </View>
            { (data && data?.waterbody.media.length > 0) &&
                <FlashList horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data.waterbody.media} 
                    contentContainerStyle={{ paddingLeft: 16, paddingTop: 16 }}
                    estimatedItemSize={200}
                    ListFooterComponent={<ListFooterSeeMore onPress={navigateToMedia}/>}
                    renderItem={({ item }) => (
                        <Pressable onPress={navigateToImage(item.id)} style={styles.imageSurface}>
                            <Image source={{ uri: item.url }} style={styles.image} resizeMode='cover'/>
                        </Pressable>
                    )}
                />
            }
        </View>
    );
};

export default MediaSection;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: 'rgba(0,0,0,.1)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingBottom: 24,
        paddingTop: 16
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
    imageSurface: {
        height: 200,
        width: 200,
        borderRadius: 12,
        marginRight: 8,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 12
    }
});
