import React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from 'react-native-paper';
import { theme } from '../../../../config/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import { MapResource, UseNavigateParams } from "../../../../types/navigation";
import { useAuth } from "../../../../store/auth/useAuth";


const HeadingSection = () => {

    const id = useAuth(store => store.id)

    const navigation = useNavigation<UseNavigateParams>()

    const navigateToMap = () => {
        if(!id) return;
        navigation.navigate('ViewMapScreen', { resource: MapResource.UserCatches, id })
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>My Catches</Title>
            <Icon 
                name='map' 
                size={24} 
                onPress={navigateToMap}
                color={theme.colors.onPrimaryContainer} 
            />
        </View>
    );
};

export default HeadingSection;

const styles = StyleSheet.create({
    container: {
        height: '13%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: theme.colors.onPrimary,
        paddingHorizontal: 24,
        paddingTop: 36
    },
    title: {
        color: theme.colors.onPrimaryContainer,
        fontSize: 24,
        fontWeight: '600'
    }
});
