import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useReviewModalStore } from "../../../store/mutations/useReviewModalStore";
import { Button, ProgressBar, TextInput, Text } from "react-native-paper";

const ReviewBodyBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const [input, setInput] = useState('')
    const visible = useReviewModalStore(store => store.bodyVisible)
    const setVisible= useReviewModalStore(store => store.setBodyVisible)
    const setBody = useReviewModalStore(store => store.setBody)
    const setNextVisible = useReviewModalStore(store => store.setAddImagesVisible)

    const handleOnClose = () => { 
        if(visible) setVisible(false);
        setInput('') 
    }

    const handleNext = () => { 
        if(ref.current) ref.current.close(); 
        setBody(input); 
        setInput('')
        setNextVisible(true);
    }

    useEffect(() => { if(ref.current) visible ? ref.current.expand(): ref.current.close() },[visible])

    return (
        <BottomSheet 
            ref={ref}
            index={-1} 
            snapPoints={[370]}
            onClose={handleOnClose}
            animateOnMount={false}
            enablePanDownToClose={true}
            containerStyle={{ zIndex: 100 }}
        >
            <View style={styles.container}>
                <ProgressBar progress={.6} style={styles.progress}/>
                <View>
                    <Text style={styles.title}>Tell us a little about it</Text>
                    <TextInput 
                        value={input}
                        onChangeText={setInput}
                        placeholder={
                            "Include details such as " + 
                            "species observed and caught, regulations, " +
                            "water depth, access, facilities, etc." + `
                            
                            
                        `}
                        multiline={true} 
                        numberOfLines={8}
                        mode='outlined'
                    />
                </View>
                <Button 
                    style={styles.button}
                    onPress={handleNext}
                    mode="contained" 
                    disabled={input.length < 10}
                    theme={{ roundness: 2 }}
                >Next</Button>
            </View>
            
        </BottomSheet>
    );
};

export default ReviewBodyBottomSheet;

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
