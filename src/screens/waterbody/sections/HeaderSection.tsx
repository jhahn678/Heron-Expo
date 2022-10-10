import React from "react";
import { StyleSheet,  View } from "react-native";
import { Title, Text } from "react-native-paper";
import WaterbodyHeaderLoader from "../../../components/loaders/WaterbodyHeaderLoader";
import RatingDisplay from "../../../components/ratings/RatingDisplay";
import { GetWaterbody } from "../../../hooks/queries/useGetWaterbody";
import { useReviewModalStore } from "../../../store/mutations/useReviewModalStore";
import { ExploreStackScreenProps, ReviewQuery } from "../../../types/navigation";
import { waterbodyLocationLabel } from "../../../utils/conversions/waterbodyLocationToLabel";

interface Props {
    id: number
    data: GetWaterbody | undefined
    navigation:  ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
}

const HeaderSection = ({ navigation, data, id }: Props) => {

    const showReviewModal = useReviewModalStore(store => store.showWaterbodyReview)

    const handleReviews = () => {
        if(data && data.total_reviews === 0) {
            showReviewModal({ waterbody: id, name: data.name })
        }else if(data){
            navigation.navigate('ReviewsScreen', { 
                type: ReviewQuery.Waterbody, 
                id: data.id, title: data.name,
                total: data.total_reviews
            })
        }
    }
    
    return (
        <View style={styles.header}>
            <View>
            { data ? 
                <>
                    <Title style={styles.title}>{data.name}</Title>
                    <Text style={styles.location}>{waterbodyLocationLabel(data)}</Text>
                    <RatingDisplay 
                        onPress={handleReviews} 
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
        paddingVertical: 24,
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
