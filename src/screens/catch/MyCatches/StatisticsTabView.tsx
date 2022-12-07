import React, { useEffect, useState } from "react";
import dayjs from "../../../config/dayjs";
import { useAuth } from "../../../store/auth/useAuth";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MyCatchesTabsScreenProps } from "../../../types/navigation";
import { useMyCatchesModalStore } from "../../../store/modal/useMyCatchesModalStore";
import { useGetUserCatchStatistics } from "../../../hooks/queries/useGetUserCatchStatistics";
import CatchIcon from "../../../components/icons/CatchIcon";
import globalStyles from "../../../globalStyles";
import FishAltIcon from "../../../components/icons/FishAltIcon";
import TrophyIcon from "../../../components/icons/TrophyIcon";
import HoldingCatchIcon from "../../../components/icons/HoldingCatchIcon";
import RibbonIcon from "../../../components/icons/RibbonIcon";
import GraphIcon from "../../../components/icons/GraphIcon";
import { Card } from "react-native-paper";

const StatisticsTabView = ({ navigation }: MyCatchesTabsScreenProps<'MyCatchesStatistics'>) => {

  const id = useAuth(state => state.id)
  const [refreshing, setRefreshing] = useState(false)
  const setSpecies = useMyCatchesModalStore(store => store.setSpecies)
  const setWaterbody = useMyCatchesModalStore(store => store.setWaterbody)
  const setWaterbodyTotalsVisible = useMyCatchesModalStore(store => store.setWaterbodyTotalsVisible);
  const setSpeciesTotalsVisible = useMyCatchesModalStore(store => store.setSpeciesTotalsVisible);
  const hideAllModals = () => { setWaterbodyTotalsVisible(false); setSpeciesTotalsVisible(false) }
  const { data, refetch } = useGetUserCatchStatistics(id)

  const handleRefresh = () => { setRefreshing(true); refetch().then(() => setRefreshing(false)) }

  const showWaterbodyTotals = () => {
    if(data) setWaterbodyTotalsVisible(true)
  }

  const showSpeciesTotals = () => {
    if(data) setSpeciesTotalsVisible(true)
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

  useEffect(() => navigation.addListener('blur', hideAllModals),[])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
      }>
        <Card style={styles.card} onPress={navigateTotalCatches}>
          <Card.Content style={styles.content}>
            <View style={globalStyles.frac}>
              <CatchIcon size={32}/>
              <View style={styles.text}>
                <Text style={styles.label}>Total Catches</Text>
                <Text style={styles.value}>{data?.user.catch_statistics.total_catches}</Text>
              </View>
            </View>
            <Icon name='chevron-right' size={28}/>
          </Card.Content>
        </Card>
        <Card onPress={navigateBiggestCatch} style={styles.card}>
          <Card.Content style={styles.content}>
            <View style={globalStyles.frac}>
              <TrophyIcon size={32}/>
              <View style={styles.text}>
                <Text style={styles.label}>Biggest Catch</Text>
                <Text style={styles.value}>
                  {data?.user.catch_statistics.largest_catch ?
                    `${dayjs(data.user.catch_statistics.largest_catch.created_at).fromNow()}`:
                    '—'
                  }
                </Text>
              </View>
            </View>
            <Icon name='chevron-right' size={28}/>
          </Card.Content>
        </Card>
        <Card style={styles.card} onPress={showSpeciesTotals}>
          <Card.Content style={styles.content}>
            <View style={globalStyles.frac}>
              <FishAltIcon size={32}/>
              <View style={styles.text}>
                <Text style={styles.label}>Total Species</Text>
                <Text style={styles.value}>{data?.user.catch_statistics.total_species}</Text>
              </View>
            </View>
            <Icon name='chevron-right' size={28}/>
          </Card.Content>
        </Card>
        <Card style={styles.card} onPress={navigateTopSpecies}>
          <Card.Content style={styles.content}>
            <View style={globalStyles.frac}>
              <HoldingCatchIcon size={28}/>
              <View style={styles.text}>
                <Text style={styles.label}>Top Species</Text>
                <Text style={styles.value}>{data?.user.catch_statistics.top_species || '—'}</Text>
              </View>
            </View>
            <Icon name='chevron-right' size={28}/>
          </Card.Content>
        </Card>
        <Card style={styles.card} onPress={showWaterbodyTotals}>
          <Card.Content style={styles.content}>
            <View style={globalStyles.frac}>
              <GraphIcon size={28}/>
              <View style={styles.text}>
                <Text style={styles.label}>Total Fisheries</Text>
                <Text style={styles.value}>{data?.user.catch_statistics.total_waterbodies}</Text>
              </View>
            </View>
            <Icon name='chevron-right' size={28}/>
          </Card.Content>
        </Card>
        <Card style={styles.card} onPress={navigateTopWaterbody}>
          <Card.Content style={styles.content}>
            <View style={globalStyles.frac}>
              <RibbonIcon size={32}/>
              <View style={styles.text}>
                <Text style={styles.label}>Top Fishery</Text>
                <Text style={styles.value}>{data?.user.catch_statistics.top_waterbody?.name || '—'}</Text>
              </View>
            </View>
            <Icon name='chevron-right' size={28}/>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default StatisticsTabView;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  card: {
    marginHorizontal: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'white'
  },
  content:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '500'
  },
  value: {
    fontSize: 16,
  },
  text: {
    marginLeft: 16
  }
});
