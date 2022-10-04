import React from "react";
import { Dimensions, Pressable, StyleSheet, View, Image } from "react-native";
import { Card, IconButton, Text } from 'react-native-paper'
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { useNewLocationStore } from "../../../../store/mutations/useNewLocationStore";
import { RootStackScreenProps, SaveType } from "../../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('screen')

interface Props {
    navigation: RootStackScreenProps<'NewLocationScreen'>['navigation']
}

const LocationInput = ({ navigation }: Props) => {

    const navigateMapCurrentLocation = () => navigation
        .navigate('SaveMapScreen', { saveType: SaveType.LocationAuto })
    const navigateMapManualLocation = () => navigation
        .navigate('SaveMapScreen', { saveType: SaveType.LocationManual })
    
    const snapshot = useNewLocationStore(store => store.mapSnapshot)
    const setPoint = useNewLocationStore(store => store.setPoint)
    const setPolygon = useNewLocationStore(store => store.setPolygon)
    const setMapSnapshot = useNewLocationStore(store => store.setMapSnapshot)

    const handleClearLocation = () => { setPoint(); setPolygon(); setMapSnapshot() }

    return (
         <View style={styles.container}>
            <Text style={styles.title}>Add on Map</Text>
            { 
                snapshot ? 
                    <Card style={styles.selected}>
                        <IconButton 
                            size={16} 
                            icon='close' 
                            mode="contained" 
                            style={styles.remove} 
                            onPress={handleClearLocation}
                        />
                        <Image source={{ uri: snapshot.uri }} style={styles.snapshot} resizeMode={'cover'}/>
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