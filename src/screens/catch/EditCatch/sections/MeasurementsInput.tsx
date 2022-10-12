import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import globalStyles from "../../../../globalStyles";
import { useEditCatchStore } from "../../../../store/mutations/useEditCatchStore";

interface Props {
    currentLength: number | undefined, 
    currentWeight: number | undefined 
}

const MeasurementsInput = ({ currentLength, currentWeight }: Props) => {

    const [weight, setWeight] = useState('')
    const [weightError, setWeightError] = useState(false)
    const [length, setLength] = useState('')
    const [lengthError, setLengthError] = useState(false)

    const store = useEditCatchStore(store => ({
        setWeight: store.setWeight,
        setLength: store.setLength
    }))

    useEffect(() => {
        if(length.length === 0){
            setLengthError(false)
            if(currentLength) return store.setLength(null)
            return store.setLength(undefined)
        }else{
            const num = parseFloat(length)
            if(isNaN(num)) return setLengthError(true)
            setLengthError(false)
            return store.setLength(num)
        }
    },[length])

    useEffect(() => {
        if(weight.length === 0){
            setWeightError(false)
            if(currentWeight) return store.setWeight(null);
            return store.setWeight(undefined)
        }else{
            const num = parseFloat(weight);
            if(isNaN(num)) return setWeightError(true)
            setWeightError(false)
            return store.setWeight(num)
        }
    },[weight])

    useEffect(() => {
        if(currentLength) setLength(currentLength.toString())
        if(currentWeight) setWeight(currentWeight.toString())
    },[currentLength, currentWeight])

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
