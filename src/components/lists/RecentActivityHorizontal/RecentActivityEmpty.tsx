import React from "react";
import { Text, Card, Button } from "react-native-paper";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import FishermanFishingFromChair from "../../svg/FishermanFishingFromChair";
import FishIcon from "../../icons/FishIcon";

interface Props {
    containerStyle?: StyleProp<ViewStyle>
}

const RecentActivityEmpty = (props: Props) => {
    return (
        <Card style={[styles.card, props.containerStyle]}>
            <Card.Content style={styles.content}>
                <Text style={styles.text} variant={"titleMedium"}>
                    It looks like your friends have not logged any catches yet..
                </Text>
                <View style={styles.image}>
                    <FishermanFishingFromChair/>
                </View>
            </Card.Content>
            <Button 
                mode="contained-tonal"
                style={styles.button}
                contentStyle={{ flexDirection: 'row-reverse' }}
                icon={({ color, size }) => <FishIcon color={color} size={size}/>}
                theme={{ roundness: 1}}>Log the first catch</Button>
        </Card>
    );
};

export default RecentActivityEmpty;

const styles = StyleSheet.create({
    card: {
        paddingVertical: 12
    },
    content: {
        marginHorizontal: 12,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    image: {
        flex: 1
    },
    text: {
        flex: 2,
        marginRight: 16
    },
    button: {
        marginTop: 24,
        marginHorizontal: 12
    }
});
