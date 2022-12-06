import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Text } from 'react-native-paper'
import RectangleLoader from "../../../../components/loaders/RectangleLoader";
import { theme } from "../../../../config/theme";
import BioLoader from "../loaders/BioLoader";

interface Props {
    bio: string | null | undefined
    username: string | undefined
    navigateToEdit: () => void
}

const BioSection = ({ bio, username, navigateToEdit }: Props) => {

    return (
        <View>
            <View style={styles.top}>
                { username ? 
                    <Chip 
                        icon={'at'} 
                        mode='outlined' 
                        style={styles.chip}
                    >{username}</Chip> :
                    <RectangleLoader width={150} height={36} borderRadius={8}/>
                }
                <Chip 
                    icon={'pencil'} 
                    mode='outlined'
                    onPress={navigateToEdit} 
                    style={styles.chip}>
                    Edit
                </Chip>
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
    },
    chip: {
        height: 36, 
        backgroundColor: theme.colors.secondaryContainer,
        borderColor: theme.colors.primary,
        borderWidth: 2
    },
});
