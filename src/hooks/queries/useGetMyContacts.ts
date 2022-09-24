import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { IContact } from '../../types/User'

const GET_MY_CONTACTS = gql`
    query Me {
        me {
            id
            contacts {
                fullname
                id
                username
                avatar
            }
        }
    }
`

type Contacts = { contacts: IContact[] }

export interface GetMyContacts {
    me: Contacts
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