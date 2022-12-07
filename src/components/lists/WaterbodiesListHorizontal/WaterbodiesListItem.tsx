import React from 'react'
import { StyleSheet, View, Image, ViewStyle } from 'react-native'
import { Card, Text, Title } from 'react-native-paper'
import { IWaterbody } from '../../../types/Waterbody'
import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../../../globalStyles'
import { truncateTotal } from '../../../utils/conversions/truncateTotal'
import { IMedia } from '../../../types/Media'
import { waterbodyLocationLabel } from '../../../utils/conversions/waterbodyLocationToLabel'
import { imageUriHandler } from '../../../utils/imageUriHandler'


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
    <Card style={[styles.container, containerStyle]} onPress={() => navigate(data.id)} elevation={1}>
      <Image source={{ uri: imageUriHandler(data) }} style={styles.image} />
      <View style={styles.heading}>
        <Title style={styles.title} numberOfLines={1}>
          {data.name}
        </Title>
        <View style={globalStyles.frac}>
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
}

export default WaterbodiesListItem

const styles = StyleSheet.create({
  container: {
    width: 300,
    borderRadius: 12,
    marginRight: 16,
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
    marginBottom: 0,
    fontWeight: "600",
    maxWidth: '90%'
  },
  rating: {
    fontWeight: "500",
    marginRight: 2,
    alignSelf: "center",
  },
  place: {
    fontWeight: "500",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  image: {
    height: 220,
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