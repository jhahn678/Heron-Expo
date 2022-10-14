import { Share, ShareAction, Platform } from "react-native";
import * as Linking from 'expo-linking'


export enum ShareType {
  Waterbody,
  Catch,
  Location,
  MyProfile,
  Profile
}

interface ShareContentArgs {
    id: number | null | undefined
    shareType: ShareType
}

export const useShareContent = () => {

    const shareContent = async ({ shareType, id }: ShareContentArgs): Promise<ShareAction | void> => {
        let message: string;
        let url: string;
        if (!id) return;
        switch(shareType){
            case ShareType.Waterbody:
                url = Linking.createURL(`/waterbody:${id}`)
                message = `Check this place to fish on the Heron App!`;
                break;
            case ShareType.Catch:
                url = Linking.createURL(`/catch:${id}`)
                message = `Check out this catch on the Heron App!`;
                break;
            case ShareType.Location:
                url = Linking.createURL(`/location:${id}`)
                message = `Check out this fishing spot on the Heron App!`;
                break;
            case ShareType.MyProfile:
                url = Linking.createURL(`/profile:${id}`)
                message = `Check out my profile on the Heron App!`;
                break;
            case ShareType.Profile:
                url = Linking.createURL(`/profile:${id}`)
                message = `Check out this profile on the Heron App!`;
                break;
            default:
                return;
        }
        try{
            if(Platform.OS === 'ios'){
                await Share.share({ message, url })
            }else{
                await Share.share({ message: message + ` ${url}`})
            }
        }catch(err){
            alert('Could not share content')
        }

    }

    return shareContent;
}