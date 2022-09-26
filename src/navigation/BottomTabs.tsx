import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreStack from "./ExploreStack";
import MyLocationsScreen from "../screens/location/MyLocationsScreen";
import MyProfileScreen from '../screens/profile/MyProfileScreen/MyProfileScreen'
import { BottomTabsParams } from "../types/navigation";
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MyCatchesTabs from "./MyCatchesTabs";
import FishIcon from "../components/icons/FishIcon";


const BottomTabs = (): JSX.Element => {

    const Tabs = createBottomTabNavigator<BottomTabsParams>();

    return(
        <Tabs.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
            <Tabs.Screen name='ExploreStack' component={ExploreStack} options={{ 
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color, size }) => <MCIcon name='map-search-outline' color={color} size={size}/>
            }}/>
            <Tabs.Screen name='MyCatchesScreen' component={MyCatchesTabs} options={{ 
                tabBarLabel: 'Catches',
                tabBarIcon: ({ color, size }) => <FishIcon color={color} size={size}/>
            }}/>
            <Tabs.Screen name='MyLocationsScreen' component={MyLocationsScreen} options={{ 
                tabBarLabel: 'Locations',
                tabBarIcon: ({ color, size }) => <IonIcon name='location-outline' color={color} size={size}/>
            }}/>
            <Tabs.Screen name="MyProfileScreen" component={MyProfileScreen} options={{ 
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => <IonIcon name='person-circle-outline' color={color} size={size}/>
            }}/>
        </Tabs.Navigator>
    )
}

export default BottomTabs;