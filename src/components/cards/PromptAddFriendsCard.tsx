import React from 'react'
import { Button, Card, Text } from 'react-native-paper'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FishermenWithCastingNet from '../svg/FishermenWithCastingNet'

interface Props {
    onPress: () => void
    caption?: string
    buttonLabel?: string
    containerStyle?: StyleProp<ViewStyle>
}

const PromptAddFriendsCard = ({
    caption="Add other users to see where they're fishing and what they're catching 🎣",
    buttonLabel="Search for users",
    ...props
}: Props): JSX.Element => {

    return (
        <Card style={[styles.card, props.containerStyle]}>
            <Card.Content style={styles.content}>
                <Text style={styles.text} variant={"titleMedium"}>
                    {caption}
                </Text>
                <View style={styles.image}>
                    <FishermenWithCastingNet style={styles.graphic}/>
                </View>
            </Card.Content>
            <Button 
                theme={{ roundness: 1 }}
                mode={"contained-tonal"} 
                style={styles.button}
                onPress={props.onPress}
                contentStyle={{ flexDirection: 'row-reverse' }}
                icon={({ size, color }) => (
                    <Icon name={"magnify"} size={size} color={color}/>
                )}
            >Search for users</Button>
        </Card>
    )
}

export default PromptAddFriendsCard

const styles = StyleSheet.create({
    card: {
        paddingTop: 8,
        paddingBottom: 12
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
    graphic: { 
        transform: [{ scale: .9 }]
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
