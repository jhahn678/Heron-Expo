import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigationProp as NavProp, NavigatorScreenParams } from "@react-navigation/native"
import { MediaType } from "./Media"
import { CatchQuery } from "./Catch"
import { Coordinates, LocationQuery } from "./Location"
import { Coordinate } from "react-native-maps"


export type RootStackParams = {
    HomeAuthScreen: { showBack: boolean } | undefined,
    LoginAuthScreen: undefined,
    RegisterAuthScreenOne: undefined,
    RegisterAuthScreenTwo: undefined,
    RegisterAuthScreenThree: undefined,
    MainTabs: NavigatorScreenParams<BottomTabsParams>,
    NewCatchScreen: { waterbody: number } | undefined
    ViewCatchScreen: { id: number }
    NewLocationScreen: { waterbody: number } | undefined
    ViewLocationScreen: { id: number }
    UserProfileScreen: { id: number },
    UserSearchScreen: undefined
    ViewMapScreen: { 
        resource: MapResource
        id?: number
        coordinates?: Coordinates
        total?: number
    }
    SaveMapScreen: undefined
    CameraScreen: undefined
    MediaGridScreen: { waterbody: number, title: string | undefined, total?: number }
    ReviewsScreen: { waterbody: number, title: string | undefined, total?: number }
    /**  @URI will display only the image -- no details **/
    ViewImageScreen: { id?: number, type?: MediaType, uri?: string, title?: string | undefined }
    CatchListScreen: { type: CatchQuery, id?: number, title: string | undefined }
    LocationListScreen: { type: LocationQuery, id: number, title: string | undefined }
}

export enum MapResource {
    Waterbody = 'WATERBODY',
    WaterbodyLocations = 'WATERBODY_LOCATIONS',
    WaterbodyCatches = 'WATERBODY_CATCHES',
    UserCatches = 'USER_CATCHES',
    UserLocations = 'USER_LOCATIONS',
    Location = 'LOCATION',
    Catch = 'CATCH',
    CatchesNearby = 'CATCHES_NEARBY'
}

export type RootStackScreenProps<T extends keyof RootStackParams> = 
    NativeStackScreenProps<RootStackParams, T>

export type ExploreStackParams = {
    ExploreScreen: undefined,
    SearchBarScreen: undefined,
    SearchResultsScreen: { placeholder: string} | undefined,
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
    ExploreStack: NavigatorScreenParams<ExploreStackParams>,
    MyLocationsScreen: undefined,
    MyCatchesScreen: undefined,
    MyProfileScreen: undefined
}

export type BottomTabsScreenProps<T extends keyof BottomTabsParams> = 
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabsParams, T>,
        NativeStackScreenProps<RootStackParams>
    >
    
export type UseNavigateParams = NavProp<RootStackParams & BottomTabsParams & ExploreStackParams>

export type NavigationProp = NavProp<RootStackParams & BottomTabsParams & ExploreStackParams>
