import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ExploreStackScreenProps } from "../../../types/navigation";
import { Button, Text, Title } from 'react-native-paper'
import RatingDisplay from '../../../components/ratings/RatingDisplay'
import { useGetWaterbodyReviews } from "../../../hooks/queries/useGetWaterbodyReviews";

import RatingGraph from "../../../components/ratings/RatingGraph";
import RatingGraphBar from "../../../components/ratings/RatingGraphBar";
import WaterbodyReview from "../../../components/lists/Reviews/WaterbodyReview";
import { useModalStore } from "../../../store/modal/useModalStore";

const { width } = Dimensions.get('screen')

interface Props {
  navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
  totalReviews: number | undefined
  waterbody: number
  averageRating: number | null | undefined
  name: string | undefined
}

const ReviewsSection = ({ navigation, waterbody, totalReviews, averageRating, name }: Props) => {

  const { data, refetch } = useGetWaterbodyReviews({ id: waterbody });

  const [ratingCounts, setRatingCounts] = useState({ five: 0, four: 0, three: 0, two: 0, one: 0 })

  const navigateUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

  const showReviewModal = useModalStore(store => () => store.setReview(waterbody))

  const navigateReviews = () => navigation.navigate('ReviewsScreen', { 
    waterbody, title: name, total: totalReviews
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
        onPress={showReviewModal}
      >Leave a review</Button>

      <View style={styles.listSection}>
          { data && data.waterbody.reviews.slice(0,3).map((x) => (
            <WaterbodyReview 
              key={x.id} data={x} 
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
    borderColor: 'rgba(0,0,0,.1)',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: '500',
  },
  main: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
