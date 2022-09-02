import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../screens/explore/ExploreScreen/ExploreScreen";
import SearchBarScreen from "../screens/explore/SearchBarScreen/SearchBarScreen";
import SearchResultsScreen from "../screens/explore/SearchResultsScreen/SearchResultsScreen";
import { ExploreStackParams } from "../types/navigation";
import { useCurrentLocation } from "../hooks/utils/useCurrentLocation";
import { useEffect } from "react";
import { useLocationStore } from "../store/location/useLocationStore";
import WaterbodyScreen from "../screens/waterbody/WaterbodyScreen";

const ExploreStack = () => {

    const { getCurrentLocation } = useCurrentLocation()
    const { hasCoordinates } = useLocationStore()

    useEffect(() => {
        if(!hasCoordinates) getCurrentLocation()
    },[])

    const Stack = createNativeStackNavigator<ExploreStackParams>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='ExploreScreen' component={ExploreScreen}/>
            <Stack.Screen name='SearchBarScreen' component={SearchBarScreen}/>
            <Stack.Screen name='SearchResultsScreen' component={SearchResultsScreen}/>
            <Stack.Screen name='WaterbodyScreen' component={WaterbodyScreen}/>
        </Stack.Navigator>
    )   
}

export default ExploreStack
