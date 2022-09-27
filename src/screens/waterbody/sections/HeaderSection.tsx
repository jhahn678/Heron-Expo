import React from "react";
import { StyleSheet,  View } from "react-native";
import { Title, Text } from "react-native-paper";
import WaterbodyHeaderLoader from "../../../components/loaders/WaterbodyHeaderLoader";
import RatingDisplay from "../../../components/ratings/RatingDisplay";
import { GetWaterbody } from "../../../hooks/queries/useGetWaterbody";
import { useModalStore } from "../../../store/modal/useModalStore";

interface Props {
    id: number
    data: GetWaterbody | undefined
}

const HeaderSection = ({ data, id }: Props) => {

    const showReviewModal = useModalStore(store => store.setReview)

    const handleStartReview = () => showReviewModal(id)
    return (
        <View style={styles.header}>
            <View>
            { data ? 
                <>
                    <Title style={styles.title}>{data.name}</Title>
                    <Text style={styles.location}>{
                        data.admin_one && data.admin_one.length > 0 ? 
                        data.admin_two && data.admin_two.length === 1 ?
                        `${data.admin_two[0]}, ${data.admin_one[0]}` :
                        data.admin_one.length === 1 ?
                        `${data.admin_one[0]}, ${data.country}` :
                        `${data.admin_one[0]} + ${data.admin_one.length - 1} more, ${data.ccode}` :    
                        data.subregion ?
                        `${data.subregion} ${data.country}` :
                        `${data.country}`
                    }</Text>
                    <RatingDisplay 
                        onPress={handleStartReview} 
                        style={{ marginTop: 16 }} 
                        numberOfRatings={data.total_reviews} 
                        rating={data.average_rating}
                    />
                </> :
                <WaterbodyHeaderLoader/>
            }
            </View>
        </View>
    );
};

export default HeaderSection;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontWeight: '600',
        fontSize: 28,
        paddingBottom: 2
    },
    location: {
        fontWeight: '500',
        fontSize: 20
    }
});
