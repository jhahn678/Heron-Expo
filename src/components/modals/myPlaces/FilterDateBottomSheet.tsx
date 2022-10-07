import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Button, TextInput, Title } from "react-native-paper";
import dayjs from "../../../config/dayjs";
import { useMyLocationsModalStore } from "../../../store/modal/useMyLocationsModalStore";
import Backdrop from "../Backdrop";

const FilterDateBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const [backdrop, setBackdrop] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [pickingFor, setPickingFor] = useState<null | 'MIN' | 'MAX'>(null)
    const [localMinDate, setLocalMinDate] = useState<Date | undefined>(undefined)
    const [localMaxDate, setLocalMaxDate] = useState<Date | undefined>(undefined)

    const modalVisible = useMyLocationsModalStore(store => store.dateVisible)
    const setModalVisible = useMyLocationsModalStore(store => store.setDateVisible)
    const handleClose = () => { setBackdrop(false); setModalVisible(false) }
    const setMinDate = useMyLocationsModalStore(store => store.setMinDate)
    const setMaxDate = useMyLocationsModalStore(store => store.setMaxDate)
    const storedMinDate = useMyLocationsModalStore(store => store.minDate)
    const storedMaxDate = useMyLocationsModalStore(store => store.maxDate)

    useEffect(() => {
        if(ref.current && modalVisible) {
            ref.current.expand()
            setBackdrop(true)
            setLocalMinDate(storedMinDate)
            setLocalMaxDate(storedMaxDate)
        }
    },[modalVisible])

    useEffect(() => {
        setLocalMaxDate(storedMaxDate);
        setLocalMinDate(storedMinDate)
    }, [storedMaxDate, storedMinDate])

    const openPicker = (state: 'MIN' | 'MAX') => () => {
        setPickingFor(state)
        setPickerVisible(true)
    }

    const handleConfirmPick = (date: Date) => {
        if(pickingFor === 'MIN') setLocalMinDate(date);
        if(pickingFor === 'MAX') setLocalMaxDate(date);
        setPickerVisible(false)
        setPickingFor(null)
    }

    const handleCancelPick = (date: Date) => {
        setPickerVisible(false)
        setPickingFor(null)
    }

    const handleSave = () => {
        setMinDate(localMinDate);
        setMaxDate(localMaxDate);
        setBackdrop(false)
        if(ref.current) ref.current.close()
    }

    const handleBackdrop = () => { setBackdrop(false); if(ref.current) ref.current.close() }
    const handleClearMin = () => setLocalMinDate(undefined)
    const handleClearMax = () => setLocalMaxDate(undefined)
    const handleClearValues = () => { setLocalMinDate(undefined); setLocalMaxDate(undefined) }

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={['36%']}
            containerStyle={{ zIndex: 100 }}
            enablePanDownToClose={true}
            onClose={handleClose}
            backdropComponent={backdrop ? (
                () => <Backdrop onPress={handleBackdrop} />
            ) : null}
        >
            <Title style={styles.title}>Dates</Title>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Start</Text>
                    <Pressable onPress={openPicker('MIN')}>
                        <TextInput 
                            editable={false}
                            style={{ marginRight: 6 }}
                            value={localMinDate ? dayjs(localMinDate).format('MM/DD/YYYY') : undefined}
                            placeholder="mm/dd/yyyy" 
                            mode="outlined" 
                            right={<TextInput.Icon icon='close' size={16} onPress={handleClearMin}/>}
                        />
                    </Pressable>
                </View>
                <View style={[styles.inputContainer, { paddingLeft: 6}]}>
                    <Text style={styles.label}>End</Text>
                    <Pressable onPress={openPicker('MAX')}>
                        <TextInput 
                            editable={false}
                            placeholder="mm/dd/yyyy" 
                            value={localMaxDate ? dayjs(localMaxDate).format('MM/DD/YYYY') : undefined}
                            mode="outlined" 
                            right={<TextInput.Icon icon='close' size={16} onPress={handleClearMax}/>}
                        />
                    </Pressable>
                </View>
            </View>
            <Button 
                onPress={handleSave} 
                mode='contained-tonal'
                style={styles.button}
            >Save</Button>
            <Button 
                onPress={handleClearValues} 
                style={styles.button}
            >Clear Dates</Button>
            <DateTimePickerModal 
                mode='date'
                isVisible={pickerVisible} 
                onConfirm={handleConfirmPick}
                onCancel={handleCancelPick}
            />
        </BottomSheet>
    );
};

export default FilterDateBottomSheet;

const styles = StyleSheet.create({
    title: {
        marginLeft: 24,
        fontWeight: '600'
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    inputContainer: {
        flex: 1
    },
    label: {
        fontWeight: '500'
    },
    button: {
        marginHorizontal: 24,
        marginBottom: 8
    }
});
