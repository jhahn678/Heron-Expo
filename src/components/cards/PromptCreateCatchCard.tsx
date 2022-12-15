import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import FishIcon from '../icons/FishIcon'
import FishermanFishingFromChair from '../svg/FishermanFishingFromChair'

interface Props {
    caption?: string
    buttonLabel?: string
    containerStyle?: StyleProp<ViewStyle>
    onPress: () => void
}

const PromptCreateCatchCard = ({ 
    caption="It looks like no catches have been logged here yet..",
    buttonLabel="Log the first catch",
    ...props
}: Props) => {
    return (
        <Card style={[styles.card, props.containerStyle]}>
            <Card.Content style={styles.content}>
                <Text style={styles.text} variant={"titleMedium"}>
                    {caption}
                </Text>
                <View style={styles.image}>
                    <FishermanFishingFromChair/>
                </View>
            </Card.Content>
            <Button 
                style={styles.button}
                onPress={props.onPress}
                mode={"contained-tonal"}
                contentStyle={{ flexDirection: 'row-reverse' }}
                icon={({ color, size }) => <FishIcon color={color} size={size}/>}
                theme={{ roundness: 1 }}>{buttonLabel}</Button>
        </Card>
    );
};

export default PromptCreateCatchCard;

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