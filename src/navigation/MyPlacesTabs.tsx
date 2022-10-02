import { View, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { BottomTabsScreenProps, MyPlacesTabsParams } from "../types/navigation";
import { FAB } from 'react-native-paper';
import HeadingSection from '../screens/location/MyPlacesTabs/sections/HeadingSection';
import AddLocationIcon from '../components/icons/AddLocationIcon';
import SavedPlacesTabView from '../screens/location/MyPlacesTabs/SavedPlacesTabView';
import MyLocationsTabView from '../screens/location/MyPlacesTabs/MyLocationsTabView';
import FilterWaterbodyBottomSheet from '../components/modals/myPlaces/FilterWaterbodyBottomSheet';
import FilterDateBottomSheet from '../components/modals/myPlaces/FilterDateBottomSheet';

const Tab = createMaterialTopTabNavigator<MyPlacesTabsParams>();

const MyPlacesTabs = ({ navigation }: BottomTabsScreenProps<'MyPlacesScreen'>) => {

    const handleNewLocation = () => navigation.navigate('NewLocationScreen')

    return (
        <View style={styles.container}>
            <HeadingSection/>
            <Tab.Navigator initialRouteName={'MyLocationsList'}>
                <Tab.Screen
                name={'MyLocationsList'}
                component={MyLocationsTabView}
                options={{ tabBarLabel: 'My Locations' }}
                />
                <Tab.Screen
                name={'MySavedPlaces'}
                component={SavedPlacesTabView}
                options={{ tabBarLabel: 'Saved' }}
                />
            </Tab.Navigator>
            <FAB 
                icon={({ size, color }) => (
                    <AddLocationIcon color={color} size={size}/>
                )} 
                animated={false}
                onPress={handleNewLocation}
                customSize={64} 
                theme={{ roundness: 2 }}
                style={styles.fab}
            />
            <FilterDateBottomSheet/>
            <FilterWaterbodyBottomSheet/>
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

