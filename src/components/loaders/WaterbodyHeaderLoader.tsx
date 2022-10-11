import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"

const WaterbodyHeaderLoader = () => {

  return (
    <ContentLoader 
        speed={2}
        width={270}
        height={138}
        viewBox="0 0 270 140"
        backgroundColor="#e3e3e3"
        foregroundColor="#e6e6e6"
    >
        <Rect x="0" y="0" rx="12" ry="12" width="260" height="30" /> 
        <Rect x="0" y="40" rx="12" ry="12" width="270" height="25" /> 
        <Rect x="0" y="75" rx="12" ry="12" width="200" height="35" /> 
        <Rect x="0" y="120" rx="12" ry="12" width="220" height="20" />
    </ContentLoader>
  )
}

export default WaterbodyHeaderLoader
