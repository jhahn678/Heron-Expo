import { Dimensions, Pressable, StyleSheet, View, Image } from "react-native";
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { RootStackParams, RootStackScreenProps, SaveType } from "../../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, Text, IconButton } from 'react-native-paper'
import { useEditCatchStore } from "../../../../store/mutations/useEditCatchStore";
import { Point } from "geojson";
import { useEffect, useState } from "react";

const { width } = Dimensions.get('screen')

interface Props {
    navigation: RootStackScreenProps<keyof RootStackParams>['navigation']
    mapImage: {
        id: number
        key: string
        url: string
    } | undefined,
    geom: Point | undefined
}

const LocationInput = ({ navigation, mapImage, geom }: Props) => {

    const [savedValue, setSavedValue] = useState<Pick<Props, 'mapImage' | 'geom'> | null>(null)

    useEffect(() => {
        setSavedValue({ mapImage, geom })
    }, [mapImage, geom]);

    const navigateMapCurrentLocation = () => navigation
        .navigate('SaveMapScreen', { saveType: SaveType.CatchAutoEdit })

    const navigateMapManualLocation = () => navigation
        .navigate('SaveMapScreen', { 
            saveType: SaveType.CatchManualEdit, 
            center: geom ? { 
                longitude: geom.coordinates[0], 
                latitude: geom.coordinates[1] 
            } : undefined
        }) 

    const store = useEditCatchStore(store => ({
        snapshot: store.mapSnapshot,
        setPoint: store.setPoint,
        setMapSnapshot: store.setMapSnapshot
    }))

    const handleClearLocation = () => { store.setPoint(null); store.setMapSnapshot(null) }

    const handleClearSavedLocation = () => { setSavedValue(null); handleClearLocation() }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pin a location</Text>
            { 
                store.snapshot ? 
                    <Card style={styles.selected}>
                        <Image 
                            source={{ uri: store.snapshot.uri }} 
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
                        <IconButton 
                            size={16} 
                            icon='close' 
                            mode="contained" 
                            style={styles.remove} 
                            onPress={handleClearSavedLocation}
                        />
                        <Image 
                            source={{ uri: savedValue.mapImage.url }} 
                            style={styles.snapshot} 
                            resizeMode={'cover'}
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
    )
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
