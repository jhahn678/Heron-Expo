import globalStyles from "../../globalStyles";
import { StyleSheet, View, StyleProp, TextStyle } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from 'react-native-paper'

interface Props {
    totalMedia: number,
    iconSize?: number
    textStyle?: StyleProp<TextStyle>
}

const TotalMediaIcon = (props: Props): JSX.Element => {
    
    return (
        <View style={globalStyles.frsb}>
            <Text style={[styles.text, props.textStyle]}>{props.totalMedia}</Text>
            <Icon name='image-multiple-outline' size={props.iconSize || 16}/>
        </View>
    );
};

export default TotalMediaIcon;

const styles = StyleSheet.create({
    text: {
        fontWeight: '600',
        marginRight: 6,
    }
});
