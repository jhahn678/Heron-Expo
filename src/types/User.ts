import { ICatch } from "./Catch"
import { ILocation } from "./Location"
import { IWaterbody } from "./Waterbody"

export interface IUser {
    id: number
    firstname: string
    lastname: string
    fullname: string
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