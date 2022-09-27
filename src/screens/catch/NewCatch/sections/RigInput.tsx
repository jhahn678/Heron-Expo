import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const RigInput = () => {

    const [value, setValue] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tell us what you used</Text>
            <TextInput 
                mode='outlined'  
                placeholder="Rod, tackle, bait, etc."
                label={'Gear'}
                numberOfLines={3}
                multiline={true}
                theme={{ roundness: 6 }}
                value={value}
                style={{ flex: 1 }}
                onChangeText={setValue}
            />
        </View>
    );
};

export default RigInput;

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
});
