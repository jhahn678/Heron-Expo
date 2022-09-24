import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MyCatchesTabsScreenProps } from "../../../types/navigation";
import { useGetUserCatchStatistics } from "../../../hooks/queries/useGetUserCatchStatistics";
import { useAuth } from "../../../store/auth/useAuth";
import dayjs from "../../../config/dayjs";
import { IconButton, TouchableRipple } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const StatisticsTabView = ({ navigation }: MyCatchesTabsScreenProps<'MyCatchesStatistics'>) => {

  const id = useAuth(state => state.id)

  const { data, error, loading } = useGetUserCatchStatistics(id)

  const navigateTotalCatches = () => navigation.jumpTo('MyCatchesList')

  const navigateBiggestCatch = () => {
    if(!data || !data.user.catch_statistics.largest_catch) return;
    navigation.navigate('ViewCatchScreen', { id: data.user.catch_statistics.largest_catch.id })
  }

  const navigateTopWaterbody = () => {
    if(!data || !data.user.catch_statistics.top_waterbody) return;
    navigation.navigate('ExploreStack', { screen: 'WaterbodyScreen', params: { 
      id: data.user.catch_statistics.top_waterbody.id 
    }})
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.row} onPress={navigateTotalCatches}>
          <View>
            <Text style={styles.label}>Total Catches</Text>
            <Text style={styles.value}>{data?.user.catch_statistics.total_catches}</Text>
          </View>
          <Icon name='chevron-right' size={28}/>
      </Pressable>
      <Pressable onPress={navigateBiggestCatch} style={styles.row}>
        <View>
          <Text style={styles.label}>Biggest Catch</Text>
          <Text style={styles.value}>
            {data?.user.catch_statistics.largest_catch ?
              `${dayjs(data.user.catch_statistics.largest_catch.created_at).fromNow()}`:
              '—'
            }
          </Text>
        </View>
        <Icon name='chevron-right' size={28}/>
      </Pressable>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Total Species</Text>
          <Text style={styles.value}>{data?.user.catch_statistics.total_species}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Top Species</Text>
          <Text style={styles.value}>{data?.user.catch_statistics.top_species || '—'}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Total Places</Text>
          <Text style={styles.value}>{data?.user.catch_statistics.total_waterbodies}</Text>
        </View>
      </View>
      <Pressable style={styles.row} onPress={navigateTopWaterbody}>
        <View>
          <Text style={styles.label}>Top Fishery</Text>
          <Text style={styles.value}>{data?.user.catch_statistics.top_waterbody.name}</Text>
        </View>
        <Icon name='chevron-right' size={28}/>
      </Pressable>
    </View>
  );
};

export default StatisticsTabView;

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  row: {
    height: 72,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontWeight: '500',
    fontSize: 15
  }
});
