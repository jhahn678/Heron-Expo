import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text, TouchableRipple } from 'react-native-paper'
import dayjs from "../../../config/dayjs";
import { GetWaterbodyCatch } from "../../../types/Catch";
import { NavigationProp } from "../../../types/navigation";
import Avatar from '../../users/Avatar'

interface Props {
    navigation: NavigationProp
    data: GetWaterbodyCatch
    waterbody: number
}

const CatchesListItem = ({ data, navigation }: Props) => {

    const navigateUser = () => navigation.navigate('UserProfileScreen', { id: data.user.id })
    const navigateCatch = () => navigation.navigate('ViewCatchScreen', { id: data.id })

    return (
        <View style={styles.container}>
            <TouchableRipple onPress={navigateUser}>
                <View style={styles.header}>
                    <Avatar fullname={data.user.fullname} uri={data.user.avatar} size={40}/>
                    <View style={{ paddingLeft: 12}}>
                        <Text style={styles.name}>{data.user.fullname}</Text>
                        <Text style={styles.date}>{dayjs(data.created_at).fromNow()}</Text>
                    </View>
                </View>
            </TouchableRipple>
            <Pressable onPress={navigateCatch} style={styles.image}>
                <Image style={styles.image} source={{ uri: data.media[0]?.url }}/>
            </Pressable>
        </View>
    );
};

export default CatchesListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 300,
        marginRight: 16,
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    name: {
        fontWeight: '600'
    },
    date: {
        fontSize: 12
    },
    image: {
        backgroundColor: "#e3e3e3",
        flexGrow: 1
    }
});
