import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
  size?: number
  color?: string
}

const ContactsIcon = ({ size=24, color="#000" }: Props) => (
  <Svg
    width={24}
    height={24}
    style={{ transform: [{ scale: size/24 }]}}
  >
    <Path
      d="M13.8 9a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0Zm-5.4 3.9v.3a2.4 2.4 0 0 0 2.4 2.4h2.4a2.4 2.4 0 0 0 2.4-2.4v-.3a.9.9 0 0 0-.9-.9H9.3a.9.9 0 0 0-.9.9ZM4.8 4.8v14.4a2.4 2.4 0 0 0 2.4 2.4h11.4a.6.6 0 0 0 0-1.2H7.2A1.2 1.2 0 0 1 6 19.2h12a1.2 1.2 0 0 0 1.2-1.2V4.8a2.4 2.4 0 0 0-2.4-2.4H7.2a2.4 2.4 0 0 0-2.4 2.4Zm12-1.2A1.2 1.2 0 0 1 18 4.8V18H6V4.8a1.2 1.2 0 0 1 1.2-1.2h9.6Z"
      fill={color}
    />
  </Svg>
)

export default ContactsIcon