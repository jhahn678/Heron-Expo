import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import RectangleLoader from "../../../../components/loaders/RectangleLoader";

const { width } = Dimensions.get('window')

const BioLoader = () => {
  return (
    <RectangleLoader 
      height={52} 
      width={width - 32} 
      borderRadius={8}
      style={{ marginBottom: 32, marginLeft: 16 }}/>
  );
};

export default BioLoader;

const styles = StyleSheet.create({});
