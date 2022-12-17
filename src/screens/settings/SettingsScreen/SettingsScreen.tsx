import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { RootStackScreenProps } from "../../../types/navigation";
import AccountSection from "./sections/AccountSection";
import HeaderSection from "./sections/HeaderSection";
import LegalSection from "./sections/LegalSection";
import SupportSection from "./sections/SupportSection";
const { height } = Dimensions.get('screen')

const SettingsScreen = ({ navigation }: RootStackScreenProps<'SettingsScreen'>) => {
    
    return (
        <View style={styles.container}>
            <HeaderSection navigation={navigation}/>
            <ScrollView style={styles.container}>
                <AccountSection navigation={navigation}/>
                <SupportSection navigation={navigation}/>
                <LegalSection/>
            </ScrollView>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        minHeight: height,
        flex: 1
    }
});
