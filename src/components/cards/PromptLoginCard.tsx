import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FishermenWithCastingNet from "../svg/FishermenWithCastingNet";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
    containerStyle?: StyleProp<ViewStyle>
}

const PromptLoginCard = (props: Props) => {

    const navigation = useNavigation() //@ts-ignore
    const handleNavigateToAuth = () => navigation.navigate('HomeAuthScreen', { showBack: true })

    return (
        <Card style={[styles.card, props.containerStyle]}>
            <Card.Title 
                title={"Connect with friends!"} 
                titleVariant={"titleMedium"}
                titleStyle={{ fontSize: 18 }}/>
            <View style={styles.content}>
                <Text style={styles.text} variant={"labelLarge"}>
                    Sign in and connect with other fishermen to share your spots and catches!
                </Text>
                <View style={styles.image}>
                    <FishermenWithCastingNet/>
                </View>
            </View>
            <Button 
                theme={{ roundness: 2 }}
                mode={"contained-tonal"} 
                style={styles.button}
                onPress={handleNavigateToAuth}
                contentStyle={{ flexDirection: 'row-reverse' }}
                icon={({ size, color }) => (
                    <Icon name={"arrow-right"} size={size} color={color}/>
                )}
            >Sign in</Button>
        </Card>
    );
};

export default PromptLoginCard;

const styles = StyleSheet.create({
    card: {
        paddingVertical: 12
    },
    content: {
        marginHorizontal: 12,
        flexDirection: "row",
    },
    image: {
        flex: 4
    },
    text: {
        flex: 5,
        fontSize: 14,
        marginRight: 16,
        marginLeft: 4,
        marginTop: 8
    },
    button: {
        marginTop: 16,
        marginHorizontal: 12
    }
});
