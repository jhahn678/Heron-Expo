import { useState, useEffect, MutableRefObject } from 'react'
import MapView, { LatLng, MapEvent } from 'react-native-maps'
import { createMidpoint, createMidpoints, MidPoint, PolygonPoint } from '../../utils/geospatial/createMidpoints'
import uuid from 'react-native-uuid'

export enum Resource {
  Catch,
  Location
}

export enum Geometry {
  Point = 'POINT',
  Polygon = 'POLYGON'
}

interface Args {
    resource: Resource | null
    geometry: Geometry
    map: MutableRefObject<MapView | null>
}

export const useCreateGeometry = ({ map, resource, geometry }: Args) => {

    const [point, setPoint] = useState<LatLng | null>(null)
    const [promptDelete, setPromptDelete] = useState(false)
    const [polygon, setPolygon] = useState<PolygonPoint[]>([])
    const [midpoints, setMidpoints] = useState<MidPoint[]>([])
    const [repositionPoint, setRepositionPoint] = useState<LatLng | null>(null)
    const [selectedPoint, setSelectedPoint] = useState<PolygonPoint | null>(null)
    const [repositionAnchorOne, setRepositionAnchorOne] = useState<PolygonPoint | null>(null)
    const [repositionAnchorTwo, setRepositionAnchorTwo] = useState<PolygonPoint | null>(null)
    
    useEffect(() => {
        if(point && map.current) {
        map.current.animateCamera({ 
            center: point,
            zoom: 15 
        })
        }
    },[point])

    useEffect(() => {
        if(polygon.length > 1){
        setMidpoints(
            polygon.length === 2
            ? createMidpoint(polygon[0], polygon[1])
            : createMidpoints(polygon)
        )
        }else{
        setMidpoints([])
        }
    },[polygon])

    const handleLongPress = ({ nativeEvent }: MapEvent) => {
        if(resource === Resource.Catch){
        setPoint(nativeEvent.coordinate)
        }
    }

    const handleRepositionDrag = ({ nativeEvent: { coordinate }}: MapEvent) => setRepositionPoint(coordinate)

    const handleMarkerDragEnd = ({ nativeEvent }: MapEvent) => setPoint(nativeEvent.coordinate)

    const handleMarkerPress = ({ nativeEvent }: MapEvent<{ 
        action: 'marker-press', id: string
    }>) => setSelectedPoint(polygon.find(x => x.id === nativeEvent.id) || null)

    const handlePress = ({ nativeEvent: { coordinate } }: MapEvent) => {
        if(resource !== Resource.Location) return;
        if(geometry === Geometry.Point) return setPoint(coordinate)
        if(geometry === Geometry.Polygon){
            setPolygon(state => ([
                ...state,
                { id: uuid.v4().toString(), coordinate }
            ]))
        }
    }

    const handlePolygonDragStart = (id: string) => ({ nativeEvent: { coordinate }}: MapEvent) => {
        const index = polygon.findIndex(x => x.id === id)
        setRepositionPoint(coordinate)
        setRepositionAnchorOne(polygon[index === polygon.length - 1 ? 0 : index + 1])
        setRepositionAnchorTwo(polygon[index === 0 ? polygon.length - 1 : index - 1])
    }
    
    const handlePolygonDragEnd = (id: string) => ({ nativeEvent: { coordinate }}: MapEvent) => {
        setPolygon(state => {
        const index = state.findIndex(x => x.id === id)
        return [
            ...state.slice(0,index), 
            { id: state[index].id, coordinate }, 
            ...state.slice(index + 1)
        ]
        })
        setRepositionPoint(null)
        setRepositionAnchorOne(null)
        setRepositionAnchorTwo(null)
    }

    const handleDeletePoint = () => {
        if(!selectedPoint) return;
        if(Geometry.Point) setPoint(null)
        if(Geometry.Polygon) setPolygon(state => ([
        ...state.filter(x => x.id !== selectedPoint.id)
        ]))
        setPromptDelete(false)
        setSelectedPoint(null)
    }

    const handleMidpointDragStart = (midpoint: MidPoint) => ({ nativeEvent: { coordinate } }: MapEvent) => {
        setRepositionPoint(coordinate)
        const left = polygon.find(x => x.id === midpoint.left)
        if(left) setRepositionAnchorOne(left)
        const right = polygon.find(x => x.id === midpoint.right)
        if(right) setRepositionAnchorTwo(right)
    }

    const handleMidpointDragEnd = (midpoint: MidPoint) => ({ nativeEvent: { coordinate } }: MapEvent) => {
        let index: number;
        const left = polygon.findIndex(x => x.id === midpoint.left);
        const right = polygon.findIndex(x => x.id === midpoint.right);
        if(polygon.length > 2 && left === 0 && right === polygon.length - 1){
        index = polygon.length;
        }else if(polygon.length > 2 && right === 0 && left === polygon.length - 1){
        index = polygon.length;
        }else{
        index = left > right ? left : right;
        }
        setPolygon(state => ([
        ...state.slice(0, index),
        { id: uuid.v4().toString(), coordinate },
        ...state.slice(index)
        ]))
        setRepositionPoint(null)
        setRepositionAnchorOne(null)
        setRepositionAnchorTwo(null)
    } 

    return {
        point,
        polygon,
        midpoints,
        selectedPoint,
        promptDelete,
        repositionPoint,
        repositionAnchorOne,
        repositionAnchorTwo,
        handlePress,
        handleLongPress,
        handleMarkerPress,
        handleMarkerDragEnd,
        handleMidpointDragStart,
        handleMidpointDragEnd,
        handlePolygonDragEnd,
        handlePolygonDragStart,
        handleRepositionDrag,
        handleDeletePoint,
        setPoint,
        setPolygon,
        setPromptDelete,
        setSelectedPoint
    }
}