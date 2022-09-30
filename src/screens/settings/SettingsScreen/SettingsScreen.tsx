import React from "react";
import { ScrollView, StyleSheet, View} from "react-native";
import { RootStackScreenProps } from "../../../types/navigation";
import AccountSection from "./sections/AccountSection";
import HeaderSection from "./sections/HeaderSection";

const SettingsScreen = ({ navigation }: RootStackScreenProps<'SettingsScreen'>) => {
    
    return (
        <View style={styles.container}>
            <HeaderSection navigation={navigation}/>
            <ScrollView style={styles.container}>
                <AccountSection/>
            </ScrollView>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
