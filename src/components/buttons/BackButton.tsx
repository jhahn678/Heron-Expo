import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, IconButtonProps } from "react-native-paper";

interface Props {
    style?: StyleProp<ViewStyle>
    size?: number
    mode?: IconButtonProps['mode']
}

const BackButton = (props: Props): JSX.Element => {

    const navigation = useNavigation()

    return (
        <IconButton 
            size={props.size || 24}
            mode={props.mode || 'contained'}
            style={[props.style, { zIndex: 100 }]}
            onPress={navigation.goBack} 
            icon='chevron-left'
        />
    );
};

export default BackButton;

const styles = StyleSheet.create({});
