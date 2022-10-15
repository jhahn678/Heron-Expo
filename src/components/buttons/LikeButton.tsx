import React, { useEffect, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { theme } from "../../config/theme";
import { useFavoriteCatch } from "../../hooks/mutations/useFavoriteCatch";
import { useRecommendLocation } from "../../hooks/mutations/useRecommendLocation";
import { useAuth } from "../../store/auth/useAuth";
import { useModalStore } from "../../store/modal/useModalStore";

export enum LikeType {
    Catch,
    Location
}

interface Props {
    type: LikeType
    active: boolean | null | undefined;
    id: number | null | undefined;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

const LikeButton = ({ id, type, ...props }: Props) => {

  const authenticated = useAuth(store => store.isAuthenticated)
  const setAuth = useModalStore(store => store.setAuth);
  const showAuthModal = () => setAuth(true)
  const [active, setActive] = useState(Boolean(props.active));
  const [recommendLocation] = useRecommendLocation();
  const [likeCatch] = useFavoriteCatch()

  useEffect(() => setActive(Boolean(props.active)), [props.active]);

  const handlePress = async () => {
    if (!id) return; if (!authenticated) return showAuthModal();
    if(type === LikeType.Catch) {
      setActive(x => !x); await likeCatch({ variables: { id }})
    }else if(type === LikeType.Location) {
      setActive(x => !x); await recommendLocation({ variables: { id } })
    }
  };

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

export default LikeButton;
