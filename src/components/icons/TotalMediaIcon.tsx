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
            <Icon name='image-multiple-outline' size={props.iconSize || 16}/>
            <Text style={[styles.text, props.textStyle]}>{props.totalMedia}</Text>
        </View>
    );
};

export default TotalMediaIcon;

const styles = StyleSheet.create({
    text: {

    }
});
