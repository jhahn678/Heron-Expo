import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigationProp } from "@react-navigation/native"

export type RootStackParams = {
    HomeAuthScreen: undefined,
    LoginAuthScreen: undefined,
    RegisterAuthScreenOne: undefined,
    RegisterAuthScreenTwo: undefined,
    RegisterAuthScreenThree: undefined,
    MainTabs: undefined,
    NewCatchScreen: undefined
    NewLocationScreen: undefined
    CameraScreen: undefined
    ViewMapScreen: undefined
    SaveMapScreen: undefined
    UserProfileScreen: { id: number },
    UserSearchScreen: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParams> = 
    NativeStackScreenProps<RootStackParams, T>

export type ExploreStackParams = {
    ExploreScreen: undefined,
    SearchBarScreen: undefined,
    SearchResultsScreen: undefined,
    WaterbodyScreen: { id: number }
}

export type ExploreStackScreenProps<T extends keyof ExploreStackParams> = 
    CompositeScreenProps<
        NativeStackScreenProps<ExploreStackParams, T>,
        CompositeScreenProps<
            BottomTabScreenProps<BottomTabsParams>,
            NativeStackScreenProps<RootStackParams>   
        >
    >

export type BottomTabsParams = {
    ExploreStack: undefined,
    MyLocationsScreen: undefined,
    MyCatchesScreen: undefined,
    MyProfileScreen: undefined
}

export type BottomTabsScreenProps<T extends keyof BottomTabsParams> = 
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabsParams, T>,
        NativeStackScreenProps<RootStackParams>
    >
    
export type UseNavigateParams = NavigationProp<RootStackParams & BottomTabsParams & ExploreStackParams>

