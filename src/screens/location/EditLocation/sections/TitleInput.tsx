import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { useEditLocationStore } from "../../../../store/mutations/useEditLocationStore";

interface Props {
    currentValue: string | undefined
}

const TitleInput = ({ currentValue }: Props) => {

    const setTitle = useEditLocationStore(store => store.setTitle)
    const [input, setInput] = useState('')

    useEffect(() => setTitle(
        input === currentValue ? 
        undefined : input.length > 0 ?
        input : null
    ),[input])

    useEffect(() => {
        setInput(currentValue || '')
    },[currentValue])

    return (
        <View style={styles.container}>
            <TextInput 
                mode='outlined'  
                placeholder="Title this location"
                label={'Title'}
                theme={{ roundness: 6 }}
                value={input}
                onChangeText={setInput}
            />
        </View>
    );
};

export default TitleInput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    }
});
