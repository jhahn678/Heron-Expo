import { View, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { BottomTabsScreenProps, MyPlacesTabsParams } from "../types/navigation";
import { FAB } from 'react-native-paper';
import HeadingSection from '../screens/location/MyPlacesTabs/sections/HeadingSection';
import AddLocationIcon from '../components/icons/AddLocationIcon';
import SavedPlacesTabView from '../screens/location/MyPlacesTabs/SavedLocationsTabView';
import MyLocationsTabView from '../screens/location/MyPlacesTabs/MyLocationsTabView';
import FilterWaterbodyBottomSheet from '../components/modals/my-places/FilterWaterbodyBottomSheet';
import FilterDateBottomSheet from '../components/modals/my-places/FilterDateBottomSheet';
import FilterPrivacyBottomSheet from '../components/modals/my-places/FilterPrivacyBottomSheet';
import FilterSortBottomSheet from '../components/modals/my-places/FilterSortBottomSheet';
import SavedWaterbodiesTabView from '../screens/location/MyPlacesTabs/SavedWaterbodiesTabView';

const Tab = createMaterialTopTabNavigator<MyPlacesTabsParams>();

const MyPlacesTabs = ({ navigation }: BottomTabsScreenProps<'MyPlacesScreen'>) => {

    const navigateNewLocation = () => navigation.navigate('NewLocationScreen')

    return (
        <View style={styles.container}>
            <HeadingSection/>
            <Tab.Navigator initialRouteName={'MyLocationsList'}>
                <Tab.Screen
                name={'MyLocationsList'}
                component={MyLocationsTabView}
                options={{ tabBarLabel: 'Saved' }}
                />
                <Tab.Screen
                name={'MySavedLocations'}
                component={SavedPlacesTabView}
                options={{ tabBarLabel: 'Bookmarked' }}
                />
                <Tab.Screen
                name={'MySavedWaterbodies'}
                component={SavedWaterbodiesTabView}
                options={{ tabBarLabel: 'Fisheries' }}
                />
            </Tab.Navigator>
            <FAB 
                icon={({ size, color }) => (
                    <AddLocationIcon color={color} size={size}/>
                )} 
                animated={false}
                onPress={navigateNewLocation}
                customSize={64} 
                theme={{ roundness: 2 }}
                style={styles.fab}
            />
            <FilterDateBottomSheet/>
            <FilterWaterbodyBottomSheet/>
            <FilterPrivacyBottomSheet/>
            <FilterSortBottomSheet/>
        </View>
    );
};

export default MyPlacesTabs;

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

