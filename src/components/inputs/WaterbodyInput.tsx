import { useEffect, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Pressable, View, TextInput as RNTextInput } from "react-native";
import { Text, TextInput, Surface, IconButton } from 'react-native-paper'
import { theme } from "../../config/theme";
import globalStyles from "../../globalStyles";
import { useAutoCompleteWaterbodies } from "../../hooks/queries/useAutocompleteSearch";
import { useGetNearestWaterbodies } from "../../hooks/queries/useGetNearestWaterbodies";
import { useGetWaterbodyLocationFragment, WaterbodyLocation } from "../../hooks/queries/useGetWaterbody";
import { waterbodyLocationLabel } from "../../utils/conversions/waterbodyLocationToLabel";

interface Props {
    title?: string
    selectedWaterbody: number | null | undefined
    required?: boolean
    setWaterbody: (value?: number | undefined) => void
}

const WaterbodyInput = ({ selectedWaterbody, setWaterbody, title="Add a Fishery", required }: Props) => {

    const [input, setInput] = useState('')
    const [waterbodyData, setWaterbodyData] = useState<WaterbodyLocation | null>(null)
    const [showNearestWaterbodies, setShowNearestWaterbodies] = useState(false)
    const getCachedWaterbody = useGetWaterbodyLocationFragment()
    const requiredColor = () => required ? theme.colors.primary : undefined 

    const handleSetWaterbody = (x: WaterbodyLocation) => () => { 
        setWaterbody(x.id); 
        setWaterbodyData(x);
        setShowNearestWaterbodies(false);
    }

    useEffect(() => {
        if(selectedWaterbody){
            const data = getCachedWaterbody(selectedWaterbody)
            if(data) handleSetWaterbody(data)()
        }
    },[selectedWaterbody])

    const handleClearWaterbody = () => { setWaterbody(); setWaterbodyData(null) }
    const handleShowNearest = (value: boolean) => () => setShowNearestWaterbodies(value)

    const { data: initialResults } = useGetNearestWaterbodies()
    const { data: results } = useAutoCompleteWaterbodies(input)

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={globalStyles.baseline}>
                <Text style={styles.title}>{title}</Text>
                { required && <Text style={styles.required}>Required</Text>}
            </View>
            { waterbodyData ? 
                <View style={styles.selected}>
                    <View>
                        <Text style={styles.selname}>{waterbodyData.name}</Text>
                        <Text>{waterbodyLocationLabel(waterbodyData)}</Text>
                    </View>
                    <IconButton icon='close' onPress={handleClearWaterbody} mode='contained' size={16}/>
                </View> :
                <TextInput 
                    mode="outlined"
                    value={input}
                    onFocus={handleShowNearest(true)}
                    onBlur={handleShowNearest(false)}
                    onChangeText={setInput}
                    theme={{ roundness: 6 }}
                    placeholder="Select a Fishery"
                    placeholderTextColor={requiredColor()}
                    outlineColor={requiredColor()}
                    right={<TextInput.Icon icon='magnify' iconColor={requiredColor()}/>}
                />
            }
            { showNearestWaterbodies &&
                <Surface style={styles.autocomplete}>
                    {(input.length === 0 ? initialResults : results)?.map(x =>
                        <Pressable key={x.id} style={styles.result} onPress={handleSetWaterbody(x)}>
                            <Text style={styles.name}>{x.name}</Text>
                            <Text style={styles.location}>{waterbodyLocationLabel(x)}</Text>
                        </Pressable>
                    )}
                </Surface>
            }
        </KeyboardAvoidingView>
    );
};

export default WaterbodyInput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24,
        marginBottom: 16
    },
    selected: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.background,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.colors.onSecondaryContainer,
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
    name: {
        fontWeight: '500',
    },
    selname: {
        fontWeight: '500',
        fontSize: 16
    },
    location: {
        fontSize: 12
    },
    required: {
        fontWeight: '500',
        fontStyle: 'italic',
        color: theme.colors.primary,
        marginLeft: 16
    },
});
