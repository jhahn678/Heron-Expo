import { ViewStyle, StyleProp } from "react-native";
import { IconButton, IconButtonProps, MD3Theme, useTheme } from "react-native-paper";
import { ShareType, useShareContent } from "../../hooks/utils/useShareContent";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
    shareType: ShareType
    id: number | undefined | null,
    size?: number
    mode?: IconButtonProps['mode'] | 'none'
    style?: StyleProp<ViewStyle>
}

const ShareButton = ({ shareType, ...props }: Props): JSX.Element => {
    
    const shareContent = useShareContent()
    const theme = useTheme() as MD3Theme
    const handleShare = () => shareContent({ shareType, id: props.id })

    if(props.mode === 'none'){
        return (
          <Icon
            color={theme.colors.primary}
            size={props.size || 24}
            style={props.style}
            onPress={handleShare}
            name="share-variant-outline"
          />
        );
    }
    
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
