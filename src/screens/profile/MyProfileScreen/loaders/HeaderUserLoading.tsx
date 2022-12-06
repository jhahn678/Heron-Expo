import React from "react";
import { View } from "react-native";
import RectangleLoader from "../../../../components/loaders/RectangleLoader";

const HeaderUserLoading = () => {
  return (
    <View style={{ marginLeft: 8 }}>
      <RectangleLoader height={24} width={140} style={{ marginBottom: 8 }}/>
      <RectangleLoader height={18} width={170} />
    </View>
  );
};

export default HeaderUserLoading;
