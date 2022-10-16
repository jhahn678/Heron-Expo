import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { useMyCatchesModalStore } from "../../../store/modal/useMyCatchesModalStore";
import { Title, Text, Button  } from "react-native-paper";
import { theme } from "../../../config/theme";
import Backdrop from "../Backdrop";

const { width } = Dimensions.get('screen')

const OPTIONS = [0,4,6,8,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48]

const setLabel = (number: number, setter: (value: React.SetStateAction<string>) => void) => {
    if(number === 0) return setter('< 4 in');
    if(number === 48) return setter('> 4 ft')
    if(number < 24) return setter(`${number} in`)
    const inches = number % 12;
    const ft = Math.floor(number / 12)
    if(inches === 0) return setter(`${ft} ft`)
    return setter(`${ft} ft ${inches} in`)
}

const FilterLengthBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)

    const minLength = useMyCatchesModalStore(store => store.minLength)
    const maxLength = useMyCatchesModalStore(store => store.maxLength)
    const setMinLength = useMyCatchesModalStore(store => store.setMinLength)
    const setMaxLength = useMyCatchesModalStore(store => store.setMaxLength)
    const modalVisible = useMyCatchesModalStore(store => store.lengthVisible)
    const setModalVisible = useMyCatchesModalStore(store => store.setLengthVisible)

    const handleClose = () => setModalVisible(false)
    const handleBackdrop = () => { setModalVisible(false); if(ref.current) ref.current.close() }

    const [values, setValues] = useState<number[]>([0, 48])
    const [minLabel, setMinLabel] = useState('< 4 in')
    const [maxLabel, setMaxLabel] = useState('> 4 ft')

    const handleSave = () => {
        const [min, max] = values;
        setMinLength(min ? min : undefined)
        setMaxLength(max === 48 ? undefined : max)
        if(ref.current) ref.current.close()
    }

    const handleChangeValues = (values: number[]) => {
        setValues(values)
        const [min, max] = values;
        setLabel(min, setMinLabel)
        setLabel(max, setMaxLabel)
    }

    useEffect(() => {
        if(ref.current && modalVisible) {
            setValues([(minLength || 0), (maxLength || 48)])
            setLabel(minLength || 0, setMinLabel)
            setLabel(maxLength || 48, setMaxLabel)
            ref.current.expand()
        }
    },[modalVisible])

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
            <Title style={styles.title}>Length</Title>
            <View style={styles.content}>
                <View style={styles.labels}>
                    <Text style={styles.label}>{minLabel}</Text>
                    <Text style={styles.label}>{maxLabel}</Text>
                </View>
                <MultiSlider
                min={0}
                max={48}
                optionsArray={OPTIONS}
                values={values}
                onValuesChange={handleChangeValues}
                sliderLength={width-72}
                trackStyle={styles.track}
                selectedStyle={styles.selected}
                markerStyle={styles.marker}
                containerStyle={{ marginBottom: 24 }}
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

export default FilterLengthBottomSheet;

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
        width: width - 48,
        marginTop: 24
    }
});


