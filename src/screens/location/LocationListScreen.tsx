import { StyleSheet, View } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../../types/navigation";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Title } from "react-native-paper";

const LocationListScreen = ({ navigation, route }: RootStackScreenProps<'LocationListScreen'>) => {

    const { params: { waterbody, title } } = route;
    // const { data, loading, error, fetchMore } = useGetLocations({ waterbody }) 

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton icon='arrow-left' onPress={navigation.goBack}/>
                <Title>{title}</Title>
            </View>
            {/* <FlashList 
                data={data.catches} 
                renderItem={({ item }) => CatchListItem}
                showsVerticalScrollIndicator={false}
            /> */}
        </View>
    );
};

export default LocationListScreen;

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

