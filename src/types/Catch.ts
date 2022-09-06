import { IUser } from "./User";
import { Point } from 'geojson'
import { CatchMedia, IMedia } from "./Media";

export interface ICatch {
    id: number
    user: IUser
    description?: string
    geom?: Point
    length?: number
    length_unit?: 'CM' | 'IN'
    media?: CatchMedia[]
    rig?: string
    species?: string
    title?: string
    waterbody?: number
    weight?: number
    weight_unit?: 'G' | 'OZ' | 'LB' | 'KG'
    created_at: Date
    updated_at?: Date;
}

export interface GetWaterbodyCatch extends Pick<
    ICatch, 'id' | 'species' | 'created_at'
>{
    user: Pick<IUser, 'fullname' | 'id' | 'avatar'>
    media: Pick<IMedia, 'url'>[]
}