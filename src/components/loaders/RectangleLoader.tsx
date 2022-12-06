import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Props {
    height?: number
    width?: number
    borderRadius?: number
    style?: Omit<StyleProp<ViewStyle>, 'height' | 'width' | 'borderRadius'>
}

const RectangleLoader = ({ height=16, width=200, borderRadius=6, style }: Props) => {
  return (
    // <ContentLoader 
    //     speed={1}
    //     style={style}
    //     width={width}
    //     height={height}
    //     backgroundColor="#e3e3e3"
    //     foregroundColor="#f0f0f0"
    //     viewBox={`0 0 ${width} ${height}`}
    // >
    //     <Rect x="0" y="0" rx={borderRadius} ry={borderRadius} width={width} height={height} />
    // </ContentLoader>
    // <SkeletonPlaceholder>
      // {/* <SkeletonPlaceholder.Item height={height} width={width} borderRadius={borderRadius}/> */}
      <View style={{ height, width, backgroundColor: "#e3e3e3", borderRadius, ...style }}/>
    // </SkeletonPlaceholder>
  );
};

export default RectangleLoader;

const styles = StyleSheet.create({});
