import globalStyles from "../../globalStyles";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ReviewQuery, RootStackScreenProps } from '../../types/navigation'
import WaterbodyReview from "../../components/lists/Reviews/WaterbodyReview";
import { Divider, IconButton, Menu, Surface, Title } from "react-native-paper";
import { GetWaterbodyReview, ReviewSort, useGetWaterbodyReviews } from "../../hooks/queries/useGetWaterbodyReviews";
import ListHeaderFilterBar from "../../components/lists/shared/ListHeaderFilterBar";
import { reviewSortToLabel } from "../../utils/conversions/reviewSortToLabel";
import ReviewsListEmpty from "../../components/lists/shared/ReviewsListEmpty";
import { GetUserReviewsRes, useGetUserReviews } from "../../hooks/queries/useGetUserReviews";
import { theme } from "../../config/theme";
import { IWaterbody } from "../../types/Waterbody";
import RectangleLoader from "../../components/loaders/RectangleLoader";

const limit = 12;
const { width } = Dimensions.get('screen')

export type WaterbodyReviews = (GetWaterbodyReview & { 
  waterbody: Pick<IWaterbody, 'id' | 'name'>
})[] | GetUserReviewsRes['user']['waterbody_reviews']

const ReviewsScreen = ({ navigation, route }: RootStackScreenProps<'ReviewsScreen'>) => {

  const { params: { type, id, total, title} } = route;

  const [refetching, setRefetching] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sort, setSort] = useState<ReviewSort | null>(null)
  const [reviews, setReviews] = useState<WaterbodyReviews>([])
  const [loading, setLoading] = useState(false)

  const navigateUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })
  const navigateEdit = (id: number) => () => navigation.navigate('EditReviewScreen', { id })

  const userReviews = useGetUserReviews({ 
    id, limit, 
    sort: sort ? sort : ReviewSort.CreatedAtNewest, 
    skip: type !== ReviewQuery.User
  })
  
  const waterbodyReviews = useGetWaterbodyReviews({ 
    id, limit, 
    sort: sort ? sort : ReviewSort.CreatedAtNewest, 
    skip: type !== ReviewQuery.Waterbody
  })

  useEffect(() => {
    switch(type){
      case ReviewQuery.User:
        if(!userReviews.data) return;
        return setReviews(userReviews.data.user.waterbody_reviews)
      case ReviewQuery.Waterbody:
        if(!waterbodyReviews.data) return;
        return setReviews(waterbodyReviews.data.waterbody.reviews.map(x => ({
          ...x, waterbody: { 
            id: waterbodyReviews.data?.waterbody.id as number,
            name: waterbodyReviews.data?.waterbody.name as string
          }
        })))
    }
  },[userReviews.data, waterbodyReviews.data])

  useEffect(() => {
    setLoading(userReviews.loading || waterbodyReviews.loading)
  },[userReviews.loading, waterbodyReviews.loading])

  const handleFetchMore = () => {
    switch(type){
      case ReviewQuery.User:
        if(!userReviews.data || userReviews.data.user.waterbody_reviews.length % limit !== 0) return;
        return userReviews.fetchMore({ variables: { 
          offset: userReviews.data.user.waterbody_reviews.length }});
      case ReviewQuery.Waterbody:
        if(!waterbodyReviews.data || waterbodyReviews.data.waterbody.reviews.length % limit !== 0) return;
        return waterbodyReviews.fetchMore({ variables: { 
          offset: waterbodyReviews.data.waterbody.reviews.length }});
    }
  }

  const handleRefetch = () => {
    setRefetching(true)
    if(type === ReviewQuery.User){
      userReviews.refetch().then(() => setRefetching(false))
    }else if(type === ReviewQuery.Waterbody){
      waterbodyReviews.refetch().then(() => setRefetching(false))
    }
  }

  const handleSort = (sort: ReviewSort) => () =>  { setSort(sort); setMenuOpen(false) }

  return (
    <View style={styles.container}>

      <Surface style={styles.heading}>
          <View style={globalStyles.frsb}>
              <IconButton icon='arrow-left' onPress={navigation.goBack}/>
              <Title style={{ fontWeight: '500' }}>{title}</Title>
          </View>
      </Surface>

      <View style={styles.main}>
        <Menu 
          anchor={{ x: width, y: 100 }} 
          onDismiss={() => setMenuOpen(false)} 
          visible={menuOpen}>
          <Menu.Item 
            title='Most Recent' 
            style={{ height: 40 }} 
            onPress={handleSort(ReviewSort.CreatedAtNewest)}
          /><Divider/>
          <Menu.Item 
            title='Least Recent' 
            style={{ height: 40 }} 
            onPress={handleSort(ReviewSort.CreatedAtOldest)}
          /><Divider/>
          <Menu.Item 
            title='Highest Ratings' 
            style={{ height: 40 }} 
            onPress={handleSort(ReviewSort.RatingHighest)}
          /><Divider/>
          <Menu.Item 
            title='Lowest Ratings' 
            style={{ height: 40 }} 
            onPress={handleSort(ReviewSort.RatingLowest)}
          />
        </Menu>

        {
          <FlashList
            data={loading ? new Array(8).fill(null) : reviews}
            estimatedItemSize={200}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={.3}
            onEndReached={handleFetchMore}
            refreshing={refetching}
            onRefresh={handleRefetch}
            ListEmptyComponent={
              <ReviewsListEmpty style={styles.empty}/>
            }
            ListHeaderComponent={ 
              <ListHeaderFilterBar 
                total={total}
                setMenuOpen={setMenuOpen} 
                sortLabel={reviewSortToLabel(sort)} 
              />
            }
            renderItem={loading ? () => (
              <RectangleLoader height={150} width={width - 32} style={styles.loader}/> 
            ): ({ item }) => (
              <WaterbodyReview 
                key={item.id} data={item} refetch={handleRefetch}
                navigateToEdit={navigateEdit(item.id)}
                navigateToUser={navigateUser(item.user.id)}
              />
            )}
          /> 
        }
      </View>

    </View>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  heading: {
    height: 90,
    paddingTop: 24,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background
  },
  options: {
    height: 40,
    width: '100%'
  },
  total: {
    fontWeight: '600',
    fontSize: 16
  },
  main: {
    flexGrow: 1
  },
  sort: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 12
  },
  empty: {
    marginTop: 150
  },
  loader: {
    marginLeft: 16,
    marginBottom: 16
  }
});
