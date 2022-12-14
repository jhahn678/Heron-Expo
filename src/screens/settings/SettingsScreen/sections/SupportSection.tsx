import React from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { RootStackScreenProps } from "../../../../types/navigation";
import { openBrowserAsync } from 'expo-web-browser'

interface Props {
    navigation: RootStackScreenProps<'SettingsScreen'>['navigation']
}

const SupportSection = ({ navigation }: Props) => {

    const handleFAQ = () => openBrowserAsync("https://heron-mobile.com/faq")
    const handleReportProblem = () => navigation.navigate('ReportProblemScreen')

    return (
        <List.Section>
            <List.Subheader style={styles.title}>Support</List.Subheader>
            <List.Item 
                title={'FAQs'} 
                onPress={handleFAQ}
                right={() => <List.Icon icon={'help-circle-outline'}/>}
            />
            <List.Item 
                title={'Report a Problem'} 
                onPress={handleReportProblem}
                right={() => <List.Icon icon={'alert-box-outline'}/>}
            />
        </List.Section>
    );
};

export default SupportSection;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 22
    },
});
