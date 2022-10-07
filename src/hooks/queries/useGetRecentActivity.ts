import { gql, useQuery } from '@apollo/client'
import { ICatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

const GET_RECENT_ACTIVITY = gql`
    query ActivityFeed {
        activityFeed {
            id
            user {
                id
                fullname
                avatar
            }
            waterbody {
                id
                name
            }
            geom
            species
            created_at
            media {
                id
                url
            }
            map_image{
                id
                url
            }
        }
    }
`

export interface RecentActivity
  extends Pick<ICatch, "id" | "geom" | "species" | "created_at"> {
  user: Pick<IUser, "id" | "fullname" | "avatar">;
  waterbody: Pick<IWaterbody, "id" | "name">;
  media: Pick<IMedia, "url" | "id">[];
  map_image?: Pick<IMedia, "url" | "id">
}

export interface GetRecentActivity {
    activityFeed: RecentActivity[]
}

export const useGetRecentActivityQuery = () => useQuery<GetRecentActivity>(GET_RECENT_ACTIVITY)