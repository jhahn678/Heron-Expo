import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from 'react-native-paper'
import globalStyles from "../../../../globalStyles";
import { RootStackScreenProps } from "../../../../types/navigation";

interface Props {
    navigation: RootStackScreenProps<'SettingsScreen'>['navigation']
}

const HeaderSection = ({ navigation }: Props) => {
  
    return (
        <View style={styles.container}>
            <View style={globalStyles.frac}>
                <IconButton icon='arrow-left' onPress={navigation.goBack}/>
                <Text style={styles.title}>Settings</Text>
            </View>
        </View>
    );
};

export default HeaderSection;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
    }
});
