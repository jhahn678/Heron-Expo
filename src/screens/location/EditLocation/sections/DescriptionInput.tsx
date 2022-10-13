import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { useEditLocationStore } from "../../../../store/mutations/useEditLocationStore";

interface Props {
    currentValue: string | undefined
}

const DescriptionInput = ({ currentValue }: Props) => {

    const setDescription = useEditLocationStore(store => store.setDescription)
    const [value, setValue] = useState('')

    useEffect(() => setDescription(
        value === currentValue ? 
        undefined : value.length > 0 ?
        value : null
    ),[value])
    
    useEffect(() => {
        setValue(currentValue || '')
    },[currentValue])

    return (
        <View style={styles.container}>
            <TextInput
                mode='outlined'  
                placeholder={"Share some details about this location. Access information, parking, regulations, etc."}
                label={'Description'}
                numberOfLines={5}
                theme={{ roundness: 6 }}
                multiline={true}
                value={value}
                onChangeText={setValue}
            />
        </View>
    );
};

export default DescriptionInput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16
    }
});
