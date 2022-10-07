import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useNewLocationStore } from "../../../../store/mutations/useNewLocationStore";

const DescriptionInput = () => {

    const [value, setValue] = useState('')
    const handleBlur = () => setDescription(value)
    const setDescription = useNewLocationStore(store => store.setDescription)

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
                onBlur={handleBlur}
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
