import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from 'react-native-paper'
import FishingFromBoat from "../../svg/FishingFromBoat";

interface Props {
    style?: StyleProp<ViewStyle>
    fontSize?: number
    scale?: number
    caption?: string
}

const ReviewsListEmpty = ({ style, fontSize=14, scale=1, caption }: Props) => {
  return (
    <View style={[styles.container, style, { transform: [{ scale }]}]}>
      <FishingFromBoat/>
      <Text style={[styles.label, { fontSize }]}>{caption || "No Reviews yet"}</Text>
    </View>
  );
};

export default ReviewsListEmpty;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  label: {
    fontWeight: "500",
    marginTop: 16
  },
});
