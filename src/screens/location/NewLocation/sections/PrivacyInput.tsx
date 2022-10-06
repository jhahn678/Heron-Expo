import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { RadioButton, Text, TouchableRipple } from "react-native-paper";
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { Privacy } from "../../../../types/Location";
import Icon from 'react-native-vector-icons/FontAwesome5'

const { width } = Dimensions.get('screen')

const PrivacyInput = () => {

    const [selected, setSelected] = useState<Privacy | string>(Privacy.Public)

    const handleValueChange = (value: Privacy) => () => setSelected(value)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Who Can See This</Text>
            <View style={styles.buttons}>
                <Pressable style={selected === Privacy.Public ? styles.active : styles.pressable} onPress={handleValueChange(Privacy.Public)}>
                    <Icon name='globe' size={28} color={theme.colors.onSecondaryContainer}/>
                    <Text style={styles.label}>Public</Text>
                </Pressable>
                <Pressable style={selected === Privacy.Friends ? styles.active : styles.pressable} onPress={handleValueChange(Privacy.Friends)}>
                    <Icon name='user-friends' size={28} color={theme.colors.onSecondaryContainer}/>
                    <Text style={styles.label}>Friends</Text>
                </Pressable>
                <Pressable style={selected === Privacy.Private ? styles.active : styles.pressable} onPress={handleValueChange(Privacy.Private)}>
                    <Icon name='user-shield' size={28} color={theme.colors.onSecondaryContainer}/>
                    <Text style={styles.label}>Private</Text>
                </Pressable>
            </View>
            {
                selected === Privacy.Public ?
                    <Text style={styles.caption}>Anyone can see this location</Text>
                : selected === Privacy.Friends ?
                    <Text style={styles.caption}>Only people you follow can see this location</Text>
                :   <Text style={styles.caption}>Only you can see this location</Text>
            }
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
    caption: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    active: {
        borderWidth: 1,
        borderRadius: 100,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primaryContainer,
        borderColor: theme.colors.onSecondaryContainer,
    },
    pressable: {
        borderWidth: 1,
        borderRadius: 100,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.onSecondaryContainer,
    },
    label: {
        marginTop: 4,
        fontWeight: '500',
        fontSize: 12
    }
});
