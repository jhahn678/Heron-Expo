import { StyleSheet, View, Pressable, Image } from "react-native";
import { Text, Title, Chip } from 'react-native-paper'
import RootStack from "../../../navigation/RootStack";
import { NavigationProp } from "../../../types/navigation";

interface Props {
    navigation: NavigationProp
    data: any
}

const LocationsListItem = ({ data, navigation }: Props) => {

    const navigateUser = navigation.navigate('UserProfileScreen', { id: data.catch.user.id })
    const navigateWaterbody = navigation.navigate('WaterbodyScreen', { id: data.catch.waterbody.id })

    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <Image style={styles.image} source={{}}/>
            <View style={styles.footer}>

            </View>
        </View>
    );
};

export default LocationsListItem;

const styles = StyleSheet.create({
    container: {

    },
    header: {

    },
    image: {

    },
    footer: {

    }
});
