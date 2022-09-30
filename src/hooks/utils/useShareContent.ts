import { Share, ShareAction } from "react-native";


export enum ShareType {
  Waterbody,
  Catch,
  Location,
  MyProfile,
  Profile
}

interface ShareContentArgs {
    url: string, 
    shareType?: ShareType
}

export const useShareContent = () => {

    const shareContent = async ({ 
        url , shareType
    }: ShareContentArgs): Promise<ShareAction | void> => {

        let message: string;
        switch(shareType){
            case ShareType.Waterbody:
                message = `Check this place to fish on the Heron App! ${url}`;
            case ShareType.Catch:
                message = `Check out this catch on the Heron App! ${url}`;
            case ShareType.Location:
                message = `Check out this fishing spot on the Heron App! ${url}`;
            case ShareType.MyProfile:
                message = `Check out my profile on the Heron App! ${url}`;
            case ShareType.Profile:
                message = `Check out this profile on the Heron App! ${url}`;
            default:
                message = `Download the Heron App and check this out! ${url}`;
        }
        try{
            const res = await Share.share({ message })
            return res;
        }catch(err){
            alert('Could not share content')
        }

    }

    return shareContent;
}