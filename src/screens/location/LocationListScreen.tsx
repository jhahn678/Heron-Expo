import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MapResource, RootStackScreenProps } from "../../types/navigation";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Surface, Title, Text, Button, Menu, Divider } from "react-native-paper";
import { useGetLocations } from "../../hooks/queries/useGetLocations";
import LocationListItem from "../../components/lists/LocationList/LocationListItem";
import { useGetLocationsQueryMock } from "../../../__mocks";
import globalStyles from "../../globalStyles";
import { LocationSort } from "../../types/Location";

const limit = 16;
const { width } = Dimensions.get('screen')

const LocationListScreen = ({ navigation, route }: RootStackScreenProps<'LocationListScreen'>) => {

    const { params: { id, title, type, total } } = route;

    const [hasMore, setHasMore] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [sort, setSort] = useState(LocationSort.CreatedAtNewest);

    const { data, loading, error, fetchMore } = useGetLocations({ type, id, limit, sort }) 
    // const { data, loading, error } = useGetLocationsQueryMock({ limit })

    useEffect(() => {
        if(data) setHasMore(data.locations.length % limit === 0)
    },[data])

    const handleSort = (type: LocationSort) => () => { setSort(type); setMenuOpen(false) }

    const toggleMenu = () => setMenuOpen(o => !o)

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
            <Title>{title}</Title>
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
            onPress={handleSort(LocationSort.CreatedAtNewest)}
          />
          <Divider />
          <Menu.Item
            title="Most Recommendations"
            style={{ height: 40 }}
            onPress={handleSort(LocationSort.CreatedAtNewest)}
          />
        </Menu>

        <FlashList
          data={data?.locations}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={300}
          onEndReachedThreshold={0.3}
          ListHeaderComponent={
            <View style={styles.sort}>
              <Text style={styles.total}>{total} results</Text>
              <Button icon="chevron-down" onPress={toggleMenu}>
                Sort by
              </Button>
            </View>
          }
          // onEndReached={hasMore ? () => (
          //     fetchMore({ variables: { offset: data?.locations.length }})
          // ): null}
          renderItem={({ item }) => (
            <LocationListItem
              key={item.id}
              data={item}
              navigateToMap={navigateMap(item.id)}
              navigateToUser={navigateUser(item.user.id)}
              navigateToWaterbody={navigateWaterbody(item.waterbody.id)}
            />
          )}
        />
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
  total: {
    fontWeight: "600",
    fontSize: 16,
  },
  sort: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    marginHorizontal: 12,
  },
});

