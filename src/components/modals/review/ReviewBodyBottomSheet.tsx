import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useReviewModalStore } from "../../../store/mutations/useReviewModalStore";
import { Button, ProgressBar, TextInput, Text } from "react-native-paper";
import globalStyles from "../../../globalStyles";
const { width } = Dimensions.get('screen')

interface Props {
    visible: boolean
    onSubmit: () => void
    onBack: () => void
    onClose: () => void
}

const ReviewBodyBottomSheet = ({ visible, onSubmit, onClose, onBack }: Props) => {

    const ref = useRef<BottomSheet | null>(null)
    const [input, setInput] = useState('')
    const setBody = useReviewModalStore(store => store.setBody)

    const handleBack = () => {
        if(ref.current) ref.current.close();
        onBack()
    }

    const handleSubmit = () => {
        if(ref.current) ref.current.close();
        setBody(input); onSubmit();
    }

    if(!visible) return null;

    return (
        <BottomSheet 
            ref={ref} 
            snapPoints={[400]}
            onClose={onClose}
            enablePanDownToClose={true}
            containerStyle={{ zIndex: 100 }}
        >
            <View style={styles.container}>
                <ProgressBar progress={.6} style={styles.progress}/>
                <View>
                    <Text style={styles.title} variant={"titleSmall"}>
                        Tell us a little about it
                    </Text>
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
                <View style={globalStyles.frsb}>
                    <Button 
                        style={styles.button}
                        onPress={handleBack}
                        mode={"contained"} 
                        icon={'arrow-left'}
                        theme={{ roundness: 1 }}
                    >Last</Button>
                    <Button 
                        style={styles.button}
                        onPress={handleSubmit}
                        mode={"contained"} 
                        disabled={input.length < 10}
                        icon={'arrow-right'}
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        theme={{ 
                            roundness: 1, 
                            colors: { surfaceDisabled: '#d9d9d9'} 
                        }}
                    >Next</Button>
                </View>
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
        marginBottom: 40,
        paddingHorizontal: 24,
        justifyContent: 'space-between'
    },
    progress: {
        marginHorizontal: 16
    },
    button: {
        height: 40,
        width: width / 2 - 50
    },
    title: {
        fontSize: 18,
        marginBottom: 12,
        alignSelf: 'center'
    }
})
