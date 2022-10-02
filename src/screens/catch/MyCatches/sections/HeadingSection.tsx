import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Title } from 'react-native-paper';
import { theme } from '../../../../config/theme'
import { useNavigation } from "@react-navigation/native";
import { BottomTabsScreenProps, MapResource } from "../../../../types/navigation";
import { useAuth } from "../../../../store/auth/useAuth";

const HeadingSection = () => {

    const id = useAuth(store => store.id)

    const navigation = useNavigation<BottomTabsScreenProps<'MyCatchesScreen'>['navigation']>()

    const navigateToMap = () => {
        if(!id) return;
        navigation.navigate('ViewMapScreen', { resource: MapResource.UserCatches, id })
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>My Catches</Title>
            <IconButton 
                icon='map' 
                onPress={navigateToMap}
                mode='contained'
                size={24}
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
        paddingLeft: 24,
        paddingRight: 16,
        paddingTop: 36
    },
    title: {
        color: theme.colors.onPrimaryContainer,
        fontSize: 24,
        fontWeight: '600'
    }
});
