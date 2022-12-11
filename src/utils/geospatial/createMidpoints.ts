import { LatLng } from "react-native-maps"
import * as turf from '@turf/helpers'
import midpoint from '@turf/midpoint'

export interface PolygonPoint {
  id: string,
  coordinate: LatLng
}

export interface MidPoint {
  left: string
  right: string
  coordinate: LatLng
}

export const createMidpoint = (first: PolygonPoint, second: PolygonPoint) => {
  const { id: left, coordinate: { latitude: leftLatitude, longitude: leftLongitude } } = first;
  const { id: right, coordinate: { latitude: rightLatitude, longitude: rightLongitude }} = second;
  const one = turf.point([leftLongitude, leftLatitude])
  const two = turf.point([rightLongitude, rightLatitude])
  const { geometry: { coordinates: [ x, y ] } } = midpoint(one, two)
  return [{
    left,
    right,
    coordinate: {
      longitude: x,
      latitude: y
    }
  }]
}

export const createMidpoints = (shape: PolygonPoint[]) => {
  let midpoints: MidPoint[] = [];
  shape.forEach(({ id: left, coordinate }, index) => {
    const { longitude, latitude } = coordinate;
    const one = turf.point([longitude, latitude])
    let next = index + 1
    if(index === shape.length - 1) next = 0
    const { coordinate: coords, id: right} = shape[next];
    const two = turf.point([coords.longitude, coords.latitude])
    const { geometry: { coordinates: [ x, y ] } } = midpoint(one, two)
    midpoints.push({
      left,
      right,
      coordinate: {
        longitude: x,
        latitude: y
      },
    })
  })
  return midpoints;
}