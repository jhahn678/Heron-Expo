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
    placeholder?: string,
    multiline?: boolean
}

const SearchBar = (props: Props): JSX.Element => {
    
    return (
        <Pressable onPress={props.onPress}>
            <Searchbar
                enablesReturnKeyAutomatically={true}
                maxLength={1}
                multiline={props.multiline}
                placeholder={props.placeholder}
                inputStyle={{ fontSize: 14 }}
                editable={props.enabled}
                autoFocus={props.autofocus}
                style={[styles.searchbar, props.style]} 
                theme={{ roundness:  12 }}
                value={props.value || ''}
                onChangeText={props.setValue}
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
