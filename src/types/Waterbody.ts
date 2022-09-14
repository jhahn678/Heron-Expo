import { GeometryCollection, MultiLineString, MultiPolygon } from "geojson"
import { AdminOneName } from "./AdminOne"
import { IMedia } from "./Media"


export type WaterbodyClassification = 
    'bay' | 'beach' | 'bayou' | 'creek' |  'harbor' | 
    'lagoon' | 'lake' | 'marsh' | 'oxbow' | 'pond' | 'reservoir' | 
    'river' | 'slough' | 'stream' | 'strait' | 'unknown'

export const waterbodyClassifications: WaterbodyClassification[] = [
    'bay', 'beach', 'bayou', 'creek', 'harbor', 'lagoon', 
    'lake', 'marsh', 'oxbow', 'pond', 'reservoir', 'river', 
    'slough', 'stream', 'strait', 'unknown'
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

export interface PopulatedWaterbody extends IWaterbody {
    geometries: GeometryCollection | MultiLineString | MultiPolygon,
}

export interface SearchWaterbody extends IWaterbody {
    distance?: number
    rank: number
}

export interface WaterbodyListItem extends Omit<SearchWaterbody, 'weight' | 'oid'>{
    media: Pick<IMedia, 'url'>[]
    total_catches: number
    total_locations: number
}

export interface NearbyWaterbody extends WaterbodyListItem {
    distance: number
}

export interface IWaterbodyReview {
    id: number
    waterbody: number
    user: number
    rating: number
    text: string
    created_at: Date
}



