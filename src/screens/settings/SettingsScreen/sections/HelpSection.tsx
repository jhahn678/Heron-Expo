import { StyleSheet } from "react-native";
import React from "react";
import { List } from "react-native-paper";
import { RootStackScreenProps } from "../../../../types/navigation";

interface Props {
    navigation: RootStackScreenProps<'SettingsScreen'>['navigation']
}

const HelpSection = ({ navigation }: Props) => {

    const handleReportProblem = () => navigation.navigate('ReportProblemScreen')

    return (
        <List.Section>
            <List.Subheader style={styles.title}>Help</List.Subheader>
            <List.Item 
                title={'Report a Problem'} 
                onPress={handleReportProblem}
                right={() => <List.Icon icon={'help-circle-outline'}/>}
            />
        </List.Section>
    );
};

export default HelpSection;

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
