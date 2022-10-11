import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Text, Title } from 'react-native-paper'
import FishermanDock from "../../../components/svg/FishermanDock";
import { ExploreStackScreenProps } from "../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { LocationQuery } from "../../../types/Location";
import RectangleLoader from "../../../components/loaders/RectangleLoader";

interface Props {
    navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
    waterbody: number
    name: string | undefined
    totalLocations: number | undefined
}

const LocationsSection = ({ navigation, name, waterbody, totalLocations }: Props) => {

    const navigateLocations = () => navigation.navigate('LocationListScreen', { 
        type: LocationQuery.Waterbody, id: waterbody, title: name, total: totalLocations
    })

    return (
        <View>
            <Title style={styles.title}>Saved Spots</Title>
            <Pressable onPress={navigateLocations}>
                <View style={styles.summary}>
                    <FishermanDock/>
                    <View style={styles.divider}/>
                    <View style={styles.text}>
                        { totalLocations !== undefined ? 
                            <Text style={styles.number}>{totalLocations}</Text> :
                            <RectangleLoader height={28} width={28} style={styles.totalLoading}/>
                        }
                        <Text style={{ fontWeight: '400', fontSize: 12 }}>Saved Spots</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default LocationsSection;

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        marginBottom: 32,
        marginLeft: 16
    },
    summary: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingRight: 32,
        marginBottom: 24,
        marginHorizontal: 16
    },
    text: {
        alignItems: 'center'
    },
    totalLoading: {
        marginBottom: 10,
        position: 'relative',
        top: 6
    },
    divider: {
        height: '40%',
        backgroundColor: 'rgba(0,0,0,.1)',
        width: 1,
    },
    number: {
        fontSize: 28,
        fontWeight: '600'
    },
    arrow: {
        position: 'absolute',
        right: 16
    },
    list: {
        height: 300
    },
    seemore: {
        flexGrow: 1,
        marginLeft: 16,
        marginRight: 24
    }
});
