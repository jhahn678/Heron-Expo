import { Point } from 'geojson'
import { AdminOneName } from './AdminOne'


export interface IGeoplace {
    id: number
    oid: string
    name: string
    fclass: string
    fcode: string
    country: string
    ccode: string
    admin_one: AdminOneName | null
    admin_two: string | null
    weight: number
    geom: Point
}


export interface AutocompleteGeoplace extends IGeoplace {
    type: 'GEOPLACE'
    rank: number
}