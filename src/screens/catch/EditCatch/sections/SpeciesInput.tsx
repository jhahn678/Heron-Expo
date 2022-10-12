import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { fish_species } from "../../../../data/fish-species";
import { IconButton, TextInput } from "react-native-paper";
import { theme } from "../../../../config/theme";
import FishIcon from "../../../../components/icons/FishIcon";
import { useEditCatchStore } from "../../../../store/mutations/useEditCatchStore";

interface Props {
    currentValue: string | undefined
}

const SpeciesInput = ({ currentValue }: Props) => {

    const [input, setInput] = useState('')
    const [results, setResults] = useState<string[]>([])
    const [showResults, setShowResults] = useState(false)
    const handleShowResults = (value: boolean) => () => setShowResults(value)

    const { species, setSpecies } = useEditCatchStore(store => ({
        species: store.species,
        setSpecies: store.setSpecies
    }))

    const clearSelected = () => setSpecies(null)
    const handleSetSpecies = (value: string) => () => { setSpecies(value); setShowResults(false) }

    useEffect(() => {
        input.length > 0 ?
        setResults(fish_species.filter(x => x.includes(input)))
        : setResults([])
    },[input])

    useEffect(() => {
        if(currentValue) setSpecies(currentValue)
    },[currentValue])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What did you catch?</Text>
            { species ? 
                <View style={styles.selected}>
                    <Text style={styles.name}>{species}</Text>
                    <IconButton 
                        icon='close' 
                        onPress={clearSelected} 
                        mode='contained' 
                        size={16}
                    />
                </View> :
                <TextInput 
                    mode="outlined"
                    value={input}
                    onFocus={handleShowResults(true)}
                    onBlur={handleShowResults(false)}
                    onChangeText={setInput}
                    theme={{ roundness: 6 }}
                    placeholder="Species"
                    right={<TextInput.Icon icon={({ size, color }) => <FishIcon size={size} color={color}/>}/>}
                />
            }
            <View style={styles.resultsContainer}>
                { showResults && results.map(x =>
                    <Pressable key={x} style={styles.result} onPress={handleSetSpecies(x)}>
                        <Text style={styles.name}>{x}</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default SpeciesInput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24,
        marginBottom: 12
    },
    selected: {
        paddingVertical: 8,
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
    resultsContainer: {
        marginTop: 4
    },
    name: {
        fontWeight: '500',
        fontSize: 15
    }
});
