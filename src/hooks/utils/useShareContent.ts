import { Share, ShareAction } from "react-native";

type ShareType = 'WATERBODY'| 'CATCH' | 'LOCATION'

type ShareTypeMessage = {
    [key in ShareType]: string;
};

const shareTypeMessage: ShareTypeMessage = {
    "WATERBODY": "Check this place to fish on the Heron App!",
    "CATCH": "Check out this catch on the Heron App!",
    "LOCATION": "Check out this fishing spot on the Heron App!"
}

interface ShareContentArgs {
    url: string, 
    shareType?: ShareType
}

export const useShareContent = () => {

    const shareContent = async ({ 
        url , shareType
    }: ShareContentArgs): Promise<ShareAction | void> => {

        let message = 'Download the Heron App and check this out!' + ` ${url}`
        if(shareType) message = shareTypeMessage[shareType] + ` ${url}`
        try{
            const res = await Share.share({ message })
            return res;
        }catch(err){
            alert('Could not share content')
        }

    }

    return shareContent;
}