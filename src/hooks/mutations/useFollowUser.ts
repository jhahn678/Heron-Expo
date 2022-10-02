import { gql, useMutation } from '@apollo/client'
import { GET_MY_FOLLOWING } from '../queries/useGetUserFollowing'

const FOLLOW_USER = gql`
mutation Mutation($id: Int!) {
    followUser(id: $id)
}
`

const UNFOLLOW_USER = gql`
mutation Mutation($id: Int!) {
  unfollowUser(id: $id)
}
`

export const useFollowUser = () => useMutation<{ followUser: number }, { id: number }>(
    FOLLOW_USER, { 
        refetchQueries: [{ query: GET_MY_FOLLOWING }],
        update: (cache, _, { variables }) => {
            cache.writeFragment({
                id: `User:${variables?.id}`,
                fragment: gql`
                    fragment Follow${variables?.id} on User{
                        am_following
                    } 
                `,
                data: { am_following: true }
            })
        }
    }
)

export const useUnfollowUser = () => useMutation<{ unfollowUser: number }, { id: number }>(
    UNFOLLOW_USER, { 
        update: (cache, _, { variables }) => {
            cache.writeFragment({
                id: `User:${variables?.id}`,
                fragment: gql`
                    fragment Unfollow${variables?.id} on User{
                        am_following
                    }
                `,
                data: { am_following: false }
            })
        } 
    }
)