import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

const HeaderUserLoading = () => {
  return (
    <ContentLoader 
        speed={1}
        width={180}
        height={60}
        viewBox="0 0 180 52"
        backgroundColor="#e3e3e3"
        foregroundColor="#f0f0f0"
        style={{ marginTop: 8, marginLeft: 8 }}
    >
        <Rect x="0" y="0" rx="6" ry="6" width="150" height="24" /> 
        <Rect x="0" y="32" rx="6" ry="6" width="180" height="18" />
    </ContentLoader>
  );
};

export default HeaderUserLoading;
