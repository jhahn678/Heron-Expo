import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackScreenProps } from "../../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Surface, Title } from "react-native-paper";
import { theme } from "../../../../config/theme";

interface Props {
    navigation: RootStackScreenProps<'NewCatchScreen'>['navigation']
}

const Header = ({ navigation }: Props) => {
    
    return (
        <Surface style={styles.header}>
            <View style={styles.container}>
                <Icon name='arrow-left' size={24} onPress={navigation.goBack}/>
                <Title style={styles.title}>New Catch</Title>
            </View>
        </Surface>
    );  
};

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 80,
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.onPrimary,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontWeight: '500',
        marginLeft: 8
    }
});
