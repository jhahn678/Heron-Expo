import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useReviewModalStore } from "../../../store/mutations/useReviewModalStore";
import RatingInput from "../../ratings/RatingInput";
import { Button, ProgressBar, Text } from "react-native-paper";

const ReviewRatingBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    
    const name = useReviewModalStore(store => store.name)
    const rating = useReviewModalStore(store => store.rating)
    const visible = useReviewModalStore(store => store.ratingVisible)
    const setRating = useReviewModalStore(store => store.setRating)
    const setVisible = useReviewModalStore(store => store.setRatingVisible)
    const setNextVisible = useReviewModalStore(store => store.setBodyVisible)

    const handleOnClose = () => { if(visible) setVisible(false) };
    const handleNext = () => { if(ref.current) ref.current.close(); setNextVisible(true); };
    useEffect(() => { if(ref.current) visible ? ref.current.expand(): ref.current.close() },[visible])
    
    return (
        <BottomSheet 
            ref={ref}
            index={visible ? 0 : -1} 
            snapPoints={[320]}
            onClose={handleOnClose}
            enablePanDownToClose={true}
            containerStyle={{ zIndex: 100 }}
        >
            <View style={styles.container}>
                <ProgressBar progress={.3} style={styles.progress}/>
                <View>
                    <RatingInput 
                        iconSize={48}
                        value={rating || 0}
                        setValue={setRating}
                        style={styles.rating}
                    />
                    <Text style={styles.caption}>
                        How was your experience at {name}?
                    </Text>
                </View>
                <Button 
                    style={styles.button}
                    onPress={handleNext}
                    mode={"contained"} 
                    disabled={rating === null}
                    theme={{ roundness: 1 }}
                >Next</Button>
            </View>
        </BottomSheet>
    );
};

export default ReviewRatingBottomSheet;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 32,
        marginBottom: 40,
        paddingHorizontal: 24,
        justifyContent: 'space-between'
    },
    progress: {
        marginHorizontal: 16
    },
    button: {
       height: 40,
    },
    rating: {
        alignSelf: 'center',
        marginLeft: 16
    },
    caption: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '500',
        marginTop: 16
    }
});
