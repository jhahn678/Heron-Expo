import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../../types/navigation";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Surface, Title } from "react-native-paper";
import { useGetCatchesQuery } from "../../hooks/queries/useGetCatches";
import { CatchQueryType, CatchSort } from "../../types/Catch";
import CatchesListItem from "../../components/lists/CatchList/CatchesListItem";
import BoxLoader from "../../components/loaders/BoxLoader";
import { useGetCatchesQueryMock } from "../../../__mocks";

const CatchListScreen = ({ navigation, route }: RootStackScreenProps<'CatchListScreen'>) => {

    const { params: { type, id, coordinates, title }} = route;

    const [sort, setSort] = useState(CatchSort.CreatedAtNewest)

    // const { data, loading, error, fetchMore } = useGetCatchesQuery({ type, id, sort, coordinates }) 
    const { data, loading, error } = useGetCatchesQueryMock({ loading: false, error: false, limit: 20 })

    const navigateUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

    const navigateCatch = (id: number) => () => navigation.navigate('ViewCatchScreen', { id }) 

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
                <IconButton icon='arrow-left' onPress={navigation.goBack}/>
                <Title>{title}</Title>
            </Surface>
            { data ? 
                <FlashList 
                    data={data?.catches}
                    contentContainerStyle={{ paddingTop: 100 }}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={300}
                    renderItem={({ item }) => (
                        <CatchesListItem 
                            key={item.id} data={item} 
                            navigateToCatch={navigateCatch(item.id)}
                            navigateToUser={navigateUser(item.user.id)} 
                            navigateToWaterbody={navigateWaterbody(item.waterbody.id)}
                        />
                    )}
                /> :
                <FlashList
                    contentContainerStyle={{ paddingTop: 80 }}
                    data={new Array(6).fill(null)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ index }) => <BoxLoader key={index}/>}
                    estimatedItemSize={300}
                />
            }
            
        </View>
    );
};

export default CatchListScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    header: {
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1000,
        paddingTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        height: 80
    }
});
