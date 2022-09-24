import { View, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MyCatchesTabsParams } from "../types/navigation";
import CatchesTabView from "../screens/catch/MyCatches/CatchesTabView";
import StatisticsTabView from "../screens/catch/MyCatches/StatisticsTabView";
import HeadingSection from '../screens/catch/MyCatches/sections/HeadingSection';
import FilterDateBottomSheet from '../components/modals/myCatches/FilterDateBottomSheet';
import FilterSpeciesBottomSheet from '../components/modals/myCatches/FilterSpeciesBottomSheet';
import FilterWaterbodyBottomSheet from '../components/modals/myCatches/FilterWaterbodyBottomSheet';
import FilterLengthBottomSheet from '../components/modals/myCatches/FilterLengthBottomSheet';
import FilterWeightBottomSheet from '../components/modals/myCatches/FilterWeightBottomSheet';

const Tab = createMaterialTopTabNavigator<MyCatchesTabsParams>();

const MyCatchesTabs = () => {

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
      <FilterDateBottomSheet/>
      <FilterSpeciesBottomSheet/>
      <FilterWaterbodyBottomSheet/>
      <FilterLengthBottomSheet/>
      <FilterWeightBottomSheet/>
    </View>
  );
};

export default MyCatchesTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  }
})

