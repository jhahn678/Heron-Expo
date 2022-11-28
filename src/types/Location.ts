import { Point, Polygon, LineString } from 'geojson'
import { IMedia, MediaInput } from './Media'

export interface ILocation {
    id: number,
    privacy: Privacy
    user: number,
    waterbody: number,
    title?: string,
    description?: string,
    geom: Point | Polygon | LineString
    created_at: Date
    hexcolor?: string
    nearest_place: string
    map_image?: IMedia | null
    total_favorites: number
    is_favorited: boolean
    is_saved: boolean
}

export interface NewLocation {
    privacy: Privacy
    waterbody: number
    coordinates: [number, number]
    title?: string
    description?: string
    media?: MediaInput[]
    hexcolor?: String
}

export enum Privacy {
    Friends = 'FRIENDS',
    Private = 'PRIVATE',
    Public = 'PUBLIC'
}

export enum LocationQuery {
  User = 'USER',
  UserSaved = 'USER_SAVED',
  Waterbody = 'WATERBODY'
}
  
export enum LocationSort {
  CreatedAtNewest = "CREATED_AT_NEWEST",
  CreatedAtOldest = "CREATED_AT_OLDEST",
  MostRecommended = "MOST_RECOMMENDED",
  Nearest = "NEAREST",
}

export type Coordinates = {
    latitude: number
    longitude: number
}
