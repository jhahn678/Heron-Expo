import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { View } from "react-native"

const SpeciesBottomSheetLoader = () => (
  //   <ContentLoader 
  //   speed={1}
  //   width={320}
  //   height={250}
  //   viewBox="0 0 320 250"
  //   backgroundColor="#e3e3e3"
  //   foregroundColor="#e6e6e6"
  // >
  //   <Rect x="0" y="12" rx="12" ry="12" width="220" height="20" /> 
  //   <Rect x="0" y="45" rx="12" ry="12" width="200" height="30" /> 
  //   <Rect x="0" y="100" rx="12" ry="12" width="320" height="20" /> 
  //   <Rect x="0" y="180" rx="12" ry="12" width="320" height="20" /> 
  //   <Rect x="0" y="140" rx="12" ry="12" width="320" height="20" />
  // </ContentLoader>
  <View style={{ height: 250, width: 320, backgroundColor: "#e3e3e3" }}/>
)

export default SpeciesBottomSheetLoader