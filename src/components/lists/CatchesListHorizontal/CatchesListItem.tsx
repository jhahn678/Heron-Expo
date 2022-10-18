import { StyleSheet, View, Image, Pressable } from "react-native";
import { Card, Text, TouchableRipple } from 'react-native-paper'
import dayjs from "../../../config/dayjs";
import { theme } from "../../../config/theme";
import { GetWaterbodyCatch } from "../../../types/Catch";
import { ExploreStackScreenProps } from "../../../types/navigation";
import FishermanHoldingFish from "../../svg/FishermanHoldingFish";
const DEFAULT_IMAGE = Image.resolveAssetSource(require('../../../../assets/default-background.png')).uri
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
                        source={{ uri: 
                            data.media.length > 0 ? 
                            data.media[0].url :
                            data.map_image ?
                            data.map_image.url :
                            undefined
                        }}
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
        height: 332,
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
        flexGrow: 1
    },
    placeholder: {
        flexGrow: 1,
        backgroundColor: theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
