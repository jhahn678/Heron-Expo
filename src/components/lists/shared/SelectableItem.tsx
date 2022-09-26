import React, { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";

interface Props {
    label?: string
    value: string | number,
    activeValues: any[] | undefined,
    onPress: (value: string | number) => void 
}

const SelectableItem = ({ label, value, onPress, activeValues=[] }: Props) => {

    const [active, setActive] = useState(false)

    useEffect(() => setActive(activeValues.includes(value)),[activeValues])

    const handlePress = () => onPress(value);

    return (
        <Checkbox.Item 
            label={label ? label : `${value}`} 
            status={active ? 'checked' : 'unchecked'}
            onPress={handlePress}
        />
    );
};

export default SelectableItem;

