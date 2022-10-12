import { useQuery, gql } from '@apollo/client'
import { ICatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { IWaterbody } from '../../types/Waterbody'

const EDIT_CATCH_QUERY = gql`
query EditCatch($id: Int!, $limit: Int) {
  catch(id: $id) {
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
    geom
    title
    description
    species
    length
    weight
    rig
    media(limit: $limit) {
      id
      key
      url
    }
    map_image {
      id
      key
      url
    }
    created_at
  }
}
`

interface Res {
    catch: Omit<ICatch, 'updated_at' | 'map_image'> & {
        waterbody: Pick<
            IWaterbody, 
            | 'id' 
            | 'name'
            | 'ccode'
            | 'country'
            | 'subregion'
            | "admin_one"
            | "admin_two"
            >,
        media: Pick<IMedia, 'id' | 'key' | 'url'>[],
        map_image: Pick<IMedia, 'id' | 'key' | 'url'>
    }
}

interface Vars {
    id: number
}

export const useEditCatchQuery = (id: number) => useQuery<Res, Vars>(EDIT_CATCH_QUERY, { 
  variables: { id },
  fetchPolicy: 'network-only'
})