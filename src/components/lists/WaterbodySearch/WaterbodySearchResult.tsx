import React from "react";
import { StyleSheet, View, Pressable, Image } from "react-native";
import { Text, Title } from 'react-native-paper'
import { WaterbodyListItem } from "../../../types/Waterbody";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import gstyles from '../../../globalStyles'

interface Props {
    onPress: () => void,
    data: WaterbodyListItem
}

const WaterbodySearchResult = ({ onPress, data }: Props) => {
    

    
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image source={{ uri: data.media[0]?.url}} style={styles.image}/>
            <View style={[gstyles.frsb, { paddingRight: 8}]}>
                <Title style={styles.name}>{data.name}</Title>
                
            </View>
            { 
                data.admin_two && data.admin_two.length === 1 ?
                    <Text>{data.admin_two[0]}, {data.admin_one[0]}</Text> :
                data.admin_one.length === 1 ?
                    <Text>{data.admin_one[0]}, {data.country}</Text> :
                data.admin_one.length > 1 && data.subregion ?
                    <Text>{data.subregion} {data.country}</Text> :
                data.admin_one.length > 1 ?
                    <Text>{`${data.admin_one[0]} + ${data.admin_one.length - 1} more`}, {data.ccode}</Text> :
                    <Text>{data.country}</Text>
            }
            <View style={styles.totals}>
                <Text style={styles.totalsItem}>{data.total_catches} catches logged  &bull;</Text>
                <Text>{data.total_locations} saved locations</Text>
            </View>
        </Pressable>
    );
};

export default WaterbodySearchResult;

const styles = StyleSheet.create({
    container: {
        height: 370,
        width: '90%',
        alignSelf: 'center'
    },
    image: {
        height: '70%',
        width: '100%',
        backgroundColor: 'gray',
        borderRadius: 12
    },
    name: {
        fontSize: 18,
        paddingTop: 8,
        fontWeight: '600'
    },
    totals: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    totalsItem: {
        marginRight: 6
    }
});
