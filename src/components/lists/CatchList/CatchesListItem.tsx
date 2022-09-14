import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text, Title, TouchableRipple } from 'react-native-paper'
import { GetCatchesRes } from "../../../hooks/queries/useGetCatches";
import Avatar from "../../users/Avatar";
import dayjs from '../../../config/dayjs'

interface Props {
    data: GetCatchesRes['catches'][number]
    navigateToUser: () => void
    navigateToWaterbody: () => void
}

const CatchesListItem = ({ data, navigateToUser, navigateToWaterbody }: Props) => {
    
    
    return (
        <View style={styles.container}>
            <TouchableRipple onPress={navigateToUser}>
                <View style={styles.header}>
                    <Avatar fullname={data.user.fullname} uri={data.user.avatar} size={48}/>
                    <View style={{ paddingLeft: 12 }}>
                        <Text style={styles.name}>{data.user.fullname}</Text>
                        <Text style={styles.date}>{dayjs(data.created_at).fromNow()}</Text>
                    </View>
                </View>
            </TouchableRipple>
            <Pressable style={styles.image}>
                <Image source={{ uri: data.media[0]?.url }} resizeMode='cover'/>
            </Pressable>
            <View style={styles.footer}>

            </View>
        </View>
    );
};

export default CatchesListItem;

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 300,
        marginRight: 12,
        borderColor: 'black',
        borderWidth: 1
    },
    header: {

    },
    name: {

    },
    date: {

    },
    image: {

    },
    footer: {

    }
});
