import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from 'react-native-paper'
import FishermanInBoat from "../../svg/FishermanInBoat";

interface Props {
    style?: StyleProp<ViewStyle>
}

const CatchesListEmpty = ({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <FishermanInBoat />
      <Text style={styles.label}>No catches logged yet</Text>
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
