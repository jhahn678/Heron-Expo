import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreStack from "./ExploreStack";
import MyCatchesScreen from "../screens/catch/MyCatchesScreen";
import MyLocationsScreen from "../screens/location/MyLocationsScreen";
import MyProfileScreen from '../screens/profile/MyProfileScreen'
import { BottomTabsParams } from "./types";


const BottomTabs = (): JSX.Element => {

    const Tabs = createBottomTabNavigator<BottomTabsParams>();

    return(
        <Tabs.Navigator>
            <Tabs.Screen name='ExploreStack' component={ExploreStack}/>
            <Tabs.Screen name='MyCatchesScreen' component={MyCatchesScreen}/>
            <Tabs.Screen name='MyLocationsScreen' component={MyLocationsScreen}/>
            <Tabs.Screen name="MyProfileScreen" component={MyProfileScreen}/>
        </Tabs.Navigator>
    )
}

export default BottomTabs;