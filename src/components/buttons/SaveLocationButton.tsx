import { useEffect, useState } from 'react'
import { StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '../../config/theme';
import { useSaveLocation } from '../../hooks/mutations/useSaveLocation';
import { useAuth } from '../../store/auth/useAuth';
import { useModalStore } from '../../store/modal/useModalStore';

interface Props {
    active: boolean | null | undefined
    id: number | null | undefined
    size?: number
    color?: string
    style?: StyleProp<ViewStyle>
}

const SaveLocationButton = ({ id, ...props }: Props) => {

    const authenticated = useAuth(store => store.isAuthenticated)
    const setAuthModal = useModalStore(store => store.setAuth)
    const showAuthModal = () => setAuthModal(true)
    const [saveLocation] = useSaveLocation()
    const [active, setActive] = useState(props.active)

    useEffect(() => setActive(props.active), [props.active]);

    const handlePress = async () => {
        if(!id) return; if(!authenticated) return showAuthModal()
        setActive(x => !x)
        await saveLocation({ variables: { id }})
    }

    return (
        <Icon 
            color={props.color || theme.colors.primary}
            name={active ? 'bookmark-check' : 'bookmark-outline'}
            size={props.size || 28}
            onPress={handlePress}
            style={props.style}
        />
    )
}   

export default SaveLocationButton;
