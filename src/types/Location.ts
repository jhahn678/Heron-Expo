import { Point, Polygon, LineString } from 'geojson'
import { MediaInput } from './Media'

export interface ILocation {
    id: number,
    user: number,
    waterbody: number,
    title: string,
    description: string,
    geom: Point | Polygon | LineString
    hexcolor: string
}

export interface NewLocation {
    title?: string
    description?: string
    waterbody: number
    media?: MediaInput[]
    coordinates: [number, number]
    hexcolor?: String
}

