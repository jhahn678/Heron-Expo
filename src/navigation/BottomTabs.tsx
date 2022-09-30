import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreStack from "./ExploreStack";
import MyLocationsScreen from "../screens/location/MyLocationsScreen";
import { BottomTabsParams } from "../types/navigation";
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MyCatchesTabs from "./MyCatchesTabs";
import FishIcon from "../components/icons/FishIcon";
import MyProfileTabs from "./MyProfileTabs";
import { useAuth } from "../store/auth/useAuth";
import PromptAuthenticationScreen from "../screens/auth/PromptAuthenticationScreen";


const BottomTabs = (): JSX.Element => {

    const { isAuthenticated } = useAuth()

    const Tabs = createBottomTabNavigator<BottomTabsParams>();

    return(
        <Tabs.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
            <Tabs.Screen 
                name='ExploreStack' 
                component={ExploreStack} 
                options={{ 
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color, size }) => (
                        <MCIcon name='map-search-outline' color={color} size={size}/>
                )}}
                />
            <Tabs.Screen 
                name='MyCatchesScreen'
                component={isAuthenticated ? MyCatchesTabs : PromptAuthenticationScreen} 
                options={{ 
                    tabBarLabel: 'Catches',
                    tabBarIcon: ({ color, size }) => (
                        <FishIcon color={color} size={size}/>
                )}}
            />
            <Tabs.Screen 
                name='MyLocationsScreen' 
                component={isAuthenticated ? MyLocationsScreen : PromptAuthenticationScreen} 
                options={{ 
                    tabBarLabel: 'Locations',
                    tabBarIcon: ({ color, size }) => (
                        <IonIcon name='location-outline' color={color} size={size}/>
                )}}
            />
            <Tabs.Screen 
                name="MyProfileScreen" 
                component={isAuthenticated ? MyProfileTabs : PromptAuthenticationScreen} 
                options={{ 
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <IonIcon name='person-circle-outline' color={color} size={size}/>
                )}}
            />
        </Tabs.Navigator>
    )
}

export default BottomTabs;