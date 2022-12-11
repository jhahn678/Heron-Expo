import * as turf from '@turf/helpers'
import { Camera, LatLng } from 'react-native-maps'
import { geojsonToMapBounds } from "../conversions/geojsonToMapBounds"
import { greaterNum } from '../conversions/greaterNumber'

export const createPolygonCamera = (polygon: LatLng[]) => {
    const { geometry } = turf.polygon([polygon.map(x => [x.longitude, x.latitude])])
    const [max, min] = geojsonToMapBounds(geometry)
    const lngDelta = max.longitude - min.longitude;
    const latDelta = max.latitude - min.latitude;
    const delta = greaterNum(lngDelta, latDelta);
    return {
        center: {
            latitude: (max.latitude + min.latitude) / 2,
            longitude: (max.longitude + min.longitude) / 2,
        },
        zoom: delta ? Math.log(360 / delta) / Math.LN2 : 16,
    } as Partial<Camera>
}