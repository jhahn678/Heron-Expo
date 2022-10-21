import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View, Image } from "react-native";
import { Card, IconButton, Text } from 'react-native-paper'
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { RootStackScreenProps, SaveType } from "../../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { LineString, Point, Polygon } from "geojson";
import { useEditLocationStore } from "../../../../store/mutations/useEditLocationStore";

const { width } = Dimensions.get('screen')

interface Props {
    navigation: RootStackScreenProps<'EditLocationScreen'>['navigation']
    mapImage: {
        id: number
        url: string
    } | undefined,
    geom: Point | Polygon | LineString | undefined
}

const LocationInput = ({ navigation, mapImage, geom }: Props) => {

    const [savedValue, setSavedValue] = useState<Pick<Props, 'mapImage' | 'geom'> | null>(null)

    useEffect(() => {
        setSavedValue({ mapImage, geom })
    }, [mapImage, geom]);

    const navigateMapCurrentLocation = () => navigation
        .navigate('SaveMapScreen', { saveType: SaveType.LocationAutoEdit })

    const navigateMapManualLocation = () => navigation
        .navigate('SaveMapScreen', { 
            saveType: SaveType.LocationManualEdit,
            center: geom ? 
                geom.type === 'Point' ? {
                    longitude: geom.coordinates[0],
                    latitude: geom.coordinates[1]
                } : geom.type === 'Polygon' ? {
                    longitude: geom.coordinates[0][0][0],
                    latitude: geom.coordinates[0][0][1]
                } : geom.type === 'LineString' ? {
                    longitude: geom.coordinates[0][0],
                    latitude: geom.coordinates[0][1]
                } : undefined : undefined
        })
    
    const snapshot = useEditLocationStore(store => store.mapSnapshot)
    const setPoint = useEditLocationStore(store => store.setPoint)
    const setPolygon = useEditLocationStore(store => store.setPolygon)
    const setMapSnapshot = useEditLocationStore(store => store.setMapSnapshot)

    const handleClearLocation = () => { setPoint(null); setPolygon(null); setMapSnapshot(null) }

    const handleClearSavedLocation = () => { setSavedValue(null); handleClearLocation() }

    return (
         <View style={styles.container}>
            <Text style={styles.title}>Add on Map</Text>
            { 
                snapshot ? 
                    <Card style={styles.selected}>
                        <Image 
                            source={{ uri: snapshot.uri }} 
                            style={styles.snapshot} 
                            resizeMode={'cover'}
                        />
                        <IconButton 
                            size={16} 
                            icon='close' 
                            mode="contained" 
                            style={styles.remove} 
                            onPress={handleClearLocation}
                        />
                    </Card> 
                : (savedValue && savedValue.mapImage) ?
                    <Card style={styles.selected}>
                        <Image 
                            source={{ uri: savedValue.mapImage.url }} 
                            style={styles.snapshot} 
                            resizeMode={'cover'}
                        />
                        <IconButton 
                            size={16} 
                            icon='close' 
                            mode="contained" 
                            style={styles.remove} 
                            onPress={handleClearSavedLocation}
                        />
                    </Card> 
                :
                    <View style={globalStyles.frsb}>
                        <Pressable style={styles.pressable} onPress={navigateMapManualLocation}>
                            <MCIcon name='map-plus' size={48} color={theme.colors.onSecondaryContainer}/>
                            <Text style={styles.label}>Manually</Text>
                        </Pressable>
                        <Pressable style={styles.pressable} onPress={navigateMapCurrentLocation}>
                            <Icon name='my-location' size={48} color={theme.colors.onSecondaryContainer}/>
                            <Text style={styles.label}>Current location</Text>
                        </Pressable>
                    </View>
            }
        </View>
    );
};

export default LocationInput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24,
        marginBottom: 16
    },
    selected: {
        width: '85%',
        height: 200,
        borderRadius: 12
    },
    snapshot: {
        height: '100%',
        width: '100%',
        borderRadius: 12
    },
    remove: {
        position: 'absolute',
        top: -12,
        right: -12,
        zIndex: 100
    },
    pressable: {
        justifyContent: 'center',
        alignItems: 'center',
        height: width * .44,
        width: width * .44,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: theme.colors.surfaceVariant,
        borderColor: theme.colors.onSecondaryContainer,
    },
    label: {
        marginTop: 4,
        fontWeight: '500'
    }
});