import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, ProgressBar } from 'react-native-paper'
import BottomSheet from '@gorhom/bottom-sheet'
import { useReviewModalStore } from "../../../store/mutations/useReviewModalStore";
import BottomSheetImageInput from "../../inputs/BottomSheetImageInput";

interface Props {
    onSubmit: () => Promise<void>
}

const ReviewImagesBottomSheet = ({ onSubmit }: Props) => {

    const ref = useRef<BottomSheet | null>(null)
    const visible = useReviewModalStore(store => store.addImagesVisible)
    const setVisible = useReviewModalStore(store => store.setAddImagesVisible) 

    const handleOnClose = () => { if(visible) setVisible(false) };
    useEffect(() => { if(ref.current) visible ? ref.current.expand(): ref.current.close() },[visible])

    const handleSubmit = () => onSubmit().then(() => { ref.current?.close() })

    return (
        <BottomSheet
            ref={ref}
            index={visible ? 0 : -1} 
            snapPoints={[380]}
            onClose={handleOnClose}
            animateOnMount={false}
            enableContentPanningGesture={true}
            containerStyle={{ zIndex: 100 }}
        >
            <View style={styles.container}>
                <ProgressBar progress={.70} style={styles.progress}/>
                <View>
                    <Text 
                        style={styles.title} 
                        variant={"titleSmall"}
                    >Have any pictures to share?</Text>
                    <BottomSheetImageInput/>
                </View>
                <Button 
                    onPress={handleSubmit}
                    mode={"contained"} 
                    style={styles.button}
                    theme={{ roundness: 1 }}
                >Submit Review</Button>
            </View>
        </BottomSheet>
    );
};

export default ReviewImagesBottomSheet;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 32,
        marginBottom: 40,
        justifyContent: 'space-between'
    },
    progress: {
        marginHorizontal: 40
    },
    button: {
        height: 40,
        marginHorizontal: 24
    },
    title: {
        fontSize: 18,
        marginVertical: 12,
        alignSelf: 'center'
    },
    images: {
        paddingHorizontal: 0,
        paddingBottom: 16
    }
});
