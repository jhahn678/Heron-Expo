import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import LoadingBackdrop from "../../../components/loaders/LoadingBackdrop";
import RatingInput from "../../../components/ratings/RatingInput";
import { useEditReview } from "../../../hooks/mutations/useEditReview";
import { useGetReview } from "../../../hooks/queries/useGetReview";
import { useModalStore } from "../../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../../types/navigation";
import HeaderSection from "./sections/HeaderSection";

const EditReviewScreen = ({ navigation, route }: RootStackScreenProps<'EditReviewScreen'>) => {

    const { params: { id } } = route;
    const { data, loading } = useGetReview(id)
    const setSnack = useModalStore(store => store.setSnack)
    const [saveReview] = useEditReview()
    const [rating, setRating] = useState(0)
    const [text, setText] = useState<string | null>(null)

    useEffect(() => {
        if(data){
            setText(data.waterbodyReview.text)
            setRating(data.waterbodyReview.rating)
        }
    },[data])

    const handleSave = () => saveReview({ 
        variables: { id, input: { rating, text } } 
    }).then(() => { navigation.goBack(); setSnack('Review updated') })

    return (
        <View>
            <HeaderSection navigation={navigation}/>
            <ScrollView contentContainerStyle={styles.container}>
                <Card style={styles.card}>
                    <RatingInput 
                        iconSize={48} 
                        setValue={setRating} 
                        style={styles.rating}
                        value={rating}
                    />
                    <Text style={styles.caption} variant={"titleMedium"}>
                        How was your fishing experience?
                    </Text>
                    <TextInput
                        value={text || ""} 
                        mode={'outlined'}
                        multiline={true} 
                        numberOfLines={12}
                        onChangeText={setText}
                        placeholder={
                            "Include details such as " + 
                            "species observed and caught, regulations, " +
                            "water depth, access, facilities, etc."
                        }
                    />
                    <Button 
                        mode={'contained'}
                        style={styles.button}
                        onPress={handleSave}
                        theme={{ roundness: 1 }}
                    >Save</Button>
                </Card>
            </ScrollView>
            { loading && <LoadingBackdrop/>}
        </View>
    );
};

export default EditReviewScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    card: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        paddingTop: 48
    },
    rating: {
        marginLeft: 16,
        alignSelf: 'center'
    },
    caption: {
        marginVertical: 24,
        alignSelf: 'center'
    },
    button: {
        marginTop: 16,
    }
});
