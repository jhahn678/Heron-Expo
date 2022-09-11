import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
    children: React.ReactNode,
    width: number
    style?: StyleProp<ViewStyle>
}

const RatingGraph = ({ children, style, width }: Props) => {

    return (
        <View style={[style, { width }]}>
            {children}
        </View>
    );
};

export default RatingGraph;

