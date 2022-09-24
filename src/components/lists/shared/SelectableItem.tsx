import React, { useState } from "react";
import { Checkbox } from "react-native-paper";

interface Props {
    label?: string
    value: string | number
    onPress: (value: string | number) => void 
}

const SelectableItem = ({ label, value, onPress }: Props) => {

    const [active, setActive] = useState(false)

    const handlePress = () => {
        onPress(value)
        setActive(x => !x)
    }

    return (
        <Checkbox.Item 
            label={label ? label : `${value}`} 
            status={active ? 'checked' : 'unchecked'}
            onPress={handlePress}
        />
    );
};

export default SelectableItem;

