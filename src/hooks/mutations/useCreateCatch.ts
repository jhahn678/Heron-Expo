import { gql, useMutation } from '@apollo/client'
import { CatchQuery, CatchSort, ICatch } from '../../types/Catch'
import { getCatchesQueryName, GET_CATCHES } from '../queries/useGetCatches'
import { GET_MY_PROFILE_TOTALS } from '../queries/useGetMyProfile'
import { GET_WATERBODY } from '../queries/useGetWaterbody'

const CREATE_CATCH = gql`
mutation Mutation($newCatch: NewCatch!) {
  createCatch(newCatch: $newCatch) {
    id
    waterbody {
      id
    }
  }
}`

export interface NewCatchArgs {
    newCatch: {
      waterbody?: number | undefined
      coordinates?: [number, number] | undefined
      title?: string | undefined
      description?: string | undefined
      species?: string | undefined
      weight?: number | undefined
      length?: number | undefined
      rig?: string | undefined
      media?: {
          url: string
          key: string
      }[] | undefined
    }
}

export interface NewCatchRes {
  createCatch: {
    id: number,
    waterbody: {
      id: number
    }
  }
}

export const useCreateCatch = () => {
    return useMutation<NewCatchRes, NewCatchArgs>(CREATE_CATCH, {
        refetchQueries: ({ data }) => [
          { query: GET_WATERBODY, variables: { id: data?.createCatch.waterbody.id } },
          { query: GET_MY_PROFILE_TOTALS },
          `${getCatchesQueryName(CatchQuery.Waterbody, data?.createCatch.waterbody.id)}`
        ]
    })
}