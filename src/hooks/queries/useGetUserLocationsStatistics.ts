import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { IWaterbody } from '../../types/Waterbody'

const GET_USER_LOCATION_STATISTICS = gql`
query User($id: Int) {
  user(id: $id) {
    id
    location_statistics {
      total_locations
      waterbody_counts {
        waterbody {
          id
          name
        }
        count
      }
    }
  }
}
`

export interface GetUserLocationStatistics {
    user: {
        id: number,
        location_statistics: {
            total_locations: number
            waterbody_counts: {
                waterbody: Pick<IWaterbody, 'id' | 'name'>
                count: number
            }[]
        }
    }
}

interface Vars {
    id: number
}

interface Args {
    id: number,
    skip?: boolean
}

export const useGetUserLocationStatistics = ({ id, skip=false }:Args) => {
    return useQuery<GetUserLocationStatistics, Vars>(GET_USER_LOCATION_STATISTICS, { 
        variables: { id },
        skip: Boolean(skip)
    })
}

export const GET_MY_LOCATION_STATISTICS = gql`
query Me {
  me {
    id
    location_statistics {
      total_locations
      waterbody_counts {
        waterbody {
          id
          name
        }
        count
      }
    }
  }
}
`

export interface GetMyLocationStatistics {
    me: {
        id: number,
        location_statistics: {
            total_locations: number
            waterbody_counts: {
                waterbody: Pick<IWaterbody, 'id' | 'name'>
                count: number
            }[]
        }
    }
}

export const useGetMyLocationStatistics = () => {
    const skip = useAuth(store => !store.isAuthenticated)
    return useQuery<GetMyLocationStatistics>(GET_MY_LOCATION_STATISTICS, { skip })
}