import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MapResource, RootStackScreenProps } from "../../types/navigation";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Surface, Title, Text } from "react-native-paper";
import { useGetCatches } from "../../hooks/queries/useGetCatches";
import { CatchQuery, CatchSort } from "../../types/Catch";
import CatchesListItem from "../../components/lists/CatchList/CatchesListItem";
import BoxLoader from "../../components/loaders/BoxLoader";
import { useGetCatchesQueryMock } from "../../../__mocks";
import globalStyles from "../../globalStyles";

const limit = 16;

const CatchListScreen = ({ navigation, route }: RootStackScreenProps<'CatchListScreen'>) => {

    const { params: { type, id, title }} = route;

    const [sort, setSort] = useState(CatchSort.CreatedAtNewest)

    // const { data, loading, error, fetchMore } = useGetCatches({ type, id, sort, limit }) 
    const { data, loading, error } = useGetCatchesQueryMock({ loading: false, error: false, limit })

    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        if(data) setHasMore(data.catches.length % limit === 0)
    }, [data])

    const navigateUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

    const navigateCatch = (id: number) => () => navigation.navigate('ViewCatchScreen', { id }) 

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
            default:
                return;
        }
        navigation.navigate('ViewMapScreen', { resource, id })
    }

    const navigateWaterbody = (id: number) => () => navigation.navigate('MainTabs', { 
        screen: 'ExploreStack',
        params: { 
            screen: 'WaterbodyScreen',
            params: { id }
        }
    })

    return (
      <View style={styles.container}>
        <Surface style={styles.header}>
          <View style={globalStyles.frsb}>
            <IconButton icon="arrow-left" onPress={navigation.goBack} />
            <Title>{title}</Title>
          </View>
          <IconButton
            onPress={navigateMapCatches}
            icon="map" size={28}
            style={{ marginRight: 8 }}
          />
        </Surface>
        {data ? (
          <FlashList
            data={data?.catches}
            contentContainerStyle={{ paddingTop: 14 }}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.3}
            // onEndReached={hasMore ? () => (
            //     fetchMore({ variables: { offset: data.catches.length }})
            // ): null}
            estimatedItemSize={300}
            renderItem={({ item }) => (
              <CatchesListItem
                key={item.id}
                data={item}
                navigateToCatch={navigateCatch(item.id)}
                navigateToUser={navigateUser(item.user.id)}
                navigateToWaterbody={navigateWaterbody(item.waterbody.id)}
              />
            )}
          />
        ) : (
          <FlashList
            contentContainerStyle={{ paddingTop: 80 }}
            data={new Array(6).fill(null)}
            showsVerticalScrollIndicator={false}
            renderItem={({ index }) => <BoxLoader key={index} />}
            estimatedItemSize={300}
          />
        )}
      </View>
    );
};

export default CatchListScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    header: {
        position: 'relative',
        zIndex: 100,
        width: '100%',
        paddingTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
    }
});
