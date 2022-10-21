import { Dimensions, Pressable, StyleSheet, View, Image } from "react-native";
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { useNewCatchStore } from "../../../../store/mutations/useNewCatchStore";
import { RootStackParams, RootStackScreenProps, SaveType } from "../../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, Text, IconButton } from 'react-native-paper'
const { width } = Dimensions.get('screen')

interface Props {
    navigation: RootStackScreenProps<keyof RootStackParams>['navigation']
}

const LocationInput = ({ navigation }: Props) => {

    const navigateMapCurrentLocation = () => navigation
        .navigate('SaveMapScreen', { saveType: SaveType.CatchAuto })
    const navigateMapManualLocation = () => navigation
        .navigate('SaveMapScreen', { saveType: SaveType.CatchManual})

    const store = useNewCatchStore(store => ({
        snapshot: store.mapSnapshot,
        setPoint: store.setPoint,
        setMapSnapshot: store.setMapSnapshot
    }))

    const handleClearLocation = () => { store.setPoint(); store.setMapSnapshot() }

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
        borderRadius: 12,
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
