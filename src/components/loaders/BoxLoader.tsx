import React from "react"
import ContentLoader, { 
    Rect, 
    IContentLoaderProps 
} from "react-content-loader/native"
import { View } from "react-native"

interface Props extends Omit<
    IContentLoaderProps, 'height'| 'width' | 'speed'
>{ 
    height?: number
    width?: number
    speed?: number
}

const BoxLoader = ({ height=200, width=200, speed=1, ...props}: Props) => {
    return (
        // <ContentLoader 
        //     speed={speed}
        //     width={height}
        //     height={width}
        //     viewBox={`0 0 ${width} ${height}`}
        //     backgroundColor="#e3e3e3"
        //     foregroundColor="#f0f0f0"
        //     {...props}
        // >
        //     <Rect x="0" y="0" rx="2" ry="2" width={width} height={height}/> 
        // </ContentLoader>
        <View style={{ height, width, backgroundColor: "e3e3e3" }}/>
        )
};

export default BoxLoader;

