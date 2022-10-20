import { gql, InternalRefetchQueriesInclude, useMutation } from '@apollo/client'
import { Point } from 'geojson'
import { useAuth } from '../../store/auth/useAuth'
import { CatchQuery } from '../../types/Catch'
import { makeFragmentId } from '../../utils/makeFragmentId'
import { getCatchesQueryName } from '../queries/useGetCatches'
import { GET_MY_CATCH_STATISTICS } from '../queries/useGetUserCatchStatistics'
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
      point?: Point | undefined
      title?: string | undefined
      description?: string | undefined
      species?: string | undefined
      weight?: number | undefined
      length?: number | undefined
      rig?: string | undefined
      created_at?: Date | undefined
      map_image?: {
        url: string
        key: string
      } | undefined,
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
  const auth = useAuth(store => store.id)
  return useMutation<NewCatchRes, NewCatchArgs>(CREATE_CATCH, {
    refetchQueries: ({ data }) => {
      const refetch: InternalRefetchQueriesInclude = [ 'MyCatches', { query: GET_MY_CATCH_STATISTICS }]
      if(data?.createCatch.waterbody) refetch.push(
        { query: GET_WATERBODY, variables: { id: data?.createCatch.waterbody.id } },
        `${getCatchesQueryName(CatchQuery.Waterbody, data?.createCatch.waterbody.id)}`
      )
      return refetch;
    },
    update: (cache) => {
      cache.updateFragment({
        id: `User:${auth}`,
        fragment: gql`
          fragment User${makeFragmentId()} on User{
            total_catches
          }
        `
      }, data => ({
          ...data,
          total_catches: data ? data.total_catches + 1 : 1
      }))
    }
  })
}