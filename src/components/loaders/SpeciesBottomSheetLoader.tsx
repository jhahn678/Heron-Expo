import React from "react"
import { View } from "react-native"
import RectangleLoader from "./RectangleLoader"

const SpeciesBottomSheetLoader = () => {
  return (
    <View>
      <RectangleLoader height={20} width={220} style={{ marginVertical: 12 }}/>
      <RectangleLoader height={30} width={200} style={{ marginBottom: 24 }}/>
      <RectangleLoader height={20} width={320} style={{ marginBottom: 12 }}/>
      <RectangleLoader height={20} width={320} style={{ marginBottom: 12 }}/>
      <RectangleLoader height={20} width={320} style={{ marginBottom: 12 }}/>
    </View>
  );
}

export default SpeciesBottomSheetLoader