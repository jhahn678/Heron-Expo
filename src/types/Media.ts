export interface MediaInput {
    url: string
    key: string
}

export interface IMedia {
    id: number,
    user: number,
    url: string,
    key: string,
    created_at: Date
}

export interface CatchMedia extends IMedia{
    catch: number
}

export interface LocationMedia extends IMedia {
    location: number
}

export interface WaterbodyMedia extends IMedia {
    waterbody: number
}

export interface UserAvatar extends IMedia{}

export enum MediaType {
    Catch = 'CATCH',
    Location = 'LOCATION',
    Waterbody = 'WATERBODY',
    MapCatch = 'MAP_CATCH',
    MapLocation = 'MAP_LOCATION'
  }