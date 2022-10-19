import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import { CompositeScreenProps, NavigationProp as NavProp, NavigatorScreenParams } from "@react-navigation/native"
import { MediaType } from "./Media"
import { CatchQuery } from "./Catch"
import { LocationQuery } from "./Location"
import { FollowType } from "./User"
import { LatLng } from "react-native-maps"


export type RootStackParams = {
    HomeAuthScreen: { showBack: boolean } | undefined,
    LoginAuthScreen: undefined,
    RegisterAuthScreenOne: undefined,
    RegisterAuthScreenTwo: undefined,
    RegisterAuthScreenThree: undefined,
    UsernameAuthScreen: undefined,
    MainTabs: NavigatorScreenParams<BottomTabsParams>,
    NewCatchScreen: { waterbody: number } | undefined
    ViewCatchScreen: { id: number }
    NewLocationScreen: { waterbody: number } | undefined
    ViewLocationScreen: { id: number }
    UserProfileScreen: { id: number },
    EditProfileScreen: undefined
    UserSearchScreen: undefined
    ViewMapScreen: { resource: MapResource, id?: number, total?: number }
    SaveMapScreen: { saveType: SaveType, center?: LatLng }
    CameraScreen: undefined
    MediaGridScreen: { source: MediaSource, id: number, title: string | undefined, total?: number }
    ReviewsScreen: { type: ReviewQuery, id: number, title: string | undefined, total?: number }
    /**  @URI will display only the image -- no details **/
    ViewImageScreen: { id?: number, type?: MediaType, uri?: string, title?: string | undefined }
    CatchListScreen: { type: CatchQuery, id?: number, title: string | undefined, total?: number }
    LocationListScreen: { type: LocationQuery, id: number, title: string | undefined, total?: number }
    SettingsScreen: undefined
    ContactsListScreen: { id: number, type: FollowType }
    EditCatchScreen: { id: number }
    EditLocationScreen: { id: number }
    EditReviewScreen: { id: number }
    PasswordScreen: undefined
    ReportProblemScreen: undefined
}

export enum MapResource {
    Catch = 'CATCH',
    Location = 'LOCATION',
    Waterbody = 'WATERBODY',
    UserCatches = 'USER_CATCHES',
    UserLocations = 'USER_LOCATIONS',
    CatchesNearby = 'CATCHES_NEARBY',
    WaterbodyCatches = 'WATERBODY_CATCHES',
    WaterbodyLocations = 'WATERBODY_LOCATIONS',
    UserSavedLocations = 'USER_SAVED_LOCATIONS',
}

export enum MediaSource {
    User = 'USER',
    Waterbody = 'WATERBODY',
}

export enum ReviewQuery {
    User = 'USER',
    Waterbody = 'WATERBODY',
}

export enum SaveType {
    CatchAuto = 'CATCH_CURRENT_LOCATION',
    CatchManual = 'CATCH_MANUAL_LOCATION',
    LocationAuto = 'LOCATION_CURRENT_LOCATION',
    LocationManual = 'LOCATION_MANUAL_LOCATION',
    CatchAutoEdit = 'CATCH_EDIT_CURRENT_LOCATION',
    CatchManualEdit = 'CATCH_EDIT_MANUAL_LOCATION',
    LocationAutoEdit = 'LOCATION_EDIT_CURRENT_LOCATION',
    LocationManualEdit = 'LOCATION_EDIT_MANUAL_LOCATION',
}

export type RootStackScreenProps<T extends keyof RootStackParams> = 
    NativeStackScreenProps<RootStackParams, T>

export type ExploreStackParams = {
    ExploreScreen: undefined,
    SearchBarScreen: undefined,
    SearchResultsScreen: { title: string} | undefined,
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
    MyPlacesScreen: undefined,
    MyCatchesScreen: undefined,
    MyProfileScreen: undefined
}

export type BottomTabsScreenProps<T extends keyof BottomTabsParams> = 
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabsParams, T>,
        NativeStackScreenProps<RootStackParams>
    >

export type MyCatchesTabsParams = {
    MyCatchesList: undefined
    MyCatchesStatistics: undefined
}

export type MyCatchesTabsScreenProps<T extends keyof MyCatchesTabsParams> = 
    CompositeScreenProps<
        MaterialTopTabScreenProps<MyCatchesTabsParams, T>,
        BottomTabsScreenProps<'MyCatchesScreen'>
    >

export type MyPlacesTabsParams = {
    MyLocationsList: undefined
    MySavedLocations: undefined
    MySavedWaterbodies: undefined
}

export type MyPlacesTabsScreenProps<T extends keyof MyPlacesTabsParams> = 
    CompositeScreenProps<
        MaterialTopTabScreenProps<MyPlacesTabsParams, T>,
        BottomTabsScreenProps<'MyPlacesScreen'>
    >

export type MyProfileTabsParams = {
    ProfileTab: undefined
    FriendsTab: undefined
}

export type MyProfileTabsScreenProps<T extends keyof MyProfileTabsParams> = 
    CompositeScreenProps<
        MaterialTopTabScreenProps<MyProfileTabsParams, T>,
        BottomTabsScreenProps<'MyProfileScreen'>
    >


type CompositeNavProp = NavProp<
    RootStackParams & 
    BottomTabsParams & 
    ExploreStackParams & 
    MyProfileTabsParams & 
    MyCatchesTabsParams &
    MyPlacesTabsParams
>
    
export type UseNavigateParams = NavProp<CompositeNavProp>

export type NavigationProp = NavProp<CompositeNavProp>