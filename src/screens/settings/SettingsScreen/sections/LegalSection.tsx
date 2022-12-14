import { StyleSheet } from 'react-native'
import { List } from "react-native-paper";
import { openBrowserAsync } from 'expo-web-browser'

const LegalSection = () => {

    const redirectTermsOfService = () => openBrowserAsync("https://heron-mobile.com")
    const redirectPrivacyPolicy = () => openBrowserAsync("https://heron-mobile.com/privacy-policy.html")

    return (
        <List.Section>
            <List.Subheader style={styles.title}>Legal</List.Subheader>
            <List.Item 
                title={'Terms of Service'} 
                onPress={redirectTermsOfService}
                right={() => <List.Icon icon={'file-sign'}/>}
            />
            <List.Item 
                title={'Privacy Policy'} 
                onPress={redirectPrivacyPolicy}
                right={() => <List.Icon icon={'file-document-outline'}/>}
            />
        </List.Section>
    )
}

export default LegalSection;

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
