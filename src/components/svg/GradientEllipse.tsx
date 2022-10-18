import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import Svg, { Ellipse, Defs, LinearGradient, Stop } from "react-native-svg"

interface Props{
    style?: StyleProp<ViewStyle>
}

const GradientEllipse = (props: Props) => {
    return (
         <Svg
            width={430}
            height={559}
            fill="none"
            {...props}
        >
            <Ellipse
            cx={651.94}
            cy={675.033}
            rx={1027.01}
            ry={674.563}
            transform="rotate(-.25 651.94 675.033)"
            fill="url(#a)"
            />
            <Defs>
                {/* @ts-ignore */}
            <LinearGradient
                id="a"
                x1={-1239.36}
                y1={1457.53}
                x2={1387.84}
                y2={-1061.92}
                gradientUnits="userSpaceOnUse"
            >
                <Stop offset={0.088} stopColor="#C6E5F8" />
                <Stop offset={0.398} stopColor="#85BBD4" />
                <Stop offset={0.699} stopColor="#00668B" />
            </LinearGradient>
            </Defs>
        </Svg>
    );
}

export default GradientEllipse