import { gql, useLazyQuery } from '@apollo/client'

const GET_SPECIES = gql`
    query Waterbody($id: Int!) {
        waterbody(id: $id) {
            id
            name
            all_species {
                species
                count
            }
        }
    }
`

export interface GetWaterbodySpeciesRes {
    waterbody: {
        id: number,
        name: string
        all_species: { 
            species: string
            count: number
        }[]
    }
}

interface Vars {
    id: number
}

export const useLazyGetWaterbodySpecies = () => {
    return useLazyQuery<GetWaterbodySpeciesRes, Vars>(GET_SPECIES) 
}