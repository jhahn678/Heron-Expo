import { StyleSheet, View } from "react-native";
import { IMedia } from "../../../types/Media";

interface Props<T> {
    media: T,
    currentIndex: number | null
}

const ImagePagination = <T extends Pick<IMedia, 'id' | 'url'>[]>({ media, currentIndex }: Props<T>) => {

  return (
    <View style={styles.indexbar}>
        {media.map((x, index) => (
            <View key={x.id} style={[styles.dot, {
            backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,.6)',
            height: index === currentIndex ? 7 : 6,
            width: index === currentIndex ? 7 : 6,
            }]}/>
        ))}
    </View>
  );
};

export default ImagePagination;

const styles = StyleSheet.create({
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
