import { StyleSheet, View } from "react-native";
import React from "react";
import { MapResource, RootStackScreenProps } from "../../../../types/navigation";
import MapCard from "../../../../components/cards/MapCard";

interface Props {
    navigation: RootStackScreenProps<'ViewLocationScreen'>['navigation']
    uri: string | undefined
    id: number | undefined
}

const MapSection = ({ navigation, id, uri }: Props) => {
    
    const navigateToMap = () => {
        if(!id) return;
        navigation.navigate('ViewMapScreen', { resource: MapResource.Location, id })
    }
    
    return (
        <View style={styles.container}>
            <MapCard navigateToMap={navigateToMap} uri={uri}/>
        </View>
    );
};

export default MapSection;

const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        alignItems: 'center'
    }
});