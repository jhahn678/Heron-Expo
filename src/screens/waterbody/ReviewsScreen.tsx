import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Dimensions, StyleSheet, View } from "react-native";
import ContentLoader from "react-content-loader";
import { RootStackScreenProps } from '../../types/navigation'
import WaterbodyReview from "../../components/lists/Reviews/WaterbodyReview";
import { ReviewSort, useGetWaterbodyReviews } from "../../hooks/queries/useGetWaterbodyReviews";
import { Button, Text, Divider, IconButton, Menu, Surface, Title } from "react-native-paper";
import globalStyles from "../../globalStyles";
import { useModalStore } from "../../store/modal/useModalStore";
import { useGetWaterbodyReviewsMock } from "../../../__mocks";

const ReviewsScreen = ({ navigation, route }: RootStackScreenProps<'ReviewsScreen'>) => {

  const LIMIT = 12;
  const { params } = route;
  const { width } = Dimensions.get('screen')
  const [hasMore, setHasMore] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sort, setSort] = useState<ReviewSort | null>(null)
  const navigateUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })
  const setShowReview = useModalStore(store => store.setReview)
  const handleAddReview = () => setShowReview(params.waterbody)

  const { 
    // data, error, loading, 
    fetchMore 
  } = useGetWaterbodyReviews({
    id: params.waterbody,
    limit: LIMIT,
    offset: 0,
    sort: sort ? sort : ReviewSort.CreatedAtNewest
  })

  const { data, loading, error } = useGetWaterbodyReviewsMock({ error: false, loading: false, limit: 15 })

  useEffect(() => {
    if(data) setHasMore(data.waterbody.reviews.length === LIMIT)
  }, [data])

  const toggleMenu = () => setMenuOpen(o => !o)
  const handleSort = (sort: ReviewSort) => () =>  { setSort(sort); setMenuOpen(false) }

  return (
    <View style={styles.container}>
      <Surface style={styles.heading}>
          <View style={globalStyles.frsb}>
              <IconButton icon='arrow-left' onPress={navigation.goBack}/>
              <Title style={{ fontWeight: '500'}}>{params.title}</Title>
          </View>
          <IconButton 
            size={28}
            icon='plus' 
            onPress={handleAddReview} 
          />
      </Surface>
      <View style={styles.main}>
        <Menu 
          anchor={{ x: width, y: 100 }} 
          onDismiss={() => setMenuOpen(false)} 
          visible={menuOpen} 
        >
          <Menu.Item title='Most Recent' style={{ height: 40 }} onPress={handleSort(ReviewSort.CreatedAtNewest)}/><Divider/>
          <Menu.Item title='Least Recent' style={{ height: 40 }} onPress={handleSort(ReviewSort.CreatedAtOldest)}/><Divider/>
          <Menu.Item title='Highest Ratings' style={{ height: 40 }} onPress={handleSort(ReviewSort.RatingHighest)}/><Divider/>
          <Menu.Item title='Lowest Ratings' style={{ height: 40 }} onPress={handleSort(ReviewSort.RatingLowest)}/>
        </Menu>
        { data ?
          <FlashList
            data={data?.waterbody.reviews}
            ListHeaderComponent={
              <View style={styles.sort}>
                <Text style={styles.total}>{params.total} results</Text>
                <Button 
                  icon='chevron-down' 
                  onPress={toggleMenu} 
                >Sort by</Button>
              </View>
            }
            renderItem={({ item }) => (
              <WaterbodyReview 
                key={item.id} data={item} 
                navigateToUser={navigateUser(item.user.id)}
              />
            )}
            estimatedItemSize={200}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={.3}
            onEndReached={hasMore ? () => fetchMore({ variables: 
                { offset: data.waterbody.reviews.length }
            }): null}
          />:
          <></>
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
    flexGrow: 1,
    paddingHorizontal: 4
  },
  sort: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 12
  }
});
