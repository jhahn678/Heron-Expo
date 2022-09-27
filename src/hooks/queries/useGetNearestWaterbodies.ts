import { useQuery } from "@tanstack/react-query";
import { axios } from "../../config/axios";
import { useLocationStore } from "../../store/location/useLocationStore";
import { IWaterbody } from "../../types/Waterbody";

interface Position { 
    longitude: number | null
    latitude: number | null
}

const getNearestWaterbodies = async (position: Position): Promise<IWaterbody[]> => {
    const { longitude, latitude } = position;
    if(!longitude || !latitude) throw new Error('Coordinates not available');
    const url = `/autocomplete/nearest-waterbodies?lnglat=${longitude},${latitude}`
    const res = await axios.get<IWaterbody[]>(url)
    return res.data;
}

export const useGetNearestWaterbodies = () => {

    const position = useLocationStore(store => ({
        latitude: store.latitude,
        longitude: store.longitude
    }))

    return useQuery<IWaterbody[], Error>({
        queryFn: () => getNearestWaterbodies(position)
    })

}