import { gql, useMutation } from '@apollo/client'
import { GET_MY_CONTACTS } from '../queries/useGetMyContacts'

const REMOVE_CONTACT = gql`
mutation DeleteContact($id: Int!) {
  deleteContact(id: $id)
}
`

interface Res {
    deleteContact: number
}

interface Vars {
    id: number
}

export const useRemoveContact = () => useMutation<Res, Vars>(REMOVE_CONTACT, {
    refetchQueries: [{ query: GET_MY_CONTACTS }]
})