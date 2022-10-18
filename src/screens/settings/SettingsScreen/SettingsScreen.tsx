import React from "react";
import { ScrollView, StyleSheet, View} from "react-native";
import UnlinkAccountModal from "../../../components/modals/UnlinkAccountModal";
import { useModalStore } from "../../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../../types/navigation";
import AccountSection from "./sections/AccountSection";
import HeaderSection from "./sections/HeaderSection";

const SettingsScreen = ({ navigation }: RootStackScreenProps<'SettingsScreen'>) => {

    const unlinkAccount = useModalStore(store => store.unlinkAccount)
    
    return (
        <View style={styles.container}>
            <HeaderSection navigation={navigation}/>
            <ScrollView style={styles.container}>
                <AccountSection/>
            </ScrollView>
            {unlinkAccount && <UnlinkAccountModal navigation={navigation}/>}
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
