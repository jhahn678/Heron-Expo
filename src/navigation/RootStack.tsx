import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../store/auth/useAuth";
import { RootStackParams } from "../types/navigation";
import { NavigationContainer } from "@react-navigation/native";
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
import UserProfileScreen from "../screens/profile/UserProfileScreen/UserProfileScreen";
import SearchUsersScreen from "../screens/contacts/UserSearchScreen/UserSearchScreen";
import ViewCatchScreen from "../screens/catch/CatchScreen/ViewCatchScreen";
import ViewLocationScreen from "../screens/location/LocationScreen/ViewLocationScreen";
import { navigationRef } from "./navigationRef";
import MediaGridScreen from "../screens/media/MediaGridScreen";
import ReviewsScreen from "../screens/waterbody/ReviewsScreen";
import ViewImageScreen from "../screens/media/ViewImageScreen";
import CatchListScreen from "../screens/catch/CatchListScreen";
import LocationListScreen from "../screens/location/LocationListScreen";

const RootStack = (): JSX.Element => {
    
    const isUnauthenticated = useAuth(state => !state.isAuthenticated)
    const Stack = createNativeStackNavigator<RootStackParams>();

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                { isUnauthenticated &&
                    <Stack.Group screenOptions={{ headerBackTitle: 'Back'}}>
                        <Stack.Screen name="HomeAuthScreen" component={HomeAuthScreen}/>
                        <Stack.Screen name="LoginAuthScreen" component={LoginAuthScreen}
                            options={{ headerShown: true, headerTitle: 'Sign In'}}
                        />
                        <Stack.Screen name="RegisterAuthScreenOne" component={RegisterAuthScreenOne} 
                            options={{ headerShown: true, headerTitle: 'Step 1 of 3' }}
                        />
                        <Stack.Screen name="RegisterAuthScreenTwo" component={RegisterAuthScreenTwo}
                            options={{ headerShown: true, headerTitle: 'Step 2 of 3' }}
                        />
                        <Stack.Screen name="RegisterAuthScreenThree" component={RegisterAuthScreenThree}
                             options={{ headerShown: true, headerTitle: 'Step 3 of 3' }}
                        />
                    </Stack.Group>
                }
                <Stack.Screen name='MainTabs' component={MainTabs}/>
                <Stack.Screen name='NewCatchScreen' component={NewCatchScreen}/>
                <Stack.Screen name='NewLocationScreen' component={NewLocationScreen}/>
                <Stack.Screen name='CameraScreen' component={CameraScreen}/>
                <Stack.Screen name='ViewMapScreen' component={ViewMapScreen}/>
                <Stack.Screen name='SaveMapScreen' component={SaveMapScreen}/>
                <Stack.Screen name='UserProfileScreen' component={UserProfileScreen}/>
                <Stack.Screen name='UserSearchScreen' component={SearchUsersScreen}/>
                <Stack.Screen name='ViewCatchScreen' component={ViewCatchScreen}/>
                <Stack.Screen name='ViewLocationScreen' component={ViewLocationScreen}/>
                <Stack.Screen name='MediaGridScreen' component={MediaGridScreen}/>
                <Stack.Screen name='ReviewsScreen' component={ReviewsScreen}/>
                <Stack.Screen name='ViewImageScreen' component={ViewImageScreen}/>
                <Stack.Screen name='CatchListScreen' component={CatchListScreen}/>
                <Stack.Screen name='LocationListScreen' component={LocationListScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;