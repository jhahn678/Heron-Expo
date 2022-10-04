import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackScreenProps } from "../../../../types/navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconButton, Surface, Title } from "react-native-paper";
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";

interface Props {
    navigation: RootStackScreenProps<'NewLocationScreen'>['navigation']
}

const Header = ({ navigation }: Props) => {

    const navigateCamera = () => navigation.navigate('CameraScreen')
    
    return (
        <Surface style={styles.header}>
            <View style={styles.container}>
                <View style={globalStyles.frac}>
                    <Icon name='arrow-left' size={24} onPress={navigation.goBack}/>
                    <Title style={styles.title}>New Location</Title>
                </View>
                <IconButton icon='camera' mode="contained" onPress={navigateCamera}/>
            </View>
        </Surface>
    );  
};

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 90,
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.onPrimary,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontWeight: '500',
        marginLeft: 8
    }
});
