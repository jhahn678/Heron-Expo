import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import FishermanFishing from "../../svg/FishermanFishing";

interface Props {
    style?: StyleProp<ViewStyle>
}

const NoImagesUploaded = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <FishermanFishing/>
      <Text style={styles.text}>No uploaded images</Text>
    </View>
  );
};

export default NoImagesUploaded;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: '500',
        fontSize: 10,
        marginTop: 16
    }
});
