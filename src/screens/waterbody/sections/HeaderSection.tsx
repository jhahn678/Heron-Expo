import React from "react";
import { StyleSheet,  View } from "react-native";
import { Title, Text } from "react-native-paper";
import WaterbodyHeaderLoader from "../../../components/loaders/WaterbodyHeaderLoader";
import RatingDisplay from "../../../components/ratings/RatingDisplay";
import { GetWaterbody } from "../../../hooks/queries/useGetWaterbody";
import { useAuth } from "../../../store/auth/useAuth";
import { useModalStore } from "../../../store/modal/useModalStore";
import { useReviewModalStore } from "../../../store/mutations/useReviewModalStore";
import { ExploreStackScreenProps, ReviewQuery } from "../../../types/navigation";
import { waterbodyLocationLabel } from "../../../utils/conversions/waterbodyLocationToLabel";

interface Props {
    id: number
    data: GetWaterbody | undefined
    refetch: () => void
    navigation:  ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
}

const HeaderSection = ({ navigation, data, id, refetch }: Props) => {

    const isAuthenticated = useAuth(store => store.isAuthenticated)
    const showAuthModal = useModalStore(store => store.setAuth)
    const startReview = useReviewModalStore(store => store.startWaterbodyReview)

    const handleReviews = () => {
        if(data && data.total_reviews === 0) {
            if(!isAuthenticated) return showAuthModal(true)
            startReview({ waterbody: id, name: data.name, refetch })
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
