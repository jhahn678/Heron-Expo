import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from 'react-native-paper'
import FishermanCasting from "../../../../components/svg/FishermanCasting";

interface Props {
    navigateUserSearch: () => void
}

const FindUsers = ({ navigateUserSearch }: Props) => {



    return (
        <View style={styles.prompt}>
            <View style={styles.left}>
                <FishermanCasting/>
            </View>
            <View style={styles.right}>
                <Text style={styles.caption}>Follow other fisherman to see what they're catching and where they're fishing 🎣</Text>
                <Button 
                    icon={'arrow-right'}
                    labelStyle={{ fontSize: 14 }}
                    contentStyle={{ flexDirection: 'row-reverse'}}
                    onPress={navigateUserSearch} 
                    style={styles.button}
                >Connect With Friends</Button>
            </View>
        </View>
    );
};

export default FindUsers;

const styles = StyleSheet.create({
    prompt: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 40,
        marginTop: 40
    },
    left: {
        transform: [{ scale: 2 },{ translateY: -4 }],
        alignItems: 'center',
        flex: 2.2,
    },
    right: {
        alignItems: 'center',
        flex: 3
    },
    caption: {
        fontWeight: '500',
        textAlign: 'justify',
        marginBottom: 12,
        lineHeight: 20
    },
    button: {
        alignSelf: 'flex-end',
        transform: [{ translateX: 8 }]
    }
});
