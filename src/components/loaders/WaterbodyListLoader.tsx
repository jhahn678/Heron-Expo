import React from "react"
import ContentLoader, { 
    Rect, 
    IContentLoaderProps 
} from "react-content-loader/native"

interface Props extends Omit<
    IContentLoaderProps, 'height'| 'width' | 'speed'
>{ 
    height?: number
    width?: number
    speed?: number
}

const WaterbodiesListLoader = ({ height=300, width=300, speed=2, ...props}: Props) => {
    return (
        <ContentLoader 
            speed={speed}
            width={width}
            height={height}
            viewBox="0 0 300 300"
            backgroundColor="#e3e3e3"
            foregroundColor="#f0f0f0"
            {...props}
        >
            <Rect x="0" y="0" rx="12" ry="12" width="300" height="225" /> 
            <Rect x="0" y="240" rx="12" ry="12" width="168" height="20" /> 
            <Rect x="0" y="272" rx="12" ry="12" width="169" height="20" /> 
            <Rect x="182" y="240" rx="12" ry="12" width="115" height="54" />
        </ContentLoader>
    )
};

export default WaterbodiesListLoader;