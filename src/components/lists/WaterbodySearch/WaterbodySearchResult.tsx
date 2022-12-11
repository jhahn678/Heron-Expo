import React from "react";
import { StyleSheet, View, Dimensions, Image, ViewStyle, StyleProp } from "react-native";
import { Card, Text, Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from "../../../globalStyles";
import { truncateTotal } from "../../../utils/conversions/truncateTotal";
import { waterbodyLocationLabel } from "../../../utils/conversions/waterbodyLocationToLabel";
import { WaterbodyDetails } from "../../../types/Waterbody";
import { imageUriHandler } from "../../../utils/conversions/imageUriHandler";
const { width } = Dimensions.get('screen')

interface Props<T> {
  data: T
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
}

const WaterbodySearchResult = <T extends WaterbodyDetails>({ onPress, data, containerStyle }: Props<T>) => {
  
  return (
    <Card style={[styles.container, containerStyle]} onPress={onPress}>
      <Image source={{ uri: imageUriHandler(data) }} style={styles.image} resizeMode={"cover"}/>
        <View style={styles.heading}>
          <Title style={styles.title} numberOfLines={1}>
            {data.name}
          </Title>
          <View style={[globalStyles.frac]}>
            <Text style={styles.rating}>{data.average_rating ? data.average_rating : 0}</Text>
            <Icon name="star" size={14} color={'#f1c40f'}/>
          </View>
        </View>
        <Text style={styles.place} numberOfLines={1}>
          {waterbodyLocationLabel(data)}
        </Text>
        <Text style={styles.totals}>
          {truncateTotal(data.total_catches)} catches logged
          {"  "}&bull;{"  "}
          {truncateTotal(data.total_locations)} saved locations
        </Text>
    </Card>
  );
};

export default WaterbodySearchResult;

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    alignSelf: "center",
    borderRadius: 12,
    marginBottom: 24,
    paddingBottom: 12
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    maxWidth: '90%'
  },
  rating: {
    fontWeight: "500",
    marginRight: 2,
    alignSelf: "center",
  },
  image: {
    height: 250,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  place: {
    fontWeight: "500",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  totals: {
    marginTop: 4,
    fontSize: 14,
    paddingHorizontal: 12
  },
});
