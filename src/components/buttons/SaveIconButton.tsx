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

const SaveIconButton = (props: Props) => {

    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const showAuthModal = useModalStore(state => state.setAuth)

    const [saved, setSaved] = useState(Boolean(props.saved))
    
    useEffect(() => {
        setSaved(Boolean(props.saved))
    }, [props.saved])
    
    const [saveWaterbody] = useSaveWaterbodyMutation({
        id: props.waterbody,
        onCompleted: () => setSaved(x => !x),
        onError: () => alert('Error completing request')
    })

    return (
        <IconButton 
            size={props.size || 24}
            mode={props.mode || 'contained'}
            style={props.style}
            onPress={() => isAuthenticated ? saveWaterbody() : showAuthModal()} 
            icon={ saved ? 
                ({ size }) => <Icon name='bookmark-check' size={size} color='#316a13'/> : 
                ({ size, color }) => <Icon name='bookmark-plus-outline' size={size} color={color}/>
            }
        />
    );
};

export default SaveIconButton;

const styles = StyleSheet.create({});
