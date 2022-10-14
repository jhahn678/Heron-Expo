import dayjs from "dayjs";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from "../../../../config/theme";
import BioLoader from "../loaders/BioLoader";

interface Props {
    bio: string | null | undefined
    createdAt: Date | undefined
    navigateToEdit: () => void
}

const BioSection = ({ bio, createdAt, navigateToEdit }: Props) => {

    return (
        <View>
            <View style={styles.top}>
                <Text style={styles.date}>User since {dayjs(createdAt).format('MM/YYYY')}</Text>
                <Pressable onPress={navigateToEdit} style={styles.button}>
                    <Text style={styles.edit}>Edit</Text>
                    <Icon name='pencil' color={theme.colors.primary} size={14}/>
                </Pressable>
            </View>
            { bio !== null && <Text style={styles.title}>Bio</Text> }
            { bio ?
                <View style={styles.box}>
                    <Text style={styles.text}>{bio}</Text>
                </View> 
                : bio === undefined && <BioLoader/>
            }

            <View style={styles.divider}/>
        </View>
    );
};

export default BioSection;

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.secondary
    },
    date: {
        fontWeight: '500',
        color: theme.colors.onSecondary
    },
    button: {
        height: 36,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: theme.colors.primary,
        borderWidth: 2,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: theme.colors.surfaceVariant,
    },
    edit: {
        marginRight: 4,
        fontWeight: '500',
        color: theme.colors.primary
    },
    title: {
        fontWeight: '500',
        fontSize: 18,
        marginTop: 16,
        marginBottom: 8,
        marginLeft: 16
    },
    box: {
        backgroundColor: theme.colors.surfaceVariant,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 32,
        borderRadius: 12,
    },
    text: {
        fontWeight: '500',
        lineHeight: 20
    },
    divider: {
        height: 1,
        backgroundColor: '#d9d9d9',
        marginHorizontal: 16
    }
});
