import React from "react";
import { StyleSheet, View, Pressable, Image, Dimensions} from "react-native";
import { Text, Title } from 'react-native-paper'
import { WaterbodyListItem } from "../../../types/Waterbody";

interface Props {
    onPress: () => void,
    data: WaterbodyListItem
}

const WaterbodySearchResult = ({ onPress, data }: Props) => {
    

    
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image source={{ uri: data.media[0].url}}/>
            <Text>WaterbodySearchResult</Text>
        </Pressable>
    );
};

export default WaterbodySearchResult;

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: '100%'
    }
});
