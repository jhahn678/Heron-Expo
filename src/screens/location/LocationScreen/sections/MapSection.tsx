import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { MapResource, RootStackScreenProps } from "../../../../types/navigation";
import MapCard from "../../../../components/cards/MapCard";
import RectangleLoader from "../../../../components/loaders/RectangleLoader";
const { width } = Dimensions.get('screen')

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
            { uri ?
                <MapCard navigateToMap={navigateToMap} uri={uri}/> :
                <RectangleLoader height={230} width={width * .8} borderRadius={12}/>
            }
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