  import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import Svg, { Ellipse, Defs, LinearGradient, Stop } from "react-native-svg"

interface Props{
    style?: StyleProp<ViewStyle>
}

const GradientEllipseMedium = (props: Props) => {
    return (
        <Svg
            width={230}
            height={543}
            fill="none"
            {...props}
        >
            <Ellipse
            cx={-234.739}
            cy={387.071}
            rx={464.578}
            ry={387.05}
            transform="rotate(-.25 -234.739 387.071)"
            fill="url(#a)"
            />
            <Defs>
                {/* @ts-ignore */}
            <LinearGradient
                id="a"
                x1={452.009}
                y1={-82.809}
                x2={-1336.44}
                y2={1492.53}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#C6E5F8" />
                <Stop offset={0.245} stopColor="#85BBD4" stopOpacity={0.5} />
                <Stop offset={0.521} stopColor="#00668B" stopOpacity={0.46} />
            </LinearGradient>
            </Defs>
        </Svg>
        )
}

export default GradientEllipseMedium;

