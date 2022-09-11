import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigationProp } from "@react-navigation/native"
import { MediaType } from "./Media"

export type RootStackParams = {
    HomeAuthScreen: { showBack: boolean } | undefined,
    LoginAuthScreen: undefined,
    RegisterAuthScreenOne: undefined,
    RegisterAuthScreenTwo: undefined,
    RegisterAuthScreenThree: undefined,
    MainTabs: undefined,
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

