import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from 'react-native-paper'
import FishingFromBoat from "../../svg/FishingFromBoat";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ReviewsListEmpty = ({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <FishingFromBoat/>
      <Text style={styles.label}>No Reviews Yet</Text>
    </View>
  );
};

export default ReviewsListEmpty;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: '50%'
  },
  label: {
    fontWeight: "500",
    marginTop: 16
  },
});
