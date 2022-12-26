import React from 'react'
import { Button, Card, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FishermenWithCastingNet from '../svg/FishermenWithCastingNet'

interface Props {
    containerStyle?: StyleProp<ViewStyle>
}

const PromptAddFriendsCard = (props: Props): JSX.Element => {

    const navigation = useNavigation()//@ts-ignore
    const handleNavigateUserSearch = () => navigation.navigate("UserSearchScreen")

    return (
        <Card style={[styles.card, props.containerStyle]}>
            <Card.Title 
                title={"Connect with friends!"} 
                titleVariant={"titleMedium"}
                titleStyle={{ fontSize: 18 }}/>
            <View style={styles.content}>
                <Text style={styles.text} variant={"labelLarge"}>
                    Add other users to see where they're fishing and what they're catching 🎣
                </Text>
                <View style={styles.image}>
                    <FishermenWithCastingNet/>
                </View>
            </View>
            <Button 
                theme={{ roundness: 1 }}
                mode={"contained-tonal"} 
                style={styles.button}
                onPress={handleNavigateUserSearch}
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
