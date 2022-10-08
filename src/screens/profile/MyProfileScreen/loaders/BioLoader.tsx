import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

const { width } = Dimensions.get('window')

const BioLoader = () => {
  return (
    <ContentLoader 
        speed={1}
        width={width - 32}
        height={52}
        viewBox={`0 0 ${width - 32} 52`}
        backgroundColor="#e3e3e3"
        foregroundColor="#f0f0f0"
        style={{ marginBottom: 32, marginLeft: 16 }}
    >
        <Rect x="0" y="0" rx="12" ry="12" width={width - 32} height="52" />
    </ContentLoader>
  );
};

export default BioLoader;

const styles = StyleSheet.create({});
