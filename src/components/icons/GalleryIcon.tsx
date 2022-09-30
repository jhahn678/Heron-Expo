import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
  size?: number
}

const GalleryIcon = ({ size=24 }: Props) => (
  <Svg width={24} height={24} style={{ transform: [{ scale: size/24 }]}}>
      <Path fill="#000" d="M21.413 6.667H2.587A1.253 1.253 0 0 0 1.333 7.92v12.16a1.253 1.253 0 0 0 1.254 1.253h18.826a1.254 1.254 0 0 0 1.254-1.253V7.92a1.254 1.254 0 0 0-1.254-1.253ZM21.333 20H2.667V8h18.666v12Z" />
      <Path fill="#000" d="M5.707 12.967a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0-3.067a1.066 1.066 0 1 1 .053 2.132A1.066 1.066 0 0 1 5.707 9.9ZM5.267 18.667l4-4 2.12 2.12-1.88 1.88h1.333l4.973-4.974L20 17.847v-1.334l-3.867-3.846a.473.473 0 0 0-.666 0l-3.44 3.44-2.447-2.44a.473.473 0 0 0-.667 0l-4.966 5h1.32ZM20.093 2a.667.667 0 0 0-.666-.667H4.76A.667.667 0 0 0 4.093 2v.667h16V2ZM21.413 4.667A.667.667 0 0 0 20.747 4H3.413a.667.667 0 0 0-.666.667v.666h18.666v-.666Z" />
  </Svg>
)

export default GalleryIcon