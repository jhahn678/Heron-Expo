import { LinkingOptions } from "@react-navigation/native"
import { RootStackParams } from "../../types/navigation"
import * as Linking from 'expo-linking'

export const useDeepLink = (): LinkingOptions<RootStackParams> => ({
    prefixes: [
        Linking.createURL('/'), 
        "https://heron-mobile.com"
    ],
    config: {
        initialRouteName: 'MainTabs',
        screens: {
            RegisterAuthScreenOne: {
                path: "auth/register",
            },
            LoginAuthScreen: {
                path: "auth/login"
            },
            ResetPasswordScreen: {
                path: "auth/reset-password/:token"
            },
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
})