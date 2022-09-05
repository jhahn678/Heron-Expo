import { 
    StyleSheet, 
    NativeSyntheticEvent,
    NativeTouchEvent,
    ViewStyle,
    StyleProp,
    Pressable
} from "react-native";
import { Searchbar } from "react-native-paper";

interface Props {
    value?: string,
    setValue?: (value: string) => void
    onPress?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void
    /** @default false */
    autofocus?: boolean
    /** @default true */
    enabled?: boolean
    style?: StyleProp<ViewStyle>,
    placeholder?: string
}

const SearchBar = ({
    style, value, setValue, onPress, autofocus=false, enabled=true, placeholder
}: Props): JSX.Element => {
    
    return (
        <Pressable onPress={onPress}>
            <Searchbar 
                placeholder={placeholder}
                inputStyle={{ fontSize: 14 }}
                editable={enabled}
                autoFocus={autofocus}
                style={[styles.searchbar, style]} 
                theme={{ roundness:  12 }}
                value={value || ''}
                onChangeText={setValue}
            />
        </Pressable>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchbar: {
        width: '100%'
    }
})
