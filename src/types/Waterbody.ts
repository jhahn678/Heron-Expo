import { GeometryCollection, MultiLineString, MultiPolygon } from "geojson"
import { AdminOneName } from "./AdminOne"


export type WaterbodyClassification = 
    'bay' | 'beach' | 'bayou' | 'bend' | 'channel' | 
    'creek' | 'dock' | 'harbor' | 'lagoon' | 'lake' | 
    'marsh' | 'oxbow' | 'pond' | 'reservoir' | 'river' | 
    'slough' | 'stream' | 'strait' | 'unknown'

export const waterbodyClassifications: WaterbodyClassification[] = [
    'bay', 'beach', 'bayou', 'bend', 'channel', 'creek',
    'dock', 'harbor', 'lagoon', 'lake', 'marsh', 'oxbow',
    'pond', 'reservoir', 'river', 'slough', 'stream', 
    'strait', 'unknown'
]

export interface IWaterbody {
    id: number,
    name: string
    classification: WaterbodyClassification
    country: string
    ccode: string
    subregion: string | null
    admin_one: AdminOneName[]
    admin_two: string[]
    weight?: number
    oid?: string
}


export interface AutocompleteWaterbody extends IWaterbody{
    rank: number
    type: 'WATERBODY'
}

export interface SearchWaterbody extends IWaterbody {
    distance?: number
    rank: number
}


export interface PopulatedWaterbody extends IWaterbody {
    geometries: GeometryCollection | MultiLineString | MultiPolygon,
}