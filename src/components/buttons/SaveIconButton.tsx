import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, IconButtonProps, useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from "react";
import { useSaveWaterbodyMutation } from "../../hooks/mutations/useSaveWaterbodyMutation";
import { useAuth } from "../../store/auth/useAuth";
import { useModalStore } from "../../store/modal/useModalStore";

interface Props {
    waterbody: number | undefined,
    saved?: boolean
    style?: StyleProp<ViewStyle>
    size?: number
    mode?: IconButtonProps['mode']
}

const SaveIconButton = ({ size=24, mode='contained', ...props }: Props) => {

    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const showAuthModal = useModalStore(state => state.setAuth)

    const [saved, setSaved] = useState(Boolean(props.saved))
    
    const [saveWaterbody] = useSaveWaterbodyMutation({
        onCompleted: data => setSaved(data.toggleSaveWaterbody),
        onError: () => alert('Error completing request')
    })

    useEffect(() => setSaved(Boolean(props.saved)),[props.saved])

    const handlePress = () => {
        if(!props.waterbody) return;
        if(!isAuthenticated) return showAuthModal()
        setSaved(x => !x)
        saveWaterbody({ variables: { id: props.waterbody }}) 
    }

    return (
        <IconButton 
            size={size}
            mode={mode}
            style={props.style}
            onPress={handlePress} 
            icon={ saved ? 
                ({ size }) => <Icon name='bookmark-check' size={size} color='#316a13'/> : 
                ({ size, color }) => <Icon name='bookmark-plus-outline' size={size} color={color}/>
            }
        />
    );
};

export default SaveIconButton;
