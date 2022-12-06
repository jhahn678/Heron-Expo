import { ScrollView, StyleProp, StyleSheet, ViewStyle} from "react-native";
import React from "react";
import RectangleLoader from "./RectangleLoader";

interface Props {
    horizontal?: boolean
    itemSize?: { height: number, width: number }
    numberOfItems?: number
    contentContainerStyle?: StyleProp<ViewStyle>
    itemStyle?: Omit<StyleProp<ViewStyle>, 'height' | 'width'>
}

const ScrollViewListLoader = ({
    horizontal=true,
    numberOfItems=4,
    itemSize={ height: 332, width: 300 },
    itemStyle={ marginRight: 12 },
    contentContainerStyle={ paddingLeft: 16 }
}: Props) => {
  return (
    <ScrollView 
        horizontal={horizontal} 
        contentContainerStyle={ contentContainerStyle}
        showsHorizontalScrollIndicator={false}
    >
        { new Array(numberOfItems).fill(null).map((_, i) => (
            <RectangleLoader 
                key={`${i}${Math.random()}`}
                height={itemSize.height}
                width={itemSize.width} 
                borderRadius={12} 
                style={itemStyle}
            />
        ))}
    </ScrollView>
  );
};

export default ScrollViewListLoader;
