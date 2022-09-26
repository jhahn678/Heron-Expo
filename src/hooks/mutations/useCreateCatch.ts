import { gql, useMutation } from '@apollo/client'
import { ICatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

const CREATE_CATCH = gql`
mutation Mutation($newCatch: NewCatch!) {
  createCatch(newCatch: $newCatch) {
    id
    total_favorites
    is_favorited
    rig
    weight
    length
    species
    description
    title
    geom
    user {
      id
      fullname
      avatar
    }
    waterbody {
      id
      name
    }
    media {
      id
      url
    }
    created_at
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

export interface NewCatchRes extends Omit<ICatch, 'user' | 'waterbody'>{
    user: Pick<IUser, 'id' | 'fullname' | 'avatar'>
    waterbody: Pick<IWaterbody, 'id' | 'name'>
    media: Pick<IMedia, 'id' | 'url'>[]
    total_favorites: number
    is_favorited: boolean
}

interface Args {
    waterbody: number | undefined
    coordinates: [number, number] | undefined
    title: string | undefined
    description: string | undefined
    species: string | undefined
    weight?: number | undefined
    length?: number | undefined
    rig?: string | undefined
    media?: {
        url: string
        key: string
    }[] | undefined 
}

export const useCreateCatch = (newCatch: Args) => {
    return useMutation<NewCatchRes, NewCatchArgs>(CREATE_CATCH, {
        variables: { newCatch },
        update: () => {

        }
    })
}