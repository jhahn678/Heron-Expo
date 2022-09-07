import { ViewStyle, StyleProp } from "react-native";
import { IconButton, IconButtonProps } from "react-native-paper";
import { useAuth } from "../../store/auth/useAuth";
import { useShareContent } from "../../hooks/utils/useShareContent";
import { useModalStore } from "../../store/modal/useModalStore";

interface Props {
    waterbody: number | undefined,
    size?: number
    mode?: IconButtonProps['mode']
    style?: StyleProp<ViewStyle>
}

const ShareButton = (props: Props): JSX.Element => {
    
    const shareContent = useShareContent()

    const handleShare = () => shareContent({ url: 'heron.com', shareType: 'WATERBODY'})
    
    return (
        <IconButton
            size={props.size || 24}
            mode={props.mode || 'contained'}
            style={props.style}
            onPress={handleShare} 
            icon='share-variant-outline'
        />
    );
};

export default ShareButton;
