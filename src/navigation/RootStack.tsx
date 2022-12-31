import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../store/auth/useAuth";
import { RootStackParams } from "../types/navigation";
import { NavigationContainer } from "@react-navigation/native";
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
import ReportProblemScreen from '../screens/settings/ReportProblemScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import { useDeepLink } from '../hooks/utils/useDeepLink';
import DeactivateAccountScreen from '../screens/settings/DeactivateAccountScreen';
import ChangeEmailScreen from '../screens/settings/ChangeEmailScreen';
import ChangePasswordScreen from '../screens/settings/ChangePasswordScreen';
import SavePasswordScreen from '../screens/auth/SavePasswordScreen';
import UserDetailsAuthScreen from "../screens/auth/UserDetailsAuthScreen";


const RootStack = (): JSX.Element => {
    
    const linkConfig = useDeepLink()
    const Stack = createNativeStackNavigator<RootStackParams>();
    const unauthenticated = useAuth(state => !state.isAuthenticated)

    return (
        <NavigationContainer ref={navigationRef} linking={linkConfig}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                { unauthenticated &&
                    <Stack.Group screenOptions={{ headerBackTitle: 'Back'}}>
                        <Stack.Screen name="HomeAuthScreen" component={HomeAuthScreen}/>
                        <Stack.Screen name="LoginAuthScreen" component={LoginAuthScreen}
                            options={{ headerShown: true, headerTitle: 'Sign In'}}/>
                        <Stack.Screen name="RegisterAuthScreenOne" component={RegisterAuthScreenOne} 
                            options={{ headerShown: true, headerTitle: 'Enter your name' }}/>
                        <Stack.Screen name="RegisterAuthScreenTwo" component={RegisterAuthScreenTwo}
                            options={{ headerShown: true, headerTitle: 'Create your account' }}/>
                        <Stack.Screen name="RegisterAuthScreenThree" component={RegisterAuthScreenThree}
                            options={{ headerShown: true, headerTitle: 'Complete your profile' }}/>
                        <Stack.Screen name='UsernameAuthScreen' component={UsernameAuthScreen} 
                            options={{ headerShown: true, headerBackVisible: false, headerTitle: 'Choose a username' }}/>
                        <Stack.Screen name='UserDetailsAuthScreen' component={UserDetailsAuthScreen} 
                            options={{ headerShown: true, headerBackVisible: false, headerTitle: 'Complete your profile' }}/>
                        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} 
                            options={{ headerShown: true, headerBackVisible: true, headerTitle: 'Forgot Password' }}/>
                        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} 
                            options={{ headerShown: true, headerBackVisible: true, headerTitle: 'Reset Password' }}/>
                    </Stack.Group>
                }
                <Stack.Screen name='MainTabs' component={MainTabs}/>
                <Stack.Screen name='NewCatchScreen' component={NewCatchScreen}/>
                <Stack.Screen name='NewLocationScreen' component={NewLocationScreen}/>
                <Stack.Screen name='CameraScreen' component={CameraScreen}/>
                <Stack.Screen name='ViewMapScreen' component={ViewMapScreen}/>
                <Stack.Screen name='SaveMapScreen' component={SaveMapScreen}/>
                <Stack.Screen name='UserSearchScreen' component={SearchUsersScreen}/>
                <Stack.Screen name='MediaGridScreen' component={MediaGridScreen}/>
                <Stack.Screen name='ReviewsScreen' component={ReviewsScreen}/>
                <Stack.Screen name='ViewImageScreen' component={ViewImageScreen}/>
                <Stack.Screen name='CatchListScreen' component={CatchListScreen}/>
                <Stack.Screen name='LocationListScreen' component={LocationListScreen}/>
                <Stack.Screen name='SettingsScreen' component={SettingsScreen}/>
                <Stack.Screen name='ContactsListScreen' component={ContactsListScreen}/>
                <Stack.Screen name="EditCatchScreen" component={EditCatchScreen}/>
                <Stack.Screen name="EditLocationScreen" component={EditLocationScreen}/>
                <Stack.Screen name="EditReviewScreen" component={EditReviewScreen}/>
                <Stack.Group screenOptions={{ animation: 'slide_from_bottom', animationDuration: 200 }}>
                    <Stack.Screen name='UserProfileScreen' component={UserProfileScreen}/>
                    <Stack.Screen name='ViewCatchScreen' component={ViewCatchScreen}/>
                    <Stack.Screen name='ViewLocationScreen' component={ViewLocationScreen}/>
                </Stack.Group>
                <Stack.Group screenOptions={{ headerShown: true, headerBackTitleVisible: false }}>
                    <Stack.Screen name='SavePasswordScreen' component={SavePasswordScreen} 
                        options={{ headerTitle: 'Create Password' }}/>
                    <Stack.Screen name='ReportProblemScreen' component={ReportProblemScreen} 
                        options={{ headerTitle: 'Report a Problem' }}/>
                    <Stack.Screen name="DeactivateAccountScreen" component={DeactivateAccountScreen}
                        options={{ headerTitle: 'Deactivate Account' }}/>
                    <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} 
                        options={{ headerTitle: 'Change Password' }}/>
                    <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen}
                        options={{ headerTitle: "Account Email" }}/>
                    <Stack.Screen name='EditProfileScreen' component={EditProfileScreen}
                        options={{ headerTitle: 'Edit Profile' }}/>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;