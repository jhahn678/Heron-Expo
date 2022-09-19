import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../types/navigation";
import { useGetWaterbodyMedia } from "../../hooks/queries/useGetWaterbodyMedia";
import { FlashList } from "@shopify/flash-list";
import { FAB, IconButton, Surface, Title } from "react-native-paper";
import BoxLoader from "../../components/loaders/BoxLoader";
import { useModalStore } from "../../store/modal/useModalStore";
import { useImageStore } from "../../store/image/useImageStore";
import { useImagePicker } from "../../hooks/utils/useImagePicker";
import globalStyles from "../../globalStyles";

const MediaGridScreen = ({ navigation, route }: RootStackScreenProps<'MediaGridScreen'>) => {
 
    const { params } = route;
    const { width, height } = Dimensions.get('screen')        
    const [hasMore, setHasMore] = useState(false)
    const { openImagePicker } = useImagePicker()
    const setImages = useImageStore(state => state.setImages)
    const showConfirmUpload = useModalStore(state => state.setConfirmUpload)
    const { data, loading, error, fetchMore } = useGetWaterbodyMedia({ id: params.waterbody })

    const handleAddImages = async () => {
        const result = await openImagePicker()
        if(!result) return;
        setImages(result)
        showConfirmUpload(params.waterbody, true)
    }

    useEffect(() => {
        if(data && params.total){
            setHasMore(params.total > data.waterbody.media.length)
        }
    }, [data, params.total])

    return (
        <View style={styles.container}>
            <Surface style={styles.heading}>
                <View style={globalStyles.frsb}>
                    <IconButton icon='arrow-left' onPress={navigation.goBack}/>
                    <Title style={{ fontWeight: '500' }}>
                        {params.title} {params.total !== undefined && `(${params.total})`}
                    </Title>
                </View>
                <IconButton icon='plus' onPress={handleAddImages} size={28}/>
            </Surface>
            <FlashList
                numColumns={2}
                data={data ? data.waterbody.media : new Array(12).fill(null)}
                renderItem={({ item }) => (
                    data ?
                    <Image key={item} 
                        source={{ uri: '1' }}
                        style={[styles.image, { 
                            width: width * .49,
                            height: width * .49,
                            marginBottom: width * .01,
                            marginLeft: width * .005
                        }]}
                    /> :
                    <BoxLoader 
                        height={width * .49} 
                        width={width * .49} 
                        style={{
                            marginBottom: width * .01,
                            marginLeft: width * .005
                        }}
                    />
                )}
                estimatedItemSize={200}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: width * .01 }}
                onEndReachedThreshold={.3}
                onEndReached={hasMore ? () => fetchMore({ variables: 
                    { offset: data!.waterbody.media.length }
                }): null}
            /> 
            { 
                (
                    (params.total && params.total === 0) || 
                    (data && data.waterbody.media.length === 0)
                ) && 
                <Text style={[styles.none, { marginBottom: height*.6}]}>
                    No uploaded images of {params.title}
                </Text> 
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
