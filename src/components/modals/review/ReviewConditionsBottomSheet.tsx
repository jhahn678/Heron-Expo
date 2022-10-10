import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useReviewModalStore } from "../../../store/mutations/useReviewModalStore";
import { Button, ProgressBar, Text } from "react-native-paper";
import { useImageStore } from "../../../store/image/useImageStore";
import { useCreateWaterbodyReview } from "../../../hooks/mutations/useCreateWaterbodyReview";


const ReviewConditionsBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const visible = useReviewModalStore(store => store.conditionsVisible)
    const setVisible = useReviewModalStore(store => store.setConditionsVisible)
    const setConditions = useReviewModalStore(store => store.setConditions)
    const reset = useReviewModalStore(store => store.reset)
    const input = useReviewModalStore(store => ({
        waterbody: store.waterbody,
        rating: store.rating,
        text: store.body,
        conditions: store.conditions
    }))    

    const images = useImageStore(store => store.images)
    const clearImages = useImageStore(store => store.clearImages)
    const [createReview, { loading }] = useCreateWaterbodyReview()
    const handleOnClose = () => { if(visible) setVisible(false) };
    useEffect(() => { if(ref.current) visible ? ref.current.expand(): ref.current.close() },[visible])

    const handleSaveReview = async () => {

    }

    return (
        <BottomSheet 
            ref={ref}
            index={-1} 
            snapPoints={['45%']}
            onClose={handleOnClose}
            animateOnMount={false}
            enablePanDownToClose={true}
            containerStyle={{ zIndex: 100 }}
        >
            <View style={styles.container}>
                <ProgressBar progress={.4} style={styles.progress}/>
                <View>
                    <Text style={styles.title}>Any conditions</Text>
                </View>
                <Button 
                    style={styles.button}
                    onPress={handleSaveReview}
                    mode="contained" 
                    theme={{ roundness: 2 }}
                >Submit</Button>
            </View>
            
        </BottomSheet>
    );
};

export default ReviewConditionsBottomSheet;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 32,
        marginBottom: 24,
        paddingHorizontal: 24,
        justifyContent: 'space-between'
    },
    progress: {
        marginHorizontal: 16
    },
    button: {
        height: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 12,
        alignSelf: 'center'
    }
})
