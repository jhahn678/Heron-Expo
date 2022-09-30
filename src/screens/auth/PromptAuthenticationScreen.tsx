import { StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper'
import FishermanFishing from "../../components/svg/FishermanFishing";
import globalStyles from "../../globalStyles";
import { navigationRef } from "../../navigation/navigationRef";

const PromptAuthenticationScreen = ()  => {

    const handleLogin = () => navigationRef.navigate('LoginAuthScreen')

    return (
        <View style={styles.container}>
            <View style={styles.prompt}>
                <FishermanFishing/>
                <Text style={styles.text}>Sign in to access this</Text>
                <Button 
                    uppercase 
                    icon={'arrow-right'} 
                    contentStyle={globalStyles.frr}
                    onPress={handleLogin}
                >Go to login</Button>
            </View>
        </View>
    );
};

export default PromptAuthenticationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    prompt: {
        height: 200,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 24,
        marginBottom: 8
    }
});
