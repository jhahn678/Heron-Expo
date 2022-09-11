import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { ExploreStackScreenProps } from "../../../types/navigation";
import { Button, Text, Title } from 'react-native-paper'
import Avatar from '../../../components/users/Avatar'
import RatingDisplay from '../../../components/ratings/RatingDisplay'
import { GetWaterbodyReviews, useGetWaterbodyReviews } from "../../../hooks/queries/useGetWaterbodyReviews";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RatingGraph from "../../../components/ratings/RatingGraph";
import RatingGraphBar from "../../../components/ratings/RatingGraphBar";
import ContentLoader from "react-content-loader";
import WaterbodyReview from "../../../components/lists/Reviews/WaterbodyReview";
import { useModalStore } from "../../../store/modal/useModalStore";

interface Props {
  navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
  totalReviews: number | undefined
  waterbody: number
  rating: number | undefined | null
  name: string | undefined
}

/** @TODO need to add review metrics into query and remove from other */

const ReviewsSection = ({ 
  navigation, waterbody, totalReviews, rating, name
}: Props) => {

  const { width } = Dimensions.get('screen')
  // const { data, error, loading } = useGetWaterbodyReviews({ id: waterbody });
  const navigateUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })
  const showReviewModal = useModalStore(store => () => store.setReview(waterbody))
  const navigateReviews = () => navigation.navigate('ReviewsScreen', { 
    waterbody, title: name, total: totalReviews
  })

  const data: GetWaterbodyReviews = {
    waterbody: {
      reviews: [{
        id: 10,
        created_at: new Date(),
        rating: 4,
        text: 'It was a really great place to be',
        user: {
            id: 12,
            avatar: null,
            fullname: 'Julian Hahn'
        }
      },{
        id: 11,
        created_at: new Date(),
        rating: 5,
        text: 'It was a really great place to be',
        user: {
            id: 15,
            avatar: null,
            fullname: 'Julian Han'
        }
      }]
  }
}

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Title style={styles.title}>
          Reviews {totalReviews !== undefined ? `(${totalReviews})` : null}
        </Title>
        <Button 
          style={{ marginLeft: 16 }}
          onPress={navigateReviews}
        >
          See all reviews
        </Button>
      </View>

      <View style={styles.main}>

        <RatingGraph width={width*.55}>
          <RatingGraphBar label="5" percent={80}/>
          <RatingGraphBar label="4" percent={12}/>
          <RatingGraphBar label="3" percent={6}/>
          <RatingGraphBar label="2" percent={2}/>
          <RatingGraphBar label="1" percent={0}/>
        </RatingGraph>

        <View style={styles.summary}>
          <Text style={styles.average}>{4.8}</Text>
          <RatingDisplay 
            hideLabel
            iconSize={20}
            rating={rating} 
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
          { data && data.waterbody.reviews.map((x) => (
            <WaterbodyReview 
              key={x.id} data={x} 
              navigateToUser={navigateUser(x.user.id)}
            />
          ))}
      </View>

      <Button 
        style={styles.leaveReview}
        onPress={navigateReviews}
      >Show more reviews</Button>
      
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
