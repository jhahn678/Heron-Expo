import React from "react"
import ContentLoader, { 
    Rect, 
    IContentLoaderProps 
} from "react-content-loader/native"
import { View } from "react-native"
import RectangleLoader from "./RectangleLoader"

interface Props extends Omit<
    IContentLoaderProps, 'height'| 'width' | 'speed'
>{ 
    height?: number
    width?: number
    speed?: number
}

const WaterbodiesListLoader = (props: Props) => {
    return (
        <View>
            <RectangleLoader height={224} width={300} style={{ marginBottom: 8 }}/>
            <RectangleLoader height={20} width={180} style={{ marginBottom: 4 }}/>
            <RectangleLoader height={20} width={180} style={{ marginBottom: 4 }}/>
            <RectangleLoader height={54} width={120} style={{ marginBottom: 4 }}/>
        </View>
    )
};

export default WaterbodiesListLoader;