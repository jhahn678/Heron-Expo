import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from 'react-native-paper'
import FishermanInRaft from "../../svg/FishermanInRaft";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const LocationsListEmpty = ({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <FishermanInRaft/>
      <Text style={styles.label}>No locations logged yet</Text>
    </View>
  );
};

export default LocationsListEmpty;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  label: {
    fontWeight: "500",
    marginTop: 16
  },
});
