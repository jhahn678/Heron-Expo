import React from "react";
import { StyleSheet, View, Pressable, Image } from "react-native";
import { Card, Text, Title } from 'react-native-paper'
import { WaterbodyResult } from "../../../hooks/queries/useSearchWaterbodies";
import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from "../../../globalStyles";
import { truncateTotal } from "../../../utils/conversions/truncateTotal";

interface Props {
    onPress: () => void,
    data: WaterbodyResult
}

const WaterbodySearchResult = ({ onPress, data }: Props) => {
    
    return (
      <Card style={styles.container} onPress={onPress}>
        <Image source={{ uri: data.media[0]?.url }} style={styles.image} />
        <View style={[styles.heading]}>
          <Title style={styles.title} numberOfLines={1}>
            {data.name}
          </Title>
          {data.average_rating && (
            <View style={globalStyles.frac}>
              <Text style={styles.rating}>{data.average_rating}</Text>
              <Icon name="star" size={14} />
            </View>
          )}
        </View>
        {data.admin_two && data.admin_two.length === 1 ? (
          <Text style={styles.place} numberOfLines={1}>
            {data.admin_two[0]}, {data.admin_one[0]}
          </Text>
        ) : data.admin_one.length === 1 ? (
          <Text style={styles.place} numberOfLines={1}>
            {data.admin_one[0]}, {data.country}
          </Text>
        ) : data.admin_one.length > 1 && data.subregion ? (
          <Text style={styles.place} numberOfLines={1}>
            {data.subregion} {data.country}
          </Text>
        ) : data.admin_one.length > 1 ? (
          <Text style={styles.place} numberOfLines={1}>
            {`${data.admin_one[0]} + ${data.admin_one.length - 1} more`},{" "}
            {data.ccode}
          </Text>
        ) : (
          <Text style={styles.place} numberOfLines={1}>
            {data.country}
          </Text>
        )}
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
    height: 370,
    width: "90%",
    alignSelf: "center",
    borderRadius: 12,
    marginBottom: 16,
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
