import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { useNewCatchStore } from "../../../../store/mutations/useNewCatchStore";

const MeasurementsInput = () => {

    const [weight, setWeight] = useState('')
    const [weightError, setWeightError] = useState(false)
    const [length, setLength] = useState('')
    const [lengthError, setLengthError] = useState(false)

    useEffect(() => {
        if(!length) return store.setLength()
        const timer = setTimeout(() => {
            const num = parseFloat(length)
            if(isNaN(num)){
                setLengthError(true)
            }else{
                store.setLength(num)
                setLengthError(false)
            }
        }, 500)
        return () => clearTimeout(timer)
    },[length])

    useEffect(() => {
        if(!weight) return store.setWeight()
        const timer = setTimeout(() => {
            const num = parseFloat(weight)
            if(isNaN(num)){
                setWeightError(false)
            }else{
                store.setWeight(num)
                setWeightError(false)
            }
        }, 500)
        return () => clearTimeout(timer)
    },[weight])

    const store = useNewCatchStore(store => ({
        weight: store.weight,
        length: store.length,
        setWeight: store.setWeight,
        setLength: store.setLength
    }))

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Take any measurements?</Text>
            <View style={globalStyles.frac}>
                <TextInput 
                    mode='outlined'  
                    placeholder="Length"
                    label={'Length'}
                    theme={{ roundness: 6 }}
                    value={length}
                    style={{ flex: 1 }}
                    onChangeText={setLength}
                    left={<TextInput.Icon icon={'ruler'} size={16}/>}
                    right={<TextInput.Affix text="in"/>}
                    error={lengthError}
                />
                <TextInput 
                    mode='outlined'  
                    placeholder="Weight"
                    label={'Weight'}
                    theme={{ roundness: 6 }}
                    value={weight}
                    style={{ flex: 1, marginLeft: 16 }}
                    onChangeText={setWeight}
                    left={<TextInput.Icon icon={"scale"} size={16}/>}
                    right={<TextInput.Affix text="oz"/>}
                    error={weightError}
                />
            </View>
        </View>
    );
};

export default MeasurementsInput;

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
