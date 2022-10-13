import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import LoadingBackdrop from "../../../components/loaders/LoadingBackdrop";
import RatingInput from "../../../components/ratings/RatingInput";
import { useEditReview } from "../../../hooks/mutations/useEditReview";
import { useGetReview } from "../../../hooks/queries/useGetReview";
import { RootStackScreenProps } from "../../../types/navigation";
import HeaderSection from "./sections/HeaderSection";

const EditReviewScreen = ({ navigation, route }: RootStackScreenProps<'EditReviewScreen'>) => {

    const { params: { id } } = route;
    const { data, loading } = useGetReview(id)
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
    }).then(navigation.goBack)

    return (
        <View style={styles.container}>
            <HeaderSection navigation={navigation}/>
            <ScrollView contentContainerStyle={styles.content}>
                <RatingInput 
                    iconSize={48} 
                    setValue={setRating} 
                    style={styles.rating}
                    value={rating}
                />
                <Text style={styles.caption}>
                    How was your experience at {data?.waterbodyReview.waterbody.name}?
                </Text>
                <TextInput
                    value={text || ""} 
                    mode='outlined'
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
                    mode='contained' 
                    style={styles.button}
                    onPress={handleSave} 
                >Save</Button>
            </ScrollView>
            { loading && <LoadingBackdrop/>}
        </View>
    );
};

export default EditReviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        paddingHorizontal: 24,
        paddingVertical: 48,
    },
    rating: {
        marginLeft: 16,
        alignSelf: 'center'
    },
    caption: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 32,
        alignSelf: 'center'
    },
    button: {
        marginTop: 24,
        borderRadius: 6
    }
});
