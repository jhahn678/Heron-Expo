import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { IContact } from '../../types/User'

const GET_MY_CONTACTS = gql`
    query Me {
        me {
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

export const useGetMyContactsQuery = (isAuthenticated: boolean) => {
    const result = useQuery<GetMyContacts>(GET_MY_CONTACTS, {
        skip: !isAuthenticated
    })
    return result
}

export const useLazyGetMyContactsQuery = () => {
    const result = useLazyQuery<GetMyContacts>(GET_MY_CONTACTS)
    return result
}