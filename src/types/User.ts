import { ICatch } from "./Catch"
import { ILocation } from "./Location"
import { IWaterbody } from "./Waterbody"

export interface IUser {
    id: number
    firstname: string
    lastname: string
    fullname: string | null
    username: string
    avatar: string | null
    bio: string | null
    location: string | null
    city: string | null
    state: string | null
    contacts: IUser[]
    total_contacts: number
    pending_contacts: IPendingContact[]
    locations: ILocation[]
    total_locations: number
    catches: ICatch[]
    total_catches: number
    saved_waterbodies: IWaterbody[]
    created_at: Date
    updated_at: Date
}

export interface IContact extends Pick<IUser, 'id' | 'fullname' | 'username' | 'avatar'>{}

export interface IPendingContact {
    user: IUser,
    status: 'TO' | 'FROM'
    sent_at: Date
}

export enum FollowType {
  Following,
  Followers
}

export interface SocialLoginRes {
    id: number,
    avatar: string, 
    username: string, 
    firstname: string,
    accessToken: string,
    refreshToken: string,
    account_created: boolean
}

export enum LinkedAccount {
    Apple = 'apple',
    Google = 'google',
    Facebook = 'facebook'
}