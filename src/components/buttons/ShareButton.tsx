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

const ShareButton = ({ shareType, size=24, mode='contained', ...props }: Props): JSX.Element => {
    
    const shareContent = useShareContent()
    const theme = useTheme() as MD3Theme
    const handleShare = () => shareContent({ shareType, id: props.id })

    if(mode === 'none'){
        return (
          <Icon
            color={theme.colors.primary}
            size={size}
            style={props.style}
            onPress={handleShare}
            name="share-variant-outline"
          />
        );
    }
    
    return (
        <IconButton
            size={size}
            mode={mode}
            style={props.style}
            onPress={handleShare} 
            icon='share-variant-outline'
        />
    );
};

export default ShareButton;
