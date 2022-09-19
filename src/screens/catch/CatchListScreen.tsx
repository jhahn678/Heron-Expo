import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MapResource, RootStackScreenProps } from "../../types/navigation";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Surface, Title, Menu, Divider } from "react-native-paper";
import { useGetCatches } from "../../hooks/queries/useGetCatches";
import { CatchQuery, CatchSort } from "../../types/Catch";
import CatchesListItem from "../../components/lists/CatchList/CatchesListItem";
import BoxLoader from "../../components/loaders/BoxLoader";
import globalStyles from "../../globalStyles";
import { catchSortToLabel } from "../../utils/conversions/catchSortToLabel";
import ListHeaderFilterBar from "../../components/lists/shared/ListHeaderFilterBar";
import CatchesListEmpty from "../../components/lists/shared/CatchesListEmpty";

const { width, height } = Dimensions.get('screen')
const limit = 16;

const CatchListScreen = ({ navigation, route }: RootStackScreenProps<'CatchListScreen'>) => {

    const { params: { type, id, title, total }} = route;

    const [sort, setSort] = useState(CatchSort.CreatedAtNewest)
    const [menuOpen, setMenuOpen] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const { data, loading, error, fetchMore } = useGetCatches({ type, id, sort, limit }) 
    // const { data, loading, error } = useGetCatchesQueryMock({ loading: false, error: false, limit })
    
    useEffect(() => {
        if(data) setHasMore(data.catches.length % limit === 0)
    }, [data])

    const handleSort = (type: CatchSort) => () => { setSort(type); setMenuOpen(false) }

    const navigateUser = (id: number) => () => 
      navigation.navigate('UserProfileScreen', { id })

    const navigateCatch = (id: number) => () => 
      navigation.navigate('ViewCatchScreen', { id }) 

    const navigateMap = (id: number) => () =>
      navigation.navigate("ViewMapScreen", { resource: MapResource.Catch, id });

    const navigateMapCatches = () => {
        let resource: MapResource;
        switch(type){
          case CatchQuery.User:
            resource = MapResource.UserCatches; 
            break;
          case CatchQuery.Waterbody:
            resource = MapResource.WaterbodyCatches; 
            break;
          case CatchQuery.Coordinates:
            resource = MapResource.CatchesNearby;
            break;
          default:
            return;
        }
        navigation.navigate('ViewMapScreen', { resource, id })
      }

    return (
      <View style={styles.container}>

        <Surface style={styles.header}>
          <View style={globalStyles.frsb}>
            <IconButton icon="arrow-left" onPress={navigation.goBack} />
            <Title style={styles.title}>{title}</Title>
          </View>
          <IconButton
            onPress={navigateMapCatches}
            icon="map"
            size={28}
            style={{ marginRight: 8 }}
          />
        </Surface>

        <Menu
          anchor={{ x: width, y: 100 }}
          onDismiss={() => setMenuOpen(false)}
          visible={menuOpen}
        >
          <Menu.Item
            title="Most Recent"
            style={{ height: 40 }}
            onPress={handleSort(CatchSort.CreatedAtNewest)}
          />
          <Divider />
          <Menu.Item
            title="Least Recent"
            style={{ height: 40 }}
            onPress={handleSort(CatchSort.CreatedAtOldest)}
          />
          <Divider />
          <Menu.Item
            title="Length Largest"
            style={{ height: 40 }}
            onPress={handleSort(CatchSort.LengthLargest)}
          />
          <Divider />
          <Menu.Item
            title="Weight Largest"
            style={{ height: 40 }}
            onPress={handleSort(CatchSort.WeightLargest)}
          />
        </Menu>

          <FlashList
            data={data ? data.catches : new Array(6).fill(null)}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.3}
            onEndReached={hasMore? () =>
              fetchMore({ variables: { offset: data?.catches.length } }) : null
            }
            estimatedItemSize={300}
            ListHeaderComponent={
              <ListHeaderFilterBar 
              total={total}
              setMenuOpen={setMenuOpen} 
              sortLabel={catchSortToLabel(sort)}
              />
            }
            renderItem={({ item, index }) => data ? (
              <CatchesListItem
                key={item.id} data={item}
                navigateToCatch={navigateCatch(item.id)}
                navigateToUser={navigateUser(item.user.id)}
                navigateToMap={navigateMap(item.id)}
              />
            ):(
              <BoxLoader 
                key={index} 
                height={width * .9} 
                width={width * .9} 
                style={{ 
                  marginLeft: width * .05,
                  marginBottom: 16
                }}
              />
            ) }
          />
          {data && data.catches.length === 0 && <CatchesListEmpty style={styles.empty}/>}
      </View>
    );
};

export default CatchListScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  title: {
    fontWeight: '500'
  },
  header: {
    position: "relative",
    zIndex: 100,
    width: "100%",
    paddingTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
  empty: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * .4
  }
});
