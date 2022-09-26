import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useNewCatchStore } from "../../../../store/mutations/useNewCatchStore";

const DescriptionInput = () => {

    const setDescription = useNewCatchStore(store => store.setDescription)
    const [value, setValue] = useState('')
    const handleBlur = () => setDescription(value)

    return (
        <View style={styles.container}>
            <TextInput
                mode='outlined'  
                placeholder="Share some details about the catch"
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
