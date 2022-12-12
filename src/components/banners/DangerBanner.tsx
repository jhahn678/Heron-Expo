import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
    description?: string
    style?: StyleProp<ViewStyle>
}

const DangerBanner = ({ description="This action cannot be undone", ...props }: Props) => {
    return (
        <View style={[styles.container, props.style]}>
            <Icon name={'alert-circle-outline'} size={24} color={"#841f29"}/>
            <Text variant={"bodyMedium"} style={styles.caption}>
                Warning! {description}
            </Text>
        </View>
    )
}

export default DangerBanner;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9d7da",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    caption: {
        fontSize: 15,
        fontWeight: '700',
        color: "#85232f",
        marginLeft: 4
    }
})