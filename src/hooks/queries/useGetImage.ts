import { gql, useQuery } from '@apollo/client'
import { MediaType } from '../../types/Media'
import { IUser } from '../../types/User'

const GET_IMAGE = gql`
    query Media($id: Int!, $type: MediaType!) {
        media(id: $id, type: $type) {
            ... on CatchMedia {
                id
                user {
                    id
                    fullname
                    avatar
                }
                url
                created_at
            }
            ... on WaterbodyMedia {
                id
                user {
                    id
                    fullname
                    avatar
                }
                url
                created_at
            }
            ... on LocationMedia {
                id
                user {
                    id
                    fullname
                    avatar
                }
                url
                created_at
            }
            ... on AnyMedia {
                id
                user {
                    id
                    fullname
                    avatar
                }
                url
                created_at
            }
        }
    }
`

interface Args {
    id: number | undefined
    type: MediaType | undefined
}

interface Vars {
    /** undefined will trigger skip */
    id: number | undefined
    /** undefined will trigger skip */
    type: MediaType | undefined
}

export interface GetImage {
    media: {
        id: number
        url: string
        created_at: Date
        user: Pick<IUser, 'id' | 'fullname' | 'avatar'>
    }
}

export const useGetImageQuery = (args: Args) => useQuery<GetImage, Vars>(GET_IMAGE, { 
    variables: { id: args.id, type: args.type },
    skip: args.id === undefined || args.type === undefined
})