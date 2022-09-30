import { Point, Polygon, LineString } from 'geojson'
import { MediaInput } from './Media'

export interface ILocation {
    id: number,
    privacy: Privacy
    user: number,
    waterbody: number,
    title: string,
    description: string,
    geom: Point | Polygon | LineString
    created_at: Date
    hexcolor: string
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
    Friends = 'friends',
    Private = 'private',
    Public = 'public'
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
