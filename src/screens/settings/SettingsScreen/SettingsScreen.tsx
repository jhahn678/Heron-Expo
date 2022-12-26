import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RootStackScreenProps } from "../../../types/navigation";
import AccountSection from "./sections/AccountSection";
import HeaderSection from "./sections/HeaderSection";
import LegalSection from "./sections/LegalSection";
import SupportSection from "./sections/SupportSection";

const SettingsScreen = ({ navigation }: RootStackScreenProps<'SettingsScreen'>) => {
    
    return (
        <View style={styles.container}>
            <HeaderSection navigation={navigation}/>
            <ScrollView contentContainerStyle={styles.content}>
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
        flex: 1
    },
    content: {
        paddingBottom: 50
    }
});
