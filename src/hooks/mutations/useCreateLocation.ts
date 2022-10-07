import { gql, InternalRefetchQueriesInclude, useMutation } from '@apollo/client'
import { Point, Polygon } from 'geojson'
import { LocationQuery, Privacy } from '../../types/Location'
import { IWaterbody } from '../../types/Waterbody'
import { getLocationsQueryName } from '../queries/useGetLocations'
import { GET_MY_PROFILE_TOTALS } from '../queries/useGetMyProfile'
import { GET_WATERBODY } from '../queries/useGetWaterbody'

export const CREATE_LOCATION = gql`
mutation Mutation($location: NewLocation!) {
  createLocation(location: $location) {
    id
    waterbody {
      id
    }
  }
}`

export interface CreateLocationVars {
    location: {
        title: string | undefined,
        privacy: Privacy | undefined,
        description: string | undefined,
        waterbody: number | undefined,
        point: Point | undefined,
        polygon: Polygon | undefined,
        hexcolor: string | undefined
        media?: {
          url: string
          key: string
      }[] | undefined
  }
}

export interface CreateLocationRes {
    createLocation: {
        id: number,
        waterbody: Pick<IWaterbody, 'id'>
    }
}

export const useCreateLocation = () => useMutation<CreateLocationRes, CreateLocationVars>(CREATE_LOCATION, {
    refetchQueries: ({ data }) => {
        let queries: InternalRefetchQueriesInclude = [
            { query: GET_MY_PROFILE_TOTALS },
            'MyLocations'
        ];
        if(data && data.createLocation.waterbody) queries.push(
            { query: GET_WATERBODY, variables: { id: data.createLocation.waterbody.id } },
            `${getLocationsQueryName(LocationQuery.Waterbody, data.createLocation.waterbody.id)}`
        )

        return queries;
    }
})