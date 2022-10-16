import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useNewCatchStore } from "../../../../store/mutations/useNewCatchStore";
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { TextInput } from "react-native-paper";
import dayjs from '../../../../config/dayjs'

const DateTimeInput = () => {

    const [pickerVisible, setPickerVisible] = useState(false)
    const createdAt = useNewCatchStore(store => store.createdAt)
    const setCreatedAt = useNewCatchStore(store => store.setCreatedAt)

    const handleConfirmPick = (date: Date) => { setCreatedAt(date); setPickerVisible(false) }

    return (
        <View style={styles.container}>
            <DateTimePickerModal 
                mode='datetime'
                maximumDate={new Date()}
                isVisible={pickerVisible} 
                onConfirm={handleConfirmPick}
                onCancel={() => setPickerVisible(false)}
            />
            <Pressable onPress={() => setPickerVisible(true)}>
                <TextInput
                    label={'Date'}
                    mode="outlined" 
                    editable={false}
                    value={dayjs(createdAt).calendar(null, { sameElse: 'M/D/YYYY [at] h:m a' })}
                    right={<TextInput.Icon icon={'calendar-range'}/>}
                />
            </Pressable>
        </View>
    );
};

export default DateTimeInput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginTop: 24
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24,
        marginBottom: 12
    },

});
