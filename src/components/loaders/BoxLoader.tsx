import React from "react"
import { StyleProp, View } from "react-native"
import RectangleLoader from "./RectangleLoader"

interface Props { 
    height?: number
    width?: number
    style?: Omit<StyleProp<View>, 'height' | 'width'>
}

const BoxLoader = ({ height=200, width=200, ...props}: Props) => {
    return (
        <RectangleLoader height={height} width={width} style={props.style}/>
    )
};

export default BoxLoader;

