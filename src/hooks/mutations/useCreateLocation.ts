import { gql, useMutation } from '@apollo/client'
import { Point, Polygon } from 'geojson'
import { Privacy } from '../../types/Location'
import { IWaterbody } from '../../types/Waterbody'

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

export const useCreateLocation = () => useMutation<CreateLocationRes, CreateLocationVars>(CREATE_LOCATION)