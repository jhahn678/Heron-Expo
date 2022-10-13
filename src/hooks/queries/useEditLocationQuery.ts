import { useQuery, gql } from '@apollo/client'
import { ILocation } from '../../types/Location'
import { IMedia } from '../../types/Media'
import { IWaterbody } from '../../types/Waterbody'

const EDIT_LOCATION_QUERY = gql`
query EditLocation($id: Int!) {
    location(id: $id) {
        id
        privacy
        title
        description
        waterbody {
            id
            name
            ccode
            country
            subregion
            admin_one
            admin_two
        }
        media {
            id
            url
        }
        map_image {
            id
            url
        }
        geom
    }
}
`

interface Res {
    location: Pick<
        ILocation, 
        | 'id'
        | 'privacy'
        | 'title'
        | "description"
        | "geom"
    > & {
        waterbody: Pick<
            IWaterbody, 
            | 'id' 
            | 'name'
            | 'ccode'
            | 'country'
            | 'subregion'
            | "admin_one"
            | "admin_two"
            >,
        media: Pick<IMedia, 'id' | 'url'>[],
        map_image: Pick<IMedia, 'id' | 'url'>
    }
}

interface Vars {
    id: number
}

export const useEditLocationQuery = (id: number) => useQuery<Res, Vars>(EDIT_LOCATION_QUERY, { 
    variables: { id },
    fetchPolicy: 'network-only'
})