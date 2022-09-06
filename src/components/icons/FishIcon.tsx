import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const FishIcon = ({ color='#000', ...props}: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M11.25 7.125c-2.377.572-4.413 2.452-5.64 3.442a12.25 12.25 0 0 0-1.115-.918C2.79 8.404.75 8.25.75 8.25s.533 2.415 1.939 3.742C1.283 13.319.75 15.734.75 15.734s2.04-.154 3.745-1.399c.386-.28.756-.585 1.107-.91 1.223.991 3.269 2.876 5.648 3.45L10.5 19.5c1.848-.313 3.697-1.665 4.44-2.262 6.06-.27 8.31-4.16 8.31-5.238 0-1.031-2.25-4.969-8.292-5.237-.73-.586-2.594-1.948-4.458-2.263l.75 2.625Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path d="M19.5 12a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" fill={color} />
    <Path
      d="M17.736 16.688a9.338 9.338 0 0 1 0-9.375"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={20}
      strokeLinecap="round"
    />
  </Svg>
)

export default FishIcon