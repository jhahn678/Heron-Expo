import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Privacy } from "../../types/Location";
import { privacyToLabel } from "../../utils/conversions/privacyToLabel";
import { privacyToIcon } from "../../utils/conversions/privacyToIcon";

interface Props {
    privacy: Privacy | undefined
    style?: StyleProp<ViewStyle>
    iconSize?: number
    labelStyle?: StyleProp<TextStyle>
}

const PrivacyLabel = ({ privacy, style, labelStyle, iconSize=12 }: Props) => {

    if(!privacy) return null;

    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.label, labelStyle]}>
                {privacyToLabel(privacy)}
            </Text>
            <Icon name={privacyToIcon(privacy)} size={iconSize}/>
        </View>
    );
};

export default PrivacyLabel;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        marginRight: 4,
        fontSize: 12,
        fontWeight: '500'
    }
});
