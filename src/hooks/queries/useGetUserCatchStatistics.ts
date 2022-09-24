import { gql, useQuery } from '@apollo/client'
import { ICatch } from '../../types/Catch'
import { IWaterbody } from '../../types/Waterbody'

const GET_CATCH_STATISTICS = gql`
    query Catch_Statistics($id: Int!) {
        user(id: $id) {
            id
            catch_statistics {
                total_catches
                total_species
                all_species
                top_species
                total_waterbodies
                top_waterbody {
                    id
                    name
                }
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
            }
        }
    }
`

export interface CatchStatistics {
    total_catches: number
    total_species: number
    all_species: string[]
    top_species: string
    total_waterbodies: number
    top_waterbody: Pick<IWaterbody, 'id' | 'name'>
    largest_catch: Pick<ICatch, 'id' | 'species' | 'weight' | 'length' | 'created_at'> & {
        waterbody: { id: number, name: string }
    }
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

const GET_MY_CATCH_STATISTICS = gql`
    query Catch_Statistics {
        me {
            id
            catch_statistics {
                total_catches
                total_species
                all_species
                top_species
                total_waterbodies
                top_waterbody {
                    id
                    name
                }
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
                all_waterbodies {
                    id
                    name
                }
            }
        }
    }
`

export interface GetMyCatchWaterbodiesRes {
    me: {
        id: number
        catch_statistics: {
            all_waterbodies: Pick<IWaterbody, 'id' | 'name'>[]
        }
    }
}


export const useGetMyCatchWaterbodies = () => useQuery<GetMyCatchWaterbodiesRes>(GET_MY_CATCH_WATERBODIES)