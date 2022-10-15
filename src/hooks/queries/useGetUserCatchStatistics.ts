import { gql, useQuery } from '@apollo/client'
import { ICatch } from '../../types/Catch'
import { IWaterbody } from '../../types/Waterbody'

const GET_CATCH_STATISTICS = gql`
    query Catch_Statistics($id: Int!) {
        user(id: $id) {
            id
            catch_statistics {
                total_catches
                largest_catch {
                    id
                    waterbody {
                        id
                        name
                    }
                    species
                    weight
                    length
                    created_at
                }
                species_counts {
                    species
                    count
                }
                total_species
                top_species
                total_waterbodies
                waterbody_counts {
                    waterbody {
                        id
                        name
                    }
                    count
                }
                top_waterbody {
                    id
                    name
                }
            }
        }
    }
`

export interface CatchStatistics {
    total_catches: number
    total_species: number
    top_species: string | null
    total_waterbodies: number
    top_waterbody: Pick<IWaterbody, 'id' | 'name'> | null
    largest_catch: (Pick<ICatch, 'id' | 'species' | 'weight' | 'length' | 'created_at'> & {
        waterbody: { id: number, name: string }
    }) | null,
    species_counts: { species: string, count: number }[] | null
    waterbody_counts: { waterbody: Pick<IWaterbody, 'id' | 'name'>, count: number }[] | null
}

export interface GetUserCatchStatisticsRes {
    user: {
        id: number
        catch_statistics: CatchStatistics
    }
}

interface Vars {
    id: number
}

export const useGetUserCatchStatistics = (id: number | null | undefined) => {
    return useQuery<GetUserCatchStatisticsRes, Vars>(GET_CATCH_STATISTICS, {
        variables: id ? { id } : undefined,
        skip: !Boolean(id)
    })
}

export const GET_MY_CATCH_STATISTICS = gql`
    query Me {
        me {
            id
            catch_statistics {
                total_catches
                largest_catch {
                    id
                    waterbody {
                        id
                        name
                    }
                    species
                    weight
                    length
                    created_at
                }
                total_species
                top_species
                species_counts {
                    species
                    count
                }
                total_waterbodies
                top_waterbody {
                    id
                    name
                }
                waterbody_counts {
                    waterbody {
                        id
                        name
                    }
                    count
                }
            }
        }
    }
`

export interface GetMyCatchStatisticsRes {
    me: {
        id: number,
        catch_statistics: CatchStatistics
    }
}

export const useGetMyCatchStatistics = () => useQuery<GetMyCatchStatisticsRes>(GET_MY_CATCH_STATISTICS, {
    fetchPolicy: 'cache-first'
})


const GET_MY_CATCH_WATERBODIES = gql`
    query Catch_Statistics {
        me {
            id
            catch_statistics {
                waterbody_counts {
                    waterbody {
                        id
                        name
                    }
                    count
                }
            }
        }
    }
`

export interface GetMyCatchWaterbodiesRes {
    me: {
        id: number
        catch_statistics: {
            waterbody_counts: {
                waterbody: Pick<IWaterbody, 'id' | 'name'>
                count: number
            }[]
        }
    }
}


export const useGetMyCatchWaterbodies = () => useQuery<GetMyCatchWaterbodiesRes>(GET_MY_CATCH_WATERBODIES, {
    fetchPolicy: 'cache-first'
})