import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FisherWomanFishing from "../svg/FisherwomanFishing";

interface Props {
    caption?: string
    buttonLabel?: string
    containerStyle?: StyleProp<ViewStyle>
    onPress: () => void
}

const PromptNearbyCatch = ({ 
    caption="It looks like no catches have been logged in your area yet..",
    buttonLabel="Log a local catch",
    ...props
}: Props) => {
    return (
        <Card style={[styles.card, props.containerStyle]}>
            <Card.Content style={styles.content}>
                <View style={styles.image}>
                    <FisherWomanFishing style={styles.graphic}/>
                </View>
                <Text style={styles.text} variant={"titleMedium"}>
                    {caption}
                </Text>
            </Card.Content>
            <Button 
                style={styles.button}
                onPress={props.onPress}
                mode={"contained-tonal"}
                contentStyle={{ flexDirection: 'row-reverse' }}
                theme={{ roundness: 1 }}
                icon={({ color, size }) => (
                    <Icon name={"map-outline"} size={size} color={color}/>
                )}>{buttonLabel}</Button>
        </Card>
    );
};

export default PromptNearbyCatch;

const styles = StyleSheet.create({
    card: {
        paddingBottom: 12
    },
    content: {
        marginHorizontal: 12,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    image: {
        flex: 2
    },
    graphic: { 
        transform: [
            { scale: .8 }, 
            { translateY: 8 }
        ]
    },
    text: {
        flex: 3,
        marginLeft: 20
    },
    button: {
        marginTop: 24,
        marginHorizontal: 12
    }
});