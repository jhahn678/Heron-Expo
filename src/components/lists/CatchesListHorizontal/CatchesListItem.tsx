import { StyleSheet, View, Image, Pressable } from "react-native";
import { Card, Text, TouchableRipple } from 'react-native-paper'
import dayjs from "../../../config/dayjs";
import { theme } from "../../../config/theme";
import { GetWaterbodyCatch } from "../../../types/Catch";
import { ExploreStackScreenProps } from "../../../types/navigation";
import { catchImageUriHandler } from "../../../utils/conversions/catchImageUriHandler";
import FishermanHoldingFish from "../../svg/FishermanHoldingFish";
import Avatar from '../../users/Avatar'

interface Props {
    navigation: ExploreStackScreenProps<'WaterbodyScreen'>['navigation']
    data: GetWaterbodyCatch
    waterbody: number
}

const CatchesListItem = ({ data, navigation }: Props) => {

    const navigateUser = () => navigation.navigate('UserProfileScreen', { id: data.user.id })
    const navigateCatch = () => navigation.navigate('ViewCatchScreen', { id: data.id })

    return (
        <Card style={styles.container}>
            <TouchableRipple onPress={navigateUser}>
                <View style={styles.header}>
                    <Avatar fullname={data.user.fullname} uri={data.user.avatar} size={40}/>
                    <View style={{ paddingLeft: 12 }}>
                        <Text style={styles.name}>{data.user.fullname}</Text>
                        <Text style={styles.date}>{dayjs(data.created_at).fromNow()}</Text>
                    </View>
                </View>
            </TouchableRipple>
            <Pressable onPress={navigateCatch} style={styles.image}>
                { Boolean(data.media.length || data.map_image) ?
                    <Image 
                        style={styles.image} 
                        source={{ uri: catchImageUriHandler(data) }}
                    /> :
                    <View style={styles.placeholder}>
                        <FishermanHoldingFish style={{transform: [{ scale: .8 }]}}/>
                    </View>
                }
            </Pressable>
        </Card>
    );
};

export default CatchesListItem;

const styles = StyleSheet.create({
    container: {
        height: 300,
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
        backgroundColor: theme.colors.secondary,
        height: 240
    },
    placeholder: {
        flexGrow: 1,
        backgroundColor: theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
