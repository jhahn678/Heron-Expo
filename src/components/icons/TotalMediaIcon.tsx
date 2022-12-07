import globalStyles from "../../globalStyles";
import { StyleSheet, View, StyleProp, TextStyle } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from 'react-native-paper'

interface Props {
    totalMedia: number,
    iconSize?: number
    textStyle?: StyleProp<TextStyle>
}

const TotalMediaIcon = ({ iconSize=16, totalMedia=0, ...props }: Props): JSX.Element => {
    
    return (
        <View style={globalStyles.frsb}>
            <Text style={[styles.text, props.textStyle]}>{totalMedia}</Text>
            <Icon name='image-multiple-outline' size={iconSize}/>
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
