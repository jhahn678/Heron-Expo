import { useQuery, gql } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { ILocation } from '../../types/Location'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

export const GET_MY_LOCATIONS = gql`
query Locations($date: DateRange, $waterbody: [Int!], $offset: Int, $limit: Int) {
  me {
    id
    locations(
        date: $date, 
        waterbody: $waterbody, 
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
        })[]
    }
}

interface Vars {
    date?: {
        min?: Date
        max?: Date
    },
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