import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./BottomTabs";
import CameraScreen from "../screens/camera/CameraScreen";
import NewCatchScreen from "../screens/catch/NewCatch/NewCatchScreen";
import NewLocationScreen from "../screens/location/NewLocation/NewLocationScreen";
import ViewMapScreen from "../screens/map/ViewMapScreen/ViewMapScreen";
import SaveMapScreen from "../screens/map/SaveMapScreen/SaveMapScreen";
import HomeAuthScreen from "../screens/auth/HomeAuthScreen";
import LoginAuthScreen from "../screens/auth/LoginAuthScreen";
import RegisterAuthScreenOne from "../screens/auth/RegisterAuthScreenOne";
import RegisterAuthScreenTwo from "../screens/auth/RegisterAuthScreenTwo";
import RegisterAuthScreenThree from "../screens/auth/RegisterAuthScreenThree";
import { useAuth } from "../store/auth/useAuth";
import { RootStackParams } from "./types";

const RootStack = (): JSX.Element => {
    
    const isUnauthenticated = useAuth(state => !state.isAuthenticated)
    const Stack = createNativeStackNavigator<RootStackParams>();

    return (
        <Stack.Navigator>
            { isUnauthenticated &&
                <Stack.Group>
                    <Stack.Screen name="HomeAuthScreen" component={HomeAuthScreen}/>
                    <Stack.Screen name="LoginAuthScreen" component={LoginAuthScreen}/>
                    <Stack.Screen name="RegisterAuthScreenOne" component={RegisterAuthScreenOne}/>
                    <Stack.Screen name="RegisterAuthScreenTwo" component={RegisterAuthScreenTwo}/>
                    <Stack.Screen name="RegisterAuthScreenThree" component={RegisterAuthScreenThree}/>
                </Stack.Group>
            }
            <Stack.Screen name='MainTabs' component={MainTabs}/>
            <Stack.Screen name='NewCatchScreen' component={NewCatchScreen}/>
            <Stack.Screen name='NewLocationScreen' component={NewLocationScreen}/>
            <Stack.Screen name='CameraScreen' component={CameraScreen}/>
            <Stack.Screen name='ViewMapScreen' component={ViewMapScreen}/>
            <Stack.Screen name='SaveMapScreen' component={SaveMapScreen}/>
        </Stack.Navigator>
    );
}

export default RootStack;