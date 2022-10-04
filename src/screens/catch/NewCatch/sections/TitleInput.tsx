import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { useNewCatchStore } from "../../../../store/mutations/useNewCatchStore";

const TitleInput = () => {

    const setTitle = useNewCatchStore(store => store.setTitle)
    const [input, setInput] = useState('')
    const handleBlur = () => setTitle(input)

    return (
        <View style={styles.container}>
            <TextInput 
                mode='outlined'  
                placeholder="Title your catch"
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
