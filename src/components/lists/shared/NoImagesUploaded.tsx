import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import FishermanFishing from "../../svg/FishermanFishing";

interface Props {
  style?: StyleProp<ViewStyle>
  fontSize?: number
  scale?: number
  caption?: string
}

const NoImagesUploaded = ({ style, fontSize=14, scale=1, caption }: Props) => {
  
  return (
    <View style={[styles.container, style, { transform: [{ scale }]}]}>
      <FishermanFishing/>
      <Text style={[styles.label, { fontSize }]}>{caption || "No uploaded images"}</Text>
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
    label: {
        fontWeight: '500',
        fontSize: 10,
        marginTop: 16
    }
});
