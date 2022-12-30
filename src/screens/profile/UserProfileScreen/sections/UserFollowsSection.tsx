import { View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../../../config/theme'
const { width } = Dimensions.get("screen")

interface Props {
    totalFollowers: number | undefined | null
    onNavigateFollowing: () => void
    totalFollowing: number | undefined | null
    onNavigateFollowers: () => void
}

const UserFollowsSection = ({ 
    totalFollowers=0, 
    totalFollowing=0, 
    onNavigateFollowers, 
    onNavigateFollowing 
}: Props) => {

    return (
        <View style={styles.container}>
            <Pressable style={styles.stack} onPress={onNavigateFollowing}>
                <Text variant={'titleLarge'} style={styles.count}>{totalFollowing}</Text>
                <Text variant={"labelLarge"}>Following</Text>
            </Pressable>
            <View style={styles.divider}/>
            <Pressable style={styles.stack} onPress={onNavigateFollowers}>
                <Text variant={'titleLarge'} style={styles.count}>{totalFollowers}</Text>
                <Text variant={"labelLarge"}>Followers</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondaryContainer,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.00,
        elevation: 2,
    },
    divider: {
        width: 1,
        height: 50,
        marginHorizontal: 40,
        backgroundColor: theme.colors.onPrimaryContainer
    },
    stack: {
        display: 'flex',
        alignItems: 'center'
    },
    count: {
        fontSize: 20,
        fontWeight: '700'
    },
    label: {
        fontWeight: '500'
    }
})

export default UserFollowsSection;