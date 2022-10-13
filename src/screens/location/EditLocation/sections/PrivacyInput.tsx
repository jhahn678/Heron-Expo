import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { theme } from "../../../../config/theme";
import Icon from 'react-native-vector-icons/FontAwesome5'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { privacyToLabel } from "../../../../utils/conversions/privacyToLabel";
import { privacyToIcon } from "../../../../utils/conversions/privacyToIcon";
import globalStyles from "../../../../globalStyles";
import { useEditLocationStore } from "../../../../store/mutations/useEditLocationStore";
import { Privacy } from "../../../../types/Location";

interface Props {
    currentValue: Privacy | undefined
}

const PrivacyInput = ({ currentValue }: Props) => {

    const [value, setValue] = useState<Privacy>(Privacy.Public)
    const privacy = useEditLocationStore(store => store.privacy)

    useEffect(() => {
        if(privacy) return setValue(privacy)
        if(currentValue) setValue(currentValue)
    },[currentValue, privacy])

    const setPrivacyVisible = useEditLocationStore(store => store.setPrivacyVisible)
    const handleShowModal = () => setPrivacyVisible(true)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Who Can See This</Text>
            <TouchableRipple onPress={handleShowModal}>
                <View style={styles.input}>
                    <View style={globalStyles.frac}>
                        <Icon name={privacyToIcon(value)} size={20} color={theme.colors.onSecondaryContainer}/>
                        <Text style={styles.label}>{privacyToLabel(value)}</Text>
                    </View>
                    <MCIcon name={'chevron-down'} size={32}/>
                </View>
            </TouchableRipple>
        </View>
    );
};

export default PrivacyInput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24,
        marginBottom: 24
    },
    input: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.onSecondaryContainer,
    },
    label: {
        marginLeft: 12,
        fontSize: 16,
    }
});
