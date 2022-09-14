import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigationProp as NavProp, NavigatorScreenParams } from "@react-navigation/native"
import { MediaType } from "./Media"
import { CatchQueryType } from "./Catch"


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
        waterbody?: number | number[], 
        catch?: number | number [], 
        location?: number | number[]
    }
    SaveMapScreen: undefined
    CameraScreen: undefined
    MediaGridScreen: { waterbody: number, title: string | undefined, total?: number }
    ReviewsScreen: { waterbody: number, title: string | undefined, total?: number }
    /**  @URI will display only the image -- no details **/
    ViewImageScreen: { id?: number, type?: MediaType, uri?: string, title?: string | undefined }
    CatchListScreen: { type: CatchQueryType, id?: number, coordinates?: Coordinates, title: string | undefined }
    LocationListScreen: { waterbody: number, title: string | undefined  }
}

type Coordinates = {
    latitude: number
    longitude: number
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

