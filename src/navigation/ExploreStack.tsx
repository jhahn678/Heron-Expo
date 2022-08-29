import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../screens/explore/ExploreScreen/ExploreScreen";
import SearchBarScreen from "../screens/explore/SearchBarScreen/SearchBarScreen";
import SearchResultsScreen from "../screens/explore/SearchResultsScreen/SearchResultsScreen";
import { ExploreStackParams } from "./types";

const ExploreStack = () => {

    const Stack = createNativeStackNavigator<ExploreStackParams>();

    return (
        <Stack.Navigator>
            <Stack.Screen name='ExploreScreen' component={ExploreScreen}/>
            <Stack.Screen name='SearchBarScreen' component={SearchBarScreen}/>
            <Stack.Screen name='SearchResultsScreen' component={SearchResultsScreen}/>
        </Stack.Navigator>
    )   
}

export default ExploreStack
