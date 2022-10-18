import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import Svg, { Ellipse, Defs, LinearGradient, Stop } from "react-native-svg"

interface Props{
    style?: StyleProp<ViewStyle>
}

const GradientElippsesSmall = (props: Props) => (
  <Svg
    width={165}
    height={135}
    fill="none"
    {...props}
  >
    <Ellipse
      cx={103}
      cy={35.013}
      rx={61.736}
      ry={60.744}
      transform="rotate(-.25 103 35.013)"
      fill="url(#a)"
    />
    <Ellipse
      cx={12.5}
      cy={104.539}
      rx={35.368}
      ry={30.385}
      transform="rotate(-.25 12.5 104.539)"
      fill="url(#b)"
    />
    <Defs>
        {/* @ts-ignore */}
      <LinearGradient
        id="a"
        x1={194.259}
        y1={-38.731}
        x2={-76.94}
        y2={163.535}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#C6E5F8" stopOpacity={0.02} />
        <Stop offset={0.245} stopColor="#85BBD4" stopOpacity={0.1} />
        <Stop offset={0.521} stopColor="#00668B" stopOpacity={0.26} />
      </LinearGradient>
      {/* @ts-ignore */}
      <LinearGradient
        id="b"
        x1={64.781}
        y1={67.651}
        x2={-75.012}
        y2={187.06}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#C6E5F8" />
        <Stop offset={0.245} stopColor="#85BBD4" stopOpacity={0.5} />
        <Stop offset={0.521} stopColor="#00668B" stopOpacity={0.46} />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default GradientElippsesSmall
