import React, { useEffect, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useRecommendLocation } from "../../hooks/mutations/useRecommendLocation";
import { useAuth } from "../../store/auth/useAuth";
import { useModalStore } from "../../store/modal/useModalStore";

interface Props {
  active: boolean | null | undefined;
  id: number | null | undefined;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const RecommendLocationButton = ({ id, ...props }: Props) => {

    const authenticated = useAuth(store => store.isAuthenticated)
    const showAuthModal = useModalStore(store => () => store.setAuth(true))
    const theme = useTheme() as MD3Theme;
    const [active, setActive] = useState(props.active)
    const [recommendLocation] = useRecommendLocation()

    useEffect(() => {
        setActive(props.active)
    },[props.active])

    const handlePress = async () => {
        if(!authenticated) return showAuthModal()
        if(!id) return;
        await recommendLocation({ variables: { id }})
        setActive(act => !act)
    }

    return (
      <Icon
        color={props.color || theme.colors.primary}
        onPress={handlePress}
        name={active ? "thumbs-up" : "thumbs-o-up"}
        size={props.size || 24}
        style={props.style}
      />
    );
};

export default RecommendLocationButton;

