import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
    label: string
    percent?: number
}

const RatingGraphBar = ({ label, percent=0 }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Icon name='star' color={'#f1c40f'} size={20}/>
            <View style={styles.bar}>
                <View style={[styles.fill, { width: `${percent || 0}%`}]}/>
            </View>
        </View>
    )
}

export default RatingGraphBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontWeight: '400',
        fontSize: 14,
        marginRight: 4
    },
    bar: {
        backgroundColor: '#e0e0e0',
        height: 5,
        borderRadius: 8,
        marginLeft: 8,
        flexGrow: 1
    },
    fill: {
        backgroundColor: '#f1c40f',
        height: '100%',
        borderRadius: 8
    }
});
