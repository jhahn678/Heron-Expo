import React from 'react'
import { StyleSheet, View, Image, ViewStyle } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { IWaterbody } from '../../../types/Waterbody'
import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../../../globalStyles'
import { truncateTotal } from '../../../utils/conversions/truncateTotal'
import { IMedia } from '../../../types/Media'
import { waterbodyLocationLabel } from '../../../utils/conversions/waterbodyLocationToLabel'

export interface WaterbodyListItem extends Omit<IWaterbody, 'weight' | 'oid'> {
  media: Pick<IMedia, "url" | "id">[];
  total_catches: number;
  total_locations: number;
  average_rating: number | null;
}


interface Props<T> {
  data: T,
  /** Navigates to waterbody screen */
  navigate: (id: number) => void
  containerStyle?: ViewStyle
}

const WaterbodiesListItem = <T extends WaterbodyListItem>({ data, navigate, containerStyle }: Props<T>) => {
  
  return (
    <Card style={[styles.container, containerStyle]} onPress={() => navigate(data.id)} elevation={0}>
      <Image source={{ uri: data.media[0]?.url }} style={styles.image} />
      <View style={styles.heading}>
        <Text style={styles.title} numberOfLines={1}>
          {data.name}
        </Text>
        <View style={globalStyles.frac}>
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
}

export default WaterbodiesListItem

const styles = StyleSheet.create({
  container: {
    height: 320,
    width: 300,
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