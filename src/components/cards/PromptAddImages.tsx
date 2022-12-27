import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FishermanFishingCattails from "../svg/FishermanFishingCattails";

interface Props {
    caption?: string
    buttonLabel?: string
    containerStyle?: StyleProp<ViewStyle>
    onPress: () => void
}

const PromptAddImages = ({ 
    caption="It looks like no images have been uploaded yet..",
    buttonLabel="Upload an image",
    ...props
}: Props) => {
    return (
        <Card style={[styles.card, props.containerStyle]}>
            <Card.Content style={styles.content}>
                <Text style={styles.text} variant={"titleMedium"}>
                    {caption}
                </Text>
                <View style={styles.image}>
                    <FishermanFishingCattails style={{ transform: [{ scale: .85 }]}}/>
                </View>
            </Card.Content>
            <Button 
                style={styles.button}
                onPress={props.onPress}
                mode={"contained-tonal"}
                contentStyle={{ flexDirection: 'row-reverse' }}
                icon={({ color, size }) => <Icon name={"camera-outline"} color={color} size={size}/>}
                theme={{ roundness: 1 }}>{buttonLabel}</Button>
        </Card>
    );
};

export default PromptAddImages;

const styles = StyleSheet.create({
    card: {
        paddingTop: 6,
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
    text: {
        flex: 3,
        marginRight: 24
    },
    button: {
        marginTop: 24,
        marginHorizontal: 12
    }
});