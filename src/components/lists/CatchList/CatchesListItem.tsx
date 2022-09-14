import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { IconButton, Text, TouchableRipple } from 'react-native-paper'
import { GetCatchesRes } from "../../../hooks/queries/useGetCatches";
import Avatar from "../../users/Avatar";
import dayjs from '../../../config/dayjs'
import { useShareContent } from "../../../hooks/utils/useShareContent";

interface Props {
    data: GetCatchesRes['catches'][number]
    navigateToUser: () => void
    navigateToWaterbody: () => void,
    navigateToCatch: () => void
}

const CatchesListItem = ({ 
    data, 
    navigateToUser, 
    navigateToCatch,
    navigateToWaterbody
}: Props) => {

    const handleShare = () => useShareContent()({ url: '', shareType: 'CATCH' })
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableRipple onPress={navigateToUser}>
                    <View style={styles.user}>
                        <Avatar size={40}
                            fullname={data.user.fullname} 
                            uri={data.user.avatar}
                            onPress={navigateToUser}
                        />
                        <View style={{ paddingLeft: 12 }}>
                            <Text style={styles.name}>{data.user.fullname}</Text>
                            <Text style={styles.date}>{dayjs(data.created_at).fromNow()}</Text>
                        </View>
                    </View>
                </TouchableRipple>
                <IconButton icon={'share-variant'} onPress={handleShare}/>
            </View>
            <Pressable style={styles.image} onPress={navigateToCatch}>
                <Image 
                    source={{ uri: data.media[0].url }} 
                    style={styles.image} 
                    resizeMode='cover'
                />
            </Pressable>
            <View style={styles.footer}>
                <View style={styles.row}>
                    <View style={styles.leftItem}>
                        <Text style={styles.label}>Time</Text>
                        <Text style={styles.text}>{dayjs(data.created_at).format('h:mm a')}</Text>
                    </View>
                    <View style={styles.rightItem}>
                        <Text style={styles.label}>Caught at</Text>
                        <Pressable onPress={navigateToWaterbody}>
                            <Text style={styles.text} numberOfLines={1}>{data.waterbody.name}</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.leftItem}>
                        <Text style={styles.label}>Measurements</Text>
                        {
                            data.length && data.weight ? 
                                <View style={styles.measurements}>
                                    <Text style={styles.text}>{data.length} in</Text>
                                    <View style={styles.divider}/>
                                    <Text style={styles.text}>{data.weight} oz</Text>
                                </View>
                            : data.length ? 
                                <View style={styles.measurements}>
                                    <Text style={styles.text}>{data.length} in</Text>
                                </View>
                            : data.weight ?
                                <View style={styles.measurements}>
                                    <Text style={styles.text}>{data.weight} oz</Text>
                                </View>
                            : <Text style={styles.na}>Not specified</Text>
                        }   
                    </View>
                    <View style={styles.rightItem}>
                        <Text style={styles.label}>Species</Text>
                        { data.species ? 
                            <Text style={styles.text}>{data.species}</Text> :
                            <Text style={styles.na}>Not specified</Text>
                        }
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CatchesListItem;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        backgroundColor: 'white',
        marginBottom: 24,
        borderRadius: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '500'
    },
    date: {
        fontSize: 12,
    },
    image: {
        width: '100%',
        height: 250
    },
    footer: {
        paddingHorizontal: 12,
        paddingBottom: 24
    },
    row: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftItem: {
        flex: 1
    },
    rightItem: {
        flex: 2
    },
    label: {
        fontWeight: '300',
        fontSize: 12
    },
    text: {
        fontWeight: '500'
    },
    measurements: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        height: 16,
        width: 1,
        backgroundColor: 'rgba(0,0,0,.2)',
        marginHorizontal: 8
    },
    na: {
        fontStyle: 'italic',
    }
});
