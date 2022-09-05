import { axios } from "../../config/axios"
import { AutocompleteGeoplace } from "../../types/Geoplace"
import { AutocompleteWaterbody } from "../../types/Waterbody"
import { useQueries, UseQueryResult } from '@tanstack/react-query'
import { useEffect, useState } from "react"

export type AutocompleteResult = AutocompleteGeoplace | AutocompleteWaterbody

interface AutocompleteQuery  {
    value: string
    longitude: number | null
    latitude: number | null
}

const autocompleteWaterbodies = async (
    { value, longitude, latitude }: AutocompleteQuery
): Promise<AutocompleteWaterbody[]> => {
    let endpoint = `/autocomplete/waterbodies?value=${value}`
    if(longitude && latitude) endpoint += `&lnglat=${longitude},${latitude}`
    const res = await axios.get(endpoint)
    return res.data;
}

const autocompleteGeoplaces = async (
    { value, longitude, latitude }: AutocompleteQuery 
): Promise<AutocompleteGeoplace[]> => {
    let endpoint = `/autocomplete/geoplaces?value=${value}`
    if(longitude && latitude) endpoint += `&lnglat=${longitude},${latitude}`
    const res = await axios.get(endpoint)
    return res.data;
}


export const useAutoCompleteSearch = (
    { value, longitude, latitude }: AutocompleteQuery
) => {

    const [enabled, setEnabled] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isInitFetch, setIsInitFetch] = useState(false)
    const [results, setResults] = useState<AutocompleteResult[]>([])

    const [{ 
        data: geoplacesData,
        isError: geoplacesError,
        isLoading: geoplaceLoading  
    },{ 
        data: waterbodiesData,
        isError: waterbodiesError,
        isLoading: waterbodiesLoading
    }] = useQueries<[
        UseQueryResult<AutocompleteGeoplace[], Error>, 
        UseQueryResult<AutocompleteWaterbody[], Error>
    ]>({
        queries: [
            { 
                queryKey: ['geoplaces', value, longitude, latitude],
                queryFn: () => autocompleteGeoplaces({ value, longitude, latitude }),
                enabled
            },
            {  
                queryKey: ['waterbodies', value, longitude, latitude ],
                queryFn: () => autocompleteWaterbodies({ value, longitude, latitude }),
                enabled
            }
        ]

    })

    useEffect(() => {
        if(value.length > 0){
            setEnabled(true)
        }else{
            setEnabled(false)
            setResults([])
        }
    },[value])

    useEffect(() => {
        if(enabled){
            setEnabled(false)
            setTimeout(() => {
                setEnabled(true)
            }, 500)
        }
    }, [enabled])

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