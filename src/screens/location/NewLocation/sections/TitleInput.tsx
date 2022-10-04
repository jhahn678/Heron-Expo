import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useNewLocationStore } from "../../../../store/mutations/useNewLocationStore";

const TitleInput = () => {

    const setTitle = useNewLocationStore(store => store.setTitle)
    const [input, setInput] = useState('')
    const handleBlur = () => setTitle(input)

    return (
        <View style={styles.container}>
            <TextInput 
                mode='outlined'  
                placeholder="Title this location"
                label={'Title'}
                theme={{ roundness: 6 }}
                value={input}
                onChangeText={setInput}
                onBlur={handleBlur}
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