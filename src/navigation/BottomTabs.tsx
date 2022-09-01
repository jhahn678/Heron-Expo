import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreStack from "./ExploreStack";
import MyCatchesScreen from "../screens/catch/MyCatchesScreen";
import MyLocationsScreen from "../screens/location/MyLocationsScreen";
import MyProfileScreen from '../screens/profile/MyProfileScreen'
import { BottomTabsParams } from "../types/navigation";
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FAIcon from 'react-native-vector-icons/FontAwesome5'


const BottomTabs = (): JSX.Element => {

    const Tabs = createBottomTabNavigator<BottomTabsParams>();

    return(
        <Tabs.Navigator screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='ExploreStack' component={ExploreStack} options={{ 
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color, size }) => <MCIcon name='map-search-outline' color={color} size={size}/>
            }}/>
            <Tabs.Screen name='MyCatchesScreen' component={MyCatchesScreen} options={{ 
                tabBarLabel: 'Catches',
                tabBarIcon: ({ color, size }) => <MCIcon name='fish' color={color} size={size}/>
            }}/>
            <Tabs.Screen name='MyLocationsScreen' component={MyLocationsScreen} options={{ 
                tabBarLabel: 'Locations',
                tabBarIcon: ({ color, size }) => <IonIcon name='location' color={color} size={size}/>
            }}/>
            <Tabs.Screen name="MyProfileScreen" component={MyProfileScreen} options={{ 
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => <FAIcon name='user-circle' color={color} size={size}/>
            }}/>
        </Tabs.Navigator>
    )
}

export default BottomTabs;