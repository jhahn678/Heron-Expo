import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from 'react-native-paper'
import FishermanInRaft from "../../svg/FishermanInRaft";

interface Props {
  style?: StyleProp<ViewStyle>
  fontSize?: number
  scale?: number
  caption?: string
}

const LocationsListEmpty = ({ style, fontSize=14, scale=1, caption }: Props) => {
  return (
    <View style={[styles.container, style, { transform: [{ scale }]}]}>
      <FishermanInRaft/>
     <Text style={[styles.label, { fontSize }]}>{caption || "No locations available"}</Text>
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
