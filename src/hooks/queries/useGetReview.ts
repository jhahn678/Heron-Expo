import { useQuery, gql } from '@apollo/client'
import { IWaterbody } from '../../types/Waterbody'

const GET_REVIEW = gql`
query WaterbodyReview($id: Int!) {
  waterbodyReview(id: $id) {
    id
    waterbody {
      id
      name
      ccode
      country
      subregion
      admin_one
      admin_two
    }
    rating
    text
    created_at
  }
}
`

interface Res {
    waterbodyReview: {
        id: number
        rating: number
        text: string | null
        created_at: Date
        waterbody: Pick<IWaterbody, 
            | 'id' 
            | 'name' 
            | 'ccode'
            | 'country'
            | 'subregion'
            | 'admin_one'
            | 'admin_two'
            >
    }
}

interface Vars {
    id: number
}

export const useGetReview = (id: number) => useQuery<Res, Vars>(GET_REVIEW, { variables: { id } })