import { forwardRef } from "react";
import { 
    StyleSheet, 
    NativeSyntheticEvent,
    NativeTouchEvent,
    ViewStyle,
    StyleProp,
    Pressable,
} from "react-native";
import { TextInput } from "react-native-paper";


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
    goBack?: () => void
}


const SearchBar = (props: Props): JSX.Element => {

    return (
        <Pressable onPress={props.onPress}>
            <TextInput
                mode='outlined'
                onPressIn={props.onPress}
                theme={{ roundness: 12 }}
                editable={props.enabled}
                placeholder={props.placeholder}
                autoFocus={props.autofocus}
                style={[styles.searchbar, props.style]}
                outlineColor={'rgba(0,0,0,.2)'}
                value={props.value || ''}
                onChangeText={props.setValue}
                multiline={false}
                right={<TextInput.Icon name='close' size={24}/>}
                left={
                    props.goBack ? 
                    <TextInput.Icon 
                        name='arrow-left' 
                        size={24} 
                        color='#000'
                        onPress={props.goBack}
                    /> :
                    <TextInput.Icon
                        name='magnify' 
                        size={24} 
                        color='#000'
                    />
                }
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
