import * as Linking from 'expo-linking';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../store/auth/useAuth";
import { RootStackParams } from "../types/navigation";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigationRef";
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
import MediaGridScreen from "../screens/media/MediaGridScreen";
import ReviewsScreen from "../screens/waterbody/ReviewsScreen";
import ViewImageScreen from "../screens/media/ViewImageScreen";
import CatchListScreen from "../screens/catch/CatchListScreen";
import LocationListScreen from "../screens/location/LocationListScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen/EditProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen/SettingsScreen";
import ContactsListScreen from "../screens/contacts/ContactsList/ContactsListScreen";
import EditCatchScreen from "../screens/catch/EditCatch/EditCatchScreen";
import EditLocationScreen from "../screens/location/EditLocation/EditLocationScreen";
import EditReviewScreen from "../screens/waterbody/EditReviewScreen/EditReviewScreen";
import UsernameAuthScreen from '../screens/auth/UsernameAuthScreen';
import PasswordScreen from '../screens/auth/PasswordScreen';
import ReportProblemScreen from '../screens/settings/ReportProblemScreen/ReportProblemScreen';


const RootStack = (): JSX.Element => {
    
    const isUnauthenticated = useAuth(state => !state.isAuthenticated)
    const Stack = createNativeStackNavigator<RootStackParams>();

    const prefix = Linking.createURL('/');

    const linkConfig: LinkingOptions<RootStackParams> = {
        prefixes: [prefix],
        config: {
            initialRouteName: 'MainTabs',
            screens: {
                UserProfileScreen: {
                    path: "profile/:id",
                    parse: { id: id => parseInt(id) } 
                },
                ViewCatchScreen: {
                    path: "catch/:id",
                    parse: { id: id => parseInt(id) } 
                },
                ViewLocationScreen: {
                    path: "location/:id",
                    parse: { id: id => parseInt(id) } 
                },
                MainTabs: {
                    screens: {
                        ExploreStack: {
                            screens: {
                                WaterbodyScreen: {
                                    path: "waterbody/:id",
                                    parse: { id: (id: string) => parseInt(id) }
                                },
                            }
                        }
                    }
                }
            }
        }
    }

    return (
        <NavigationContainer ref={navigationRef} linking={linkConfig}>
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
                        <Stack.Screen name='UsernameAuthScreen' component={UsernameAuthScreen} options={{ 
                            headerShown: true, headerBackVisible: false, headerTitle: 'Choose a username'
                        }}/>
                    </Stack.Group>
                }
                <Stack.Screen name='MainTabs' component={MainTabs}/>
                <Stack.Screen name='NewCatchScreen' component={NewCatchScreen}/>
                <Stack.Screen name='NewLocationScreen' component={NewLocationScreen}/>
                <Stack.Screen name='CameraScreen' component={CameraScreen}/>
                <Stack.Screen name='ViewMapScreen' component={ViewMapScreen}/>
                <Stack.Screen name='SaveMapScreen' component={SaveMapScreen}/>
                <Stack.Screen name='UserSearchScreen' component={SearchUsersScreen}/>
                <Stack.Group screenOptions={{ animation: 'slide_from_bottom', animationDuration: 200 }}>
                    <Stack.Screen name='UserProfileScreen' component={UserProfileScreen}
                        options={{ headerShown: true, headerTitle: 'Profile', headerBackTitleVisible: false }}
                    />
                    <Stack.Screen name='ViewCatchScreen' component={ViewCatchScreen}/>
                    <Stack.Screen name='ViewLocationScreen' component={ViewLocationScreen}/>
                </Stack.Group>
                <Stack.Screen name='MediaGridScreen' component={MediaGridScreen}/>
                <Stack.Screen name='ReviewsScreen' component={ReviewsScreen}/>
                <Stack.Screen name='ViewImageScreen' component={ViewImageScreen}/>
                <Stack.Screen name='CatchListScreen' component={CatchListScreen}/>
                <Stack.Screen name='LocationListScreen' component={LocationListScreen}/>
                <Stack.Screen name='EditProfileScreen' component={EditProfileScreen}/>
                <Stack.Screen name='SettingsScreen' component={SettingsScreen}/>
                <Stack.Screen name='ContactsListScreen' component={ContactsListScreen}/>
                <Stack.Screen name="EditCatchScreen" component={EditCatchScreen}/>
                <Stack.Screen name="EditLocationScreen" component={EditLocationScreen}/>
                <Stack.Screen name="EditReviewScreen" component={EditReviewScreen}/>
                <Stack.Group screenOptions={{ headerShown: true }}>
                    <Stack.Screen name='PasswordScreen' component={PasswordScreen} options={{ headerTitle: 'Sign In', headerBackTitleVisible: false }}/>
                    <Stack.Screen name='ReportProblemScreen' component={ReportProblemScreen} options={{ headerTitle: 'Report a Problem', headerBackTitleVisible: false }}/>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;