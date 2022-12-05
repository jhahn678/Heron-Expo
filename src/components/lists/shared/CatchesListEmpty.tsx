import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from 'react-native-paper'
import FishermanInBoat from "../../svg/FishermanInBoat";

interface Props {
    style?: StyleProp<ViewStyle>
    fontSize?: number
    scale?: number
    caption?: string
}

const CatchesListEmpty = ({ style, fontSize=14, scale=1, caption="No catches logged yet" }: Props) => {
  return (
    <View style={[styles.container, style, { transform: [{ scale }]}]}>
      <FishermanInBoat />
      <Text style={[styles.label, { fontSize }]}>{caption}</Text>
    </View>
  );
};

export default CatchesListEmpty;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  label: {
    fontWeight: "500",
    marginTop: 16,
  },
});
