import React from "react";
import dayjs from "../../../config/dayjs";
import { useAuth } from "../../../store/auth/useAuth";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MyCatchesTabsScreenProps } from "../../../types/navigation";
import { useMyCatchesModalStore } from "../../../store/modal/useMyCatchesModalStore";
import { useGetUserCatchStatistics } from "../../../hooks/queries/useGetUserCatchStatistics";

const StatisticsTabView = ({ navigation }: MyCatchesTabsScreenProps<'MyCatchesStatistics'>) => {

  const id = useAuth(state => state.id)

  const setSpecies = useMyCatchesModalStore(store => store.setSpecies)
  const setWaterbody = useMyCatchesModalStore(store => store.setWaterbody)
  const setWaterbodyTotalsVisible = useMyCatchesModalStore(store => store.setWaterbodyTotalsVisible);
  const setSpeciesTotalsVisible = useMyCatchesModalStore(store => store.setSpeciesTotalsVisible);
  const { data, error, loading } = useGetUserCatchStatistics(id)

  const showWaterbodyTotals = () => {
    if(data && data.user.catch_statistics.total_waterbodies > 0){
      setWaterbodyTotalsVisible(true)
    }
  }

  const showSpeciesTotals = () => {
    if(data && data.user.catch_statistics.total_species > 0){
      setSpeciesTotalsVisible(true)
    }
  }

  const navigateTotalCatches = () => navigation.jumpTo('MyCatchesList')

  const navigateTopSpecies = () => {
    if(!data || !data.user.catch_statistics.top_species) return;
    setSpecies(data.user.catch_statistics.top_species)
    navigation.jumpTo('MyCatchesList')
  }

  const navigateBiggestCatch = () => {
    if(data && data.user.catch_statistics.largest_catch){
      navigation.navigate('ViewCatchScreen', { id: data.user.catch_statistics.largest_catch.id })
    }
  }

  const navigateTopWaterbody = () => {
    if(!data || !data.user.catch_statistics.top_waterbody) return;
    setWaterbody(data.user.catch_statistics.top_waterbody.id)
    navigation.jumpTo('MyCatchesList')
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
      <Pressable style={styles.row} onPress={showSpeciesTotals}>
        <View>
          <Text style={styles.label}>Total Species</Text>
          <Text style={styles.value}>{data?.user.catch_statistics.total_species}</Text>
        </View>
        <Icon name='chevron-right' size={28}/>
      </Pressable>
      <Pressable style={styles.row} onPress={navigateTopSpecies}>
        <View>
          <Text style={styles.label}>Top Species</Text>
          <Text style={styles.value}>{data?.user.catch_statistics.top_species || '—'}</Text>
        </View>
        <Icon name='chevron-right' size={28}/>
      </Pressable>
      <Pressable style={styles.row} onPress={showWaterbodyTotals}>
        <View>
          <Text style={styles.label}>Total Fisheries</Text>
          <Text style={styles.value}>{data?.user.catch_statistics.total_waterbodies}</Text>
        </View>
        <Icon name='chevron-right' size={28}/>
      </Pressable>
      <Pressable style={styles.row} onPress={navigateTopWaterbody}>
        <View>
          <Text style={styles.label}>Top Fishery</Text>
          <Text style={styles.value}>{data?.user.catch_statistics.top_waterbody?.name}</Text>
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
