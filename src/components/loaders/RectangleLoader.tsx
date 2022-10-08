import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

interface Props {
    height?: number
    width?: number
    borderRadius?: number
    style?: StyleProp<ViewStyle>
}

const RectangleLoader = ({ height=16, width=200, borderRadius=6, style }: Props) => {
  return (
    <ContentLoader 
        speed={1}
        style={style}
        width={width}
        height={height}
        backgroundColor="#e3e3e3"
        foregroundColor="#f0f0f0"
        viewBox={`0 0 ${width} ${height}`}
    >
        <Rect x="0" y="0" rx={borderRadius} ry={borderRadius} width={width} height={height} />
    </ContentLoader>
  );
};

export default RectangleLoader;

const styles = StyleSheet.create({});
