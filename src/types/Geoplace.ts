import { Point } from 'geojson'
export interface IGeoplace {
    id: number
    oid: string
    name: string
    fclass: string
    fcode: string
    country: string
    ccode: string
    admin_one: string
    admin_two: string | null
    weight: number
    geom: Point
}

export interface AutocompleteGeoplace extends IGeoplace {
    type: 'GEOPLACE'
    rank: number
}

export enum Fclass {
    /** Places, cities, villages, etc. */
    P = 'P',
    /** Land, parks, areas, etc. */
    L = 'L',
    /** Administrative, country, state, county, etc. */
    A = 'A'
}