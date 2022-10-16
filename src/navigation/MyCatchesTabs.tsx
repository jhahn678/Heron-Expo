import { View, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { BottomTabsScreenProps, MyCatchesTabsParams } from "../types/navigation";
import CatchesTabView from "../screens/catch/MyCatches/CatchesTabView";
import StatisticsTabView from "../screens/catch/MyCatches/StatisticsTabView";
import HeadingSection from '../screens/catch/MyCatches/sections/HeadingSection';
import FilterDateBottomSheet from '../components/modals/myCatches/FilterDateBottomSheet';
import FilterSpeciesBottomSheet from '../components/modals/myCatches/FilterSpeciesBottomSheet';
import FilterWaterbodyBottomSheet from '../components/modals/myCatches/FilterWaterbodyBottomSheet';
import FilterLengthBottomSheet from '../components/modals/myCatches/FilterLengthBottomSheet';
import FilterWeightBottomSheet from '../components/modals/myCatches/FilterWeightBottomSheet';
import WaterbodyTotalsBottomSheet from '../components/modals/myCatches/WaterbodyTotalsBottomSheet';
import SpeciesTotalsBottomSheet from '../components/modals/myCatches/SpeciesTotalsBottomSheet';
import { FAB } from 'react-native-paper';
import FishIcon from '../components/icons/FishIcon';
import { useMyCatchesModalStore } from '../store/modal/useMyCatchesModalStore';

const Tab = createMaterialTopTabNavigator<MyCatchesTabsParams>();

const MyCatchesTabs = ({ navigation }: BottomTabsScreenProps<'MyCatchesScreen'>) => {

  const handleNewCatch = () => navigation.navigate('NewCatchScreen')
  const waterbodyTotalsVisible = useMyCatchesModalStore(store => store.waterbodyTotalsVisible)

  return (
    <View style={styles.container}>
      <HeadingSection/>
      <Tab.Navigator initialRouteName={'MyCatchesList'}>
        <Tab.Screen
          name="MyCatchesList"
          component={CatchesTabView}
          options={{ tabBarLabel: 'View List' }}
        />
        <Tab.Screen
          name="MyCatchesStatistics"
          component={StatisticsTabView}
          options={{ tabBarLabel: 'Statistics' }}
        />
      </Tab.Navigator>
      <FAB 
        icon={({ size, color }) => (
          <FishIcon color={color} size={size}/>
        )} 
        animated={false}
        onPress={handleNewCatch}
        customSize={64} 
        theme={{ roundness: 2 }}
        style={styles.fab}
      />
      <FilterDateBottomSheet/>
      <FilterSpeciesBottomSheet/>
      <FilterWaterbodyBottomSheet/>
      <FilterLengthBottomSheet/>
      <FilterWeightBottomSheet/>
      <WaterbodyTotalsBottomSheet/>
      <SpeciesTotalsBottomSheet/>
    </View>
  );
};

export default MyCatchesTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  fab: { 
    position: 'absolute', 
    zIndex: 100, 
    right: 24, 
    bottom: 36, 
  }
})

