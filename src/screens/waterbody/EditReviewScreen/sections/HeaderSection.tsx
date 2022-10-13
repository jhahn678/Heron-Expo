import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Title } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from "../../../../config/theme";
import { RootStackScreenProps } from "../../../../types/navigation";

interface Props {
    navigation: RootStackScreenProps<'EditReviewScreen'>['navigation']
}

const HeaderSection = ({ navigation }: Props) => {
    
    return (
        <Surface style={styles.header}>
            <View style={styles.container}>
                <Icon name='arrow-left' size={24} onPress={navigation.goBack}/>
                <Title style={styles.title}>Edit Review</Title>
            </View>
        </Surface>
    );  
};

export default HeaderSection;

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
        alignItems: 'center'
    },
    title: {
        fontWeight: '500',
        marginLeft: 8
    }
});
