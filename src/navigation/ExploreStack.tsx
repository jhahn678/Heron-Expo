import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../screens/explore/ExploreScreen/ExploreScreen";
import SearchBarScreen from "../screens/explore/SearchBarScreen/SearchBarScreen";
import SearchResultsScreen from "../screens/explore/SearchResultsScreen/SearchResultsScreen";
import { ExploreStackParams } from "../types/navigation";
import { useCurrentLocation } from "../hooks/utils/useCurrentLocation";
import WaterbodyScreen from "../screens/waterbody/WaterbodyScreen";
import { useLocationStore } from "../store/location/useLocationStore";

const ExploreStack = () => {

    const { getCurrentLocation } = useCurrentLocation()
    const hasCoordinates = useLocationStore(store => store.hasCoordinates)

    useEffect(() => {
        if(!hasCoordinates) getCurrentLocation()
    },[hasCoordinates])

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
