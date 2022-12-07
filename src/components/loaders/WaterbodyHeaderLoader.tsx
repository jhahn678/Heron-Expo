import React from "react"
import { View } from "react-native"
import RectangleLoader from "./RectangleLoader"

const WaterbodyHeaderLoader = () => {

  return (
    <View>
      <RectangleLoader height={32} width={250} style={{ marginBottom: 8 }}/>
      <RectangleLoader height={24} width={270} style={{ marginBottom: 8 }}/>
      <RectangleLoader height={36} width={200} style={{ marginBottom: 6 }}/>
      <RectangleLoader height={24} width={230}/>
    </View>
  )
}

export default WaterbodyHeaderLoader
