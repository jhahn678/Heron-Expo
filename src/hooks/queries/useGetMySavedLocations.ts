import { useQuery, gql } from '@apollo/client'
import { ILocation } from '../../types/Location'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

export const GET_MY_SAVED_LOCATIONS = gql`
query SavedLocations($offset: Int) {
  me {
    id
    saved_locations(offset: $offset) {
      id
      privacy
      title
      description
      user {
        id
        fullname
        avatar
      }
      waterbody {
        id
        name
      }
      nearest_place
      media {
        id
        url
      }
      map_image {
        id
        url
      }
      geom
      hexcolor
      created_at
      total_favorites
      is_saved
      is_favorited
    }
  }
}
`

export interface GetMySavedLocations {
    me: {
        id: number
        saved_locations: (Omit<ILocation, 'user' | 'waterbody'> & {
            user: Pick<IUser, 'id' | 'fullname' | 'avatar'>
            waterbody: Pick<IWaterbody, 'id' | 'name'>
            media: Pick<IMedia, 'id' | 'url'>[]
            map_image: Pick<IMedia, "url" | "id">
            total_favorites: number
            is_favorited: boolean
            is_saved: boolean
        })[]
    }
}

interface Vars {
    offset?: number
    limit?: number
}

export const useGetMySavedLocations = () => useQuery<GetMySavedLocations, Vars>(GET_MY_SAVED_LOCATIONS)