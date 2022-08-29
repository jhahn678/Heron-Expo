import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"

export type AppStackParams = {
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
}

export type AppStackScreenProps<T extends keyof AppStackParams> = 
    NativeStackScreenProps<AppStackParams, T>

export type ExploreStackParams = {
    ExploreScreen: undefined,
    SearchBarScreen: undefined,
    SearchResultsScreen: undefined
}

export type ExploreStackScreenProps<T extends keyof ExploreStackParams> = 
    CompositeScreenProps<
        NativeStackScreenProps<ExploreStackParams, T>,
        CompositeScreenProps<
            BottomTabScreenProps<MainTabsParams>,
            NativeStackScreenProps<AppStackParams>   
        >
    >

export type MainTabsParams = {
    ExploreStack: undefined,
    MyLocationsScreen: undefined,
    MyCatchesScreen: undefined,
    MyProfileScreen: undefined
}

export type MainTabsScreenProps<T extends keyof MainTabsParams> = 
    CompositeScreenProps<
        BottomTabScreenProps<MainTabsParams, T>,
        NativeStackScreenProps<AppStackParams>
    >
    

