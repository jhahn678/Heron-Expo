import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { WaterbodyListItem } from '../../../types/Waterbody'
import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../../../globalStyles'
import { truncateTotal } from '../../../utils/conversions/truncateTotal'


interface Props<T> {
  data: T,
  /** Navigates to waterbody screen */
  navigate: (id: number) => void
}

const WaterbodiesListItem = <T extends WaterbodyListItem>({ data, navigate }: Props<T>) => {
  
  return (
    <Card style={styles.container} onPress={() => navigate(data.id)} elevation={0}>
      <Image source={{ uri: data.media[0]?.url }} style={styles.image} />
      <View style={styles.heading}>
        <Text style={styles.title} numberOfLines={1}>
          {data.name}
        </Text>
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
}

export default WaterbodiesListItem

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 320,
    marginVertical: 24,
    borderRadius: 12,
    marginRight: 16
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
  place: {
    fontWeight: "500",
    fontSize: 15,
    paddingHorizontal: 12,
    paddingBottom: 2,
  },
  image: {
    height: "68%",
    backgroundColor: "#e3e3e3",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  totals: {
    marginTop: 4,
    fontSize: 13,
    paddingHorizontal: 12
  },
});