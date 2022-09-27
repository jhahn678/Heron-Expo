import { axios } from "../../config/axios"
import { AutocompleteGeoplace } from "../../types/Geoplace"
import { AutocompleteWaterbody } from "../../types/Waterbody"
import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query'
import { useEffect, useState } from "react"
import { useThrottleInputValue } from "../utils/useThrottleInputValue"
import { useLocationStore } from "../../store/location/useLocationStore"

export type AutocompleteResult = AutocompleteGeoplace | AutocompleteWaterbody

interface UseAutocompleteArgs {
    input: string
    longitude: number | null
    latitude: number | null
    limit?: number
}

export interface AutocompleteQuery {
    value: string
    longitude: number | null
    latitude: number | null,
    limit?: number
}


export const autocompleteWaterbodies = async ({
    value, longitude, latitude, limit 
}: AutocompleteQuery): Promise<AutocompleteWaterbody[]> => {
    let endpoint = `/autocomplete/waterbodies?value=${value}`
    if(longitude && latitude) endpoint += `&lnglat=${longitude},${latitude}`
    if(limit) endpoint += `&limit=${limit}}`
    const res = await axios.get(endpoint)
    return res.data;
}

const autocompleteGeoplaces = async ({
    value, longitude, latitude, limit
}: AutocompleteQuery ): Promise<AutocompleteGeoplace[]> => {
    let endpoint = `/autocomplete/geoplaces?value=${value}`
    if(longitude && latitude) endpoint += `&lnglat=${longitude},${latitude}`
    if(limit) endpoint += `&limit=${limit}}`
    const res = await axios.get(endpoint)
    return res.data;
}


export const useAutoCompleteSearch = ({
    input, longitude, latitude 
}: UseAutocompleteArgs) => {

    const value = useThrottleInputValue({ input })
    const [enabled, setEnabled] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isInitFetch, setIsInitFetch] = useState(false)
    const [results, setResults] = useState<AutocompleteResult[]>([])

    const [{ 
        data: geoplacesData,
        error: geoplacesError,
        isLoading: geoplaceLoading  
    },{ 
        data: waterbodiesData,
        error: waterbodiesError,
        isLoading: waterbodiesLoading
    }] = useQueries<[
        UseQueryResult<AutocompleteGeoplace[], Error>, 
        UseQueryResult<AutocompleteWaterbody[], Error>
    ]>({
        queries: [
            { 
                queryKey: ['geoplaces', value, longitude, latitude],
                queryFn: () => autocompleteGeoplaces({ 
                    value, longitude, latitude 
                }),
                enabled
            },
            {  
                queryKey: ['waterbodies', value, longitude, latitude ],
                queryFn: () => autocompleteWaterbodies({ 
                    value, longitude, latitude 
                }),
                enabled
            }
        ]
    })

    useEffect(() => {
        if(input.length > 0){
            setEnabled(true)
        }else{
            setEnabled(false)
            setResults([])
        }
    },[input])

    useEffect(() => {
        if(geoplacesData && waterbodiesData){
            setResults([
                ...waterbodiesData, 
                ...geoplacesData
            ].sort((x, y) => y.rank - x.rank))
            setIsInitFetch(false)
        }else if(geoplacesData){
            setResults(geoplacesData)
            setIsInitFetch(false)
        }else if(waterbodiesData){
            setResults(waterbodiesData)
            setIsInitFetch(false)
        }else if(waterbodiesLoading && geoplaceLoading){
            setIsInitFetch(true)
        }
    }, [
        geoplacesData, 
        waterbodiesData, 
        waterbodiesLoading, 
        geoplaceLoading
    ])

    useEffect(() => {
        if(geoplacesError && waterbodiesError){
            setIsError(true)
        }
    },[geoplacesError, waterbodiesError])


    return {
        results,
        isError,
        isInitFetch,
    }
}

export const useAutoCompleteWaterbodies = (input: string) => {

    const { longitude, latitude } = useLocationStore(store => ({
        latitude: store.latitude,
        longitude: store.longitude
    }))

    const value = useThrottleInputValue({ input })

    useEffect(() => setEnabled(input.length > 0),[input])

    const [enabled, setEnabled] = useState(false)

    return useQuery({
        queryKey: ['waterbodies', value, longitude, latitude ],
        queryFn: () => autocompleteWaterbodies({ 
            value, longitude, latitude, limit: 4 
        }),
        enabled
    })

}