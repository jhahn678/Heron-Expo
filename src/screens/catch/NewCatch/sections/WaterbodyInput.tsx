import { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Pressable, View } from "react-native";
import { Text, TextInput, Surface, IconButton } from 'react-native-paper'
import { theme } from "../../../../config/theme";
import { useAutoCompleteWaterbodies } from "../../../../hooks/queries/useAutocompleteSearch";
import { useGetNearestWaterbodies } from "../../../../hooks/queries/useGetNearestWaterbodies";
import { useNewCatchStore } from "../../../../store/mutations/useNewCatchStore";
import { IWaterbody } from "../../../../types/Waterbody";

const waterbodyLocationLabel = (x: IWaterbody) => {
    return (
        x.admin_two && x.admin_two.length < 3 ?
            `${x.admin_two[0]}, ${x.admin_one[0]}` :
        x.admin_one.length === 1 ?
            `${x.admin_one[0]}, ${x.country}` :
        x.admin_one.length > 1 && x.subregion ?
            `${x.subregion} ${x.country}` :
        x.admin_one.length > 1 ?
            `${x.admin_one[0]} + ${x.admin_one.length - 1} more, ${x.ccode}` :
            `${x.country}`
    )
}

const WaterbodyInput = () => {

    const [input, setInput] = useState('')
    const [waterbodyData, setWaterbodyData] = useState<IWaterbody | null>(null)
    const [showNearestWaterbodies, setShowNearestWaterbodies] = useState(false)

    const setWaterbody = useNewCatchStore(store => store.setWaterbody)

    const handleSetWaterbody = (x: IWaterbody) => () => { 
        setWaterbody(x.id); 
        setWaterbodyData(x);
        setShowNearestWaterbodies(false);
    }

    const handleClearWaterbody = () => { setWaterbody(); setWaterbodyData(null) }
    const handleShowNearest = (value: boolean) => () => setShowNearestWaterbodies(value)

    const { data: initialResults, isLoading: initalLoading } = useGetNearestWaterbodies()
    const { data: results } = useAutoCompleteWaterbodies(input)

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>Add a Fishery</Text>
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
                    right={<TextInput.Icon name='magnify'/>}
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
        backgroundColor: theme.colors.surface,
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
    }
});
