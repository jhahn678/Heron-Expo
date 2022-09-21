import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MapResource, RootStackScreenProps } from "../../types/navigation";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Surface, Title, Menu, Divider } from "react-native-paper";
import { useGetLocations } from "../../hooks/queries/useGetLocations";
import LocationListItem from "../../components/lists/LocationList/LocationListItem";
import globalStyles from "../../globalStyles";
import { LocationSort } from "../../types/Location";
import { locationSortToLabel } from "../../utils/conversions/locationSortToLabel";
import BoxLoader from "../../components/loaders/BoxLoader";
import ListHeaderFilterBar from "../../components/lists/shared/ListHeaderFilterBar";
import LocationsListEmpty from "../../components/lists/shared/LocationsListEmpty";

const limit = 16;
const { width, height } = Dimensions.get('screen')

const LocationListScreen = ({ navigation, route }: RootStackScreenProps<'LocationListScreen'>) => {

    const { params: { id, title, type, total } } = route;

    const [hasMore, setHasMore] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [sort, setSort] = useState(LocationSort.CreatedAtNewest);

    const { data, loading, error, fetchMore } = useGetLocations({ type, id, limit, sort }) 

    useEffect(() => {
        if(data) setHasMore(data.locations.length % limit === 0)
    },[data])

    const handleSort = (type: LocationSort) => () => { setSort(type); setMenuOpen(false); }

    const navigateUser = (id: number) => () => 
      navigation.navigate('UserProfileScreen', { id })

    const navigateMapLocations = () => 
      navigation.navigate('ViewMapScreen', { id, resource: MapResource.WaterbodyLocations })

    const navigateMap = (id: number) => () => 
      navigation.navigate('ViewMapScreen', { resource: MapResource.Location, id })

    const navigateWaterbody = (id: number) => () => 
      navigation.navigate('MainTabs', {
        screen: 'ExploreStack',
        params: { screen: 'WaterbodyScreen', params: { id } }
      })

    return (
      <View style={styles.container}>
        <Surface style={styles.header}>
          <View style={globalStyles.frsb}>
            <IconButton icon="arrow-left" onPress={navigation.goBack} />
            <Title style={styles.title}>{title}</Title>
          </View>
          <IconButton
            icon="map"
            size={28}
            onPress={navigateMapLocations}
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
            onPress={handleSort(LocationSort.CreatedAtNewest)}
          />
          <Divider />
          <Menu.Item
            title="Least Recent"
            style={{ height: 40 }}
            onPress={handleSort(LocationSort.CreatedAtOldest)}
          />
          <Divider />
          <Menu.Item
            title="Most Recommendations"
            style={{ height: 40 }}
            onPress={handleSort(LocationSort.MostRecommended)}
          />
        </Menu>

        <FlashList
          data={data ? data.locations : new Array(6).fill(null)}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={300}
          onEndReachedThreshold={0.3}
          ListHeaderComponent={
            <ListHeaderFilterBar 
            total={total}
            sortLabel={locationSortToLabel(sort)} 
            setMenuOpen={setMenuOpen}
            />
          }
          onEndReached={
            hasMore
              ? () =>
                  fetchMore({ variables: { offset: data?.locations.length } })
              : null
          }
          renderItem={({ item, index }) =>
            data ? (
              <LocationListItem
                key={item.id}
                data={item}
                navigateToMap={navigateMap(item.id)}
                navigateToUser={navigateUser(item.user.id)}
                navigateToWaterbody={navigateWaterbody(item.waterbody.id)}
              />
            ) : (
              <BoxLoader
                key={index}
                height={width * 0.9}
                width={width * 0.9}
                style={{
                  marginLeft: width * 0.05,
                  marginBottom: 16,
                }}
              />
            )
          }
        />

        { (data && data.locations.length === 0) && <LocationsListEmpty style={styles.empty}/>}

      </View>
    );
};

export default LocationListScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
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
  title: {
    fontWeight: "500",
  },
  empty: {
    alignSelf: "center",
    position: "absolute",
    bottom: height * 0.4,
  },
});

