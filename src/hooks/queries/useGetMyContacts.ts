import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { IUser } from '../../types/User'

export const GET_MY_CONTACTS = gql`
    query Me {
        me {
            id
            contacts {
                id
                fullname
                username
                location
                avatar
            }
        }
    }
`


export interface GetMyContacts {
    me: {
        contacts: Pick<
        IUser, 
        | 'id' 
        | 'avatar' 
        | 'fullname' 
        | 'username' 
        | 'location'
        >[]
    }
}

export const useGetMyContacts = () => {

    const isAuthenticated = useAuth(store => store.isAuthenticated) 

    const result = useQuery<GetMyContacts>(GET_MY_CONTACTS, {
        skip: !isAuthenticated
    })
    return result
}

export const useLazyGetMyContacts = () => {
    const result = useLazyQuery<GetMyContacts>(GET_MY_CONTACTS)
    return result
}