import { Privacy } from "../../types/Location";

export const privacyToIcon = (privacy: Privacy) => {
    switch(privacy){
        case Privacy.Friends:
            return 'user-friends';
        case Privacy.Private:
            return 'user-shield';
        case Privacy.Public:
            return 'globe';
        default:
            return 'globe'
    }
}