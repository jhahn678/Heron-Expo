import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { useMyCatchesModalStore } from "../../../store/modal/useMyCatchesModalStore";
import { Title, Text, Button  } from "react-native-paper";
import { theme } from "../../../config/theme";
import Backdrop from "../Backdrop";

const { width } = Dimensions.get('screen')

const setLabel = (number: number, setter: (value: React.SetStateAction<string>) => void) => {
    if(number === 8) return setter('< 8 oz');
    if(number === 320) return setter('> 20 lb')
    if(number < 32) return setter(`${number} oz`)
    const oz = number % 16
    const lb = Math.floor(number / 16)
    return setter(`${lb} lb  ${oz} oz`)
}

const FilterWeightBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const setModalVisible = useMyCatchesModalStore(store => store.setWeightVisible)
    const handleClose = () => setModalVisible(false)
    const handleBackdrop = () => { setModalVisible(false); if(ref.current) ref.current.close() }
    const setMinWeight = useMyCatchesModalStore(store => store.setMinWeight)
    const setMaxWeight = useMyCatchesModalStore(store => store.setMaxWeight)
    const modalVisible = useMyCatchesModalStore(store => store.weightVisible)

    useEffect(() => {
        if(ref.current && modalVisible) ref.current.expand()
    },[modalVisible])

    const [values, setValues] = useState<number[]>([0, 320])
    const [minLabel, setMinLabel] = useState('< 8 oz')
    const [maxLabel, setMaxLabel] = useState('> 20 lb')

    const handleSave = () => {
        const [min, max] = values;
        setMinWeight(min === 8 ? undefined : min)
        setMaxWeight(max === 320 ? undefined : max)
        if(ref.current) ref.current.close()
    }

    const handleChangeValues = (values: number[]) => {
        setValues(values)
        const [min, max] = values;
        setLabel(min, setMinLabel)
        setLabel(max, setMaxLabel)
    }

    return (
        <BottomSheet
            ref={ref}
            snapPoints={['32%']}
            containerStyle={{ zIndex: 100 }}
            index={-1}
            enablePanDownToClose={true}
            onClose={handleClose}
            backdropComponent={modalVisible ? (
                () => <Backdrop onPress={handleBackdrop}/>
            ) : null}
        >
            <Title style={styles.title}>Weight</Title>
            <View style={styles.content}>
                <View style={styles.labels}>
                    <Text style={styles.label}>{minLabel}</Text>
                    <Text style={styles.label}>{maxLabel}</Text>
                </View>
                <MultiSlider
                    step={4} min={8} 
                    max={320} values={values}
                    onValuesChange={handleChangeValues}
                    sliderLength={width-72}
                    trackStyle={styles.track}
                    selectedStyle={styles.selected}
                    markerStyle={styles.marker}
                />
                <Button 
                    mode="contained-tonal" 
                    style={styles.button}
                    onPress={handleSave}
                >Save</Button>
            </View>
        </BottomSheet>
    );
};

export default FilterWeightBottomSheet;

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        paddingHorizontal: 24,
    },
    content: {
        paddingVertical: 24,
        paddingHorizontal: 24,
        alignItems: 'center'
    },
    labels: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
    label: {
        fontWeight: '600',
        fontSize: 16
    },
    track: {
        backgroundColor: theme.colors.secondaryContainer,
        transform: [{ scaleY: 2 }]
    },
    selected: {
        backgroundColor: theme.colors.secondary
    },
    marker: {
        backgroundColor: theme.colors.primary,
        height: 20,
        width: 20
    },
    button: { 
        width: '98%', 
        marginTop: 24
    }
});


