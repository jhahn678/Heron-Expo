import { gql, useLazyQuery, useQuery } from '@apollo/client'

const GET_USER_MEDIA = gql`
query User($id: Int!, $limit: Int, $offset: Int) {
    user(id: $id) {
        id
        media(limit: $limit, offset: $offset) {
            id
            url
        }
    }
}
`

interface Vars {
    id: number
    offset?: number
    limit?: number
    skip?: boolean
}

export interface GetUserMediaRes {
    user: {
        id: number
        media: {
            id: number
            url: string
        }[]
    }
}

export const useGetUserMedia = ({ id, offset=0, limit=24, skip=false }: Vars) => {
    return useQuery<GetUserMediaRes, Vars>(GET_USER_MEDIA, { variables: { id, offset, limit }, skip })
}

export const useLazyGetUserMedia = (variables: Vars) => useLazyQuery<GetUserMediaRes, Vars>(GET_USER_MEDIA, { variables })