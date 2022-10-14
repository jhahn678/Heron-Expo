import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { Card, Text, Title } from 'react-native-paper'
import { WaterbodyResult } from "../../../hooks/queries/useSearchWaterbodies";
import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from "../../../globalStyles";
import { truncateTotal } from "../../../utils/conversions/truncateTotal";
import { waterbodyLocationLabel } from "../../../utils/conversions/waterbodyLocationToLabel";
const { width } = Dimensions.get('screen')

interface Props {
    onPress: () => void,
    data: WaterbodyResult
}

const WaterbodySearchResult = ({ onPress, data }: Props) => {
    
    return (
      <Card style={styles.container} onPress={onPress} elevation={0}>
        <Image source={{ uri: data.media[0]?.url }} style={styles.image} />
        <View style={[styles.heading]}>
          <Title style={styles.title} numberOfLines={1}>
            {data.name}
          </Title>
          <View style={[globalStyles.frac]}>
            <Text style={styles.rating}>{data.average_rating || 0}</Text>
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
    height: 360,
    width: width - 32,
    marginHorizontal: 16,
    alignSelf: "center",
    borderRadius: 12,
    marginBottom: 24,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 2,
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
    height: "70%",
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  place: {
    fontWeight: "500",
    fontSize: 15,
    paddingHorizontal: 12,
    paddingBottom: 2,
  },
  totals: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  }
});
