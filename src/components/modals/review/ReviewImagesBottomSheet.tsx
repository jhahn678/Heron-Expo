import { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text, Button, ProgressBar } from 'react-native-paper'
import BottomSheet from '@gorhom/bottom-sheet'
import BottomSheetImageInput from "../../inputs/BottomSheetImageInput";
const { width } = Dimensions.get('screen')
interface Props {
    visible: boolean
    onSubmit: () => Promise<void>
    onBack: () => void
    onClose: () => void
}

const ReviewImagesBottomSheet = ({ visible, onSubmit, onBack, onClose }: Props) => {

    const ref = useRef<BottomSheet | null>(null)

    const handleBack = () => {
        if(ref.current) ref.current.close();
        onBack()
    }

    const handleSubmit = () => {
        if(ref.current) ref.current.close();
        onSubmit();
    }

    if(!visible) return null;

    return (
        <BottomSheet
            ref={ref}
            snapPoints={[380]}
            onClose={onClose}
            enablePanDownToClose={true}
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
                <View style={styles.buttons}>
                    <Button 
                        style={styles.button}
                        onPress={handleBack}
                        mode={"contained"} 
                        icon={'arrow-left'}
                        theme={{ roundness: 1 }}
                    >Last</Button>
                    <Button 
                        onPress={handleSubmit}
                        mode={"contained"} 
                        style={styles.button}
                        icon={'check'}
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        theme={{ roundness: 1 }}
                    >Save</Button>
                </View>
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
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 24
    },
    button: {
        height: 40,
        width: width / 2 - 48
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
