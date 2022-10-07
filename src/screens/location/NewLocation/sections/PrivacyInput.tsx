import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { theme } from "../../../../config/theme";
import Icon from 'react-native-vector-icons/FontAwesome5'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNewLocationStore } from "../../../../store/mutations/useNewLocationStore";
import { privacyToLabel } from "../../../../utils/conversions/privacyToLabel";
import { privacyToIcon } from "../../../../utils/conversions/privacyToIcon";
import globalStyles from "../../../../globalStyles";

const PrivacyInput = () => {

    const privacy = useNewLocationStore(store => store.privacy)
    const setPrivacyVisible = useNewLocationStore(store => store.setPrivacyVisible)
    const handleShowModal = () => setPrivacyVisible(true)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Who Can See This</Text>
            <TouchableRipple onPress={handleShowModal}>
                <View style={styles.input}>
                    <View style={globalStyles.frac}>
                        <Icon name={privacyToIcon(privacy)} size={20} color={theme.colors.onSecondaryContainer}/>
                        <Text style={styles.label}>{privacyToLabel(privacy)}</Text>
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
