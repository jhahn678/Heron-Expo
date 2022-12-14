import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ExploreStackScreenProps, ReviewQuery } from "../../../types/navigation";
import { Button, Text, Title } from 'react-native-paper'
import RatingDisplay from '../../../components/ratings/RatingDisplay'
import { GetWaterbodyReview, useGetWaterbodyReviews } from "../../../hooks/queries/useGetWaterbodyReviews";
import RatingGraph from "../../../components/ratings/RatingGraph";
import RatingGraphBar from "../../../components/ratings/RatingGraphBar";
import WaterbodyReview from "../../../components/lists/Reviews/WaterbodyReview";
import { useModalStore } from "../../../store/modal/useModalStore";
import { useAuth } from "../../../store/auth/useAuth";
import { IWaterbody } from "../../../types/Waterbody";
import { useReviewModalStore } from "../../../store/mutations/useReviewModalStore";

type Review = GetWaterbodyReview & { waterbody: Pick<IWaterbody, 'id' | 'name'> }

const { width } = Dimensions.get('screen')

interface Props {
  /** Waterbody ID */
  waterbody: number
  /** Refetch of waterbody query from parent element */
  onRefetch: () => void
  /** Waterbody name */
  name: string | undefined
  /** Total review count from main waterbody query */
  totalReviews: number | undefined
  /** Average rating from main waterbody query */
  averageRating: number | null | undefined
  navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
}

const ReviewsSection = ({ 
  name, 
  waterbody, 
  navigation,
  totalReviews, 
  averageRating, 
  onRefetch 
}: Props) => {

  const isAuthenticated = useAuth(store => store.isAuthenticated)

  const { data, refetch: refetchReviews } = useGetWaterbodyReviews({ id: waterbody, limit: 3 });

  const [ratingCounts, setRatingCounts] = useState({ five: 0, four: 0, three: 0, two: 0, one: 0 })
  const [reviews, setReviews]= useState<Review[]>([])

  const navigateUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })
  const navigateEdit = (id: number) => () => navigation.navigate('EditReviewScreen', { id })
  
  const startReview = useReviewModalStore(store => store.startWaterbodyReview)
  const showAuthModal = useModalStore(store => store.setAuth)

  const handleReviewRefetch = () => { refetchReviews(); onRefetch() }

  const handleStartReview = () => {
    if(data) isAuthenticated ? 
      startReview({ 
        waterbody, 
        name: data.waterbody.name,
        refetch: handleReviewRefetch 
      })
      : showAuthModal(true)
  }

  const navigateReviews = () => navigation
  .navigate('ReviewsScreen', { 
    title: name, 
    total: totalReviews, 
    id: waterbody, 
    type: ReviewQuery.Waterbody
  })

  useEffect(() => {
    if(data && totalReviews) {
      const { rating_counts } = data.waterbody;
      setRatingCounts({
        one: rating_counts.one / totalReviews * 100,
        two: rating_counts.two / totalReviews * 100,
        three: rating_counts.three / totalReviews * 100,
        four: rating_counts.four / totalReviews * 100,
        five: rating_counts.five / totalReviews * 100,
      })
    }
    if(data){
      setReviews(data.waterbody.reviews.map(x => ({
        ...x, waterbody: {
          id: data.waterbody.id,
          name: data.waterbody.name
        }
      })))
    }
  },[data, totalReviews])

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Title style={styles.title}>
          Reviews {totalReviews !== undefined ? `(${totalReviews})` : null}
        </Title>
        <Button style={{ marginLeft: 16 }} onPress={navigateReviews}>
          See all reviews
        </Button>
      </View>

      <View style={styles.main}>

        <RatingGraph width={width*.55}>
          <RatingGraphBar label="5" percent={ratingCounts.five}/>
          <RatingGraphBar label="4" percent={ratingCounts.four}/>
          <RatingGraphBar label="3" percent={ratingCounts.three}/>
          <RatingGraphBar label="2" percent={ratingCounts.two}/>
          <RatingGraphBar label="1" percent={ratingCounts.one}/>
        </RatingGraph>

        <View style={styles.summary}>
          <Text style={styles.average}>{averageRating ? averageRating.toFixed(1) : "N/A"}</Text>
          <RatingDisplay 
            hideLabel
            iconSize={20}
            rating={averageRating} 
            numberOfRatings={totalReviews}
            />
          <Text style={styles.total}>{totalReviews} reviews</Text>
        </View>

      </View>

      <Button 
        mode="contained"
        style={styles.leaveReview}
        onPress={handleStartReview}
        theme={{ roundness: 2 }}
      >Leave a review</Button>

      <View style={styles.listSection}>
        { reviews.map(x => (
          <WaterbodyReview 
            data={x} 
            key={x.id} 
            refetch={refetchReviews}
            navigateToEdit={navigateEdit(x.id)}
            navigateToUser={navigateUser(x.user.id)}
          /> 
        ))}
      </View>

      { totalReviews && totalReviews > 3 ?
        <Button 
          style={styles.leaveReview}
          onPress={navigateReviews}
        >Show more reviews</Button>
      :null}
      
    </View>
  );
};

export default ReviewsSection;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16
  },
  header: {
    width,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingRight: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: '600'
  },
  main: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summary: {
    marginLeft: 16,
    marginBottom: 16,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  average: {
    fontWeight: '400',
    fontSize: 36
  },
  total: {
    marginTop: 4
  },
  listSection: {
    marginTop: 24
  },
  leaveReview: {
    marginTop: 16,
    marginHorizontal: 24,
  }
});
