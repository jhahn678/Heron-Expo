import { useQuery, gql } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { ILocation, Privacy } from '../../types/Location'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

export const GET_MY_LOCATIONS = gql`
query MyLocations($date: DateRange, $privacy: [Privacy!] ,$waterbody: [Int!], $offset: Int, $limit: Int) {
  me {
    id
    locations(
        date: $date, 
        waterbody: $waterbody, 
        privacy: $privacy,
        offset: $offset, 
        limit: $limit
    ) {
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
      is_favorited
      is_saved
    }
  }
}
`

export interface GetMyLocationsRes {
    me: {
        id: number,
        locations: (Omit<ILocation, 'user' | 'waterbody'> & {
            user: Pick<IUser, 'id' | 'fullname' | 'avatar'>,
            waterbody: Pick<IWaterbody, 'id' | 'name'>,
            media: Pick<IMedia, 'id' | 'url'>[]
            map_image: Pick<IMedia, "url" | "id">
        })[]
    }
}

interface Vars {
    date?: {
        min?: Date
        max?: Date
    },
    privacy?: Privacy[]
    waterbody?: number[]
    offset?: number
    limit?: number
}

interface Args {
    minDate?: Date | undefined
    maxDate?: Date | undefined
    waterbody?: number[] | undefined
    offset?: number | undefined
    limit?: number | undefined
}

export const useGetMyLocations = ({ minDate, maxDate, ...vars}: Args) => {
    const Unauthenticated = useAuth(store => !store.isAuthenticated)
    return useQuery<GetMyLocationsRes, Vars>(GET_MY_LOCATIONS, {
        skip: Unauthenticated,
        variables: {
            ...vars,
            date: {
                min: minDate,
                max: maxDate
            }
        }
    })
}