import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text, Surface, Button } from 'react-native-paper'
import MapCard from "../../../components/cards/MapCard";
import { ExploreStackScreenProps, MapResource } from "../../../types/navigation";

interface Props {
    navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
    waterbody: number
    uri?: string
}

const MapSection = ({ navigation, waterbody, uri }: Props) => {

    const navigateToMap = () => navigation.navigate('ViewMapScreen', { 
        resource: MapResource.Waterbody, id: waterbody 
    })

    return (
        <View style={styles.container}>
            <MapCard navigateToMap={navigateToMap} uri={uri}/>
        </View>
    );
};

export default MapSection;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 16,
        paddingBottom: 32
    },
    surface: {
        height: 230,
        width: '80%'
    },
    image: {
        height: '100%',
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 12
    },
    button: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 16,
        borderRadius: 10,
        flexGrow: 1
    }
});
