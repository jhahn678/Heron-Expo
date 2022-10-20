import { gql, useMutation } from '@apollo/client'
import { makeFragmentId } from '../../utils/makeFragmentId'
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
            cache.updateFragment({
                id: `User:${variables?.id}`,
                fragment: gql`
                    fragment Follow${makeFragmentId()} on User{
                        am_following
                        total_followers
                    } 
                `
            }, data => ({ 
                ...data, 
                am_following: true, 
                total_followers: data?.total_followers ? data.total_followers + 1 : 1
            }))
        }
    }
)

export const useUnfollowUser = () => useMutation<{ unfollowUser: number }, { id: number }>(
    UNFOLLOW_USER, { 
        update: (cache, _, { variables }) => {
            cache.updateFragment({
                id: `User:${variables?.id}`,
                fragment: gql`
                    fragment Follow${makeFragmentId()} on User{
                        am_following
                        total_followers
                    } 
                `
            }, data => ({ 
                ...data, 
                am_following: false, 
                total_followers: data?.total_followers ? data.total_followers - 1 : 0
            }))
        }
    }
)