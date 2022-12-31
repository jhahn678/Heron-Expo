import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { IconButton, Text, TextInput, Surface, TextInputProps, HelperText, ActivityIndicator } from "react-native-paper";
import { theme } from "../../config/theme";
import { useAutoCompleteGeoplaces } from "../../hooks/queries/useAutocompleteSearch";
import { AutocompleteGeoplace, Fclass } from "../../types/Geoplace";

interface Props {
    title?: string
    label?: string
    required?: boolean
    placeholder?: string
    hideHelperText?: boolean
    inputMode?: TextInputProps['mode']
    containerStyle?: StyleProp<ViewStyle>
    initialValue?: string | undefined
    onClearSelected: () => void
    onSelect: (data: AutocompleteGeoplace) => void
    selectedPlace: AutocompleteGeoplace | null | undefined
}

const AutocompleteLocationInput = ({ 
    onSelect,
    selectedPlace,
    onClearSelected,
    initialValue='',
    label='Location', 
    inputMode='flat',
    required=false,
    hideHelperText=false,
    placeholder='Select a location',
    ...props
}: Props) => {

    const [input, setInput] = useState(initialValue)
    const [resultsVisible, setResultsVisible] = useState(false)

    const { data=[], isLoading, isError } = useAutoCompleteGeoplaces({ 
        input, limit: 5, fclass: [Fclass.P, Fclass.A] 
    })

    const handleFocus = () => {
        if(input !== initialValue){
            setResultsVisible(Boolean(input.length))
        }
    }

    useEffect(() => { 
        if(input !== initialValue){
            setResultsVisible(Boolean(input.length))
        } 
    },[input])

    const handleSetLocation = (place: AutocompleteGeoplace) => () => {
        onSelect(place);
        setResultsVisible(false)
    }

    const handleClearSelected = () => { setInput(''); onClearSelected(); }

    return (
        <KeyboardAvoidingView style={[props.containerStyle]}>
            { selectedPlace ? 
                <View style={styles.selected}>
                    <View>
                        <Text variant={"titleMedium"}>{selectedPlace.name}</Text>
                        {
                            selectedPlace.admin_two ?
                            <Text>{selectedPlace.admin_two}, {selectedPlace.admin_one}</Text> :
                            <Text>{selectedPlace.admin_one}, {selectedPlace.country}</Text> 
                        }
                    </View>
                    <IconButton icon={'close'} onPress={handleClearSelected} mode={'contained'} size={16}/>
                </View> :
                <>
                    <TextInput 
                        value={input}
                        label={label}
                        error={isError}
                        mode={inputMode}
                        onChangeText={setInput}
                        theme={{ roundness: 6 }}
                        placeholder={placeholder}
                        onFocus={handleFocus}
                        onBlur={() => setResultsVisible(false)}
                        right={ isLoading ? 
                            <TextInput.Icon icon={() => <ActivityIndicator/>}/> : 
                            <TextInput.Icon icon='magnify'/>
                        }
                    />
                    { isError ?
                        <HelperText type={"error"}>
                            <Text>Error loading results</Text>
                        </HelperText>
                        : (required && !hideHelperText) ?
                        <HelperText type={"info"}>
                            <Text>This field is required</Text>
                        </HelperText>
                        : null
                    }
                </>
            }
            { resultsVisible &&
                <Surface style={styles.autocomplete}>
                    { resultsVisible && data.map(place => (
                        <Pressable key={place.id} style={styles.result} onPress={handleSetLocation(place)}>
                            <Text variant={"titleSmall"}>{place.name}</Text>
                            { place.admin_two ?
                                <Text style={styles.location}>{place.admin_two}, {place.admin_one}</Text> :
                                <Text style={styles.location}>{place.admin_one}, {place.country}</Text> 
                            }
                        </Pressable>
                    ))}
                </Surface>
            }
        </KeyboardAvoidingView>
    );
};

export default AutocompleteLocationInput;

const styles = StyleSheet.create({
    selected: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.background,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    autocomplete: {
        marginTop: 4,
    },
    result: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 6,
        marginTop: 4
    },
    location: {
        fontSize: 12
    }
});
