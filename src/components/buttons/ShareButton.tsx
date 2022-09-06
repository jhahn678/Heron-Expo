import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, IconButtonProps } from "react-native-paper";
import { useAuth } from "../../store/auth/useAuth";
import { useModalStore } from "../../store/modal/useModalStore";

interface Props {
    waterbody: number | undefined,
    size?: number
    mode?: IconButtonProps['mode']
    style?: StyleProp<ViewStyle>
}

const ShareButton = (props: Props): JSX.Element => {
    
    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const showAuthModal = useModalStore(state => state.setAuthVisible)

    const handleShare = () => {}
    
    return (
        <IconButton
            size={props.size || 24}
            mode={props.mode || 'contained'}
            style={props.style}
            onPress={isAuthenticated ? handleShare : showAuthModal} 
            icon='share-variant-outline'
        />
    );
};

export default ShareButton;
