import { Privacy } from "../../types/Location";

export const privacyToLabel = (privacy: Privacy | undefined | null): string => {
    switch(privacy){
        case Privacy.Public:
            return 'Public';
        case Privacy.Friends:
            return 'Friends-Only';
        case Privacy.Private:
            return 'Private';
        default:
            return 'Public';
    }
}