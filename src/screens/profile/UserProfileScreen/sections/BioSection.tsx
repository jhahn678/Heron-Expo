import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "react-native-paper";
import FollowButton from "../../../../components/buttons/FollowButton";
import RectangleLoader from "../../../../components/loaders/RectangleLoader";
import { theme } from "../../../../config/theme";
import { useAuth } from "../../../../store/auth/useAuth";
import BioLoader from "../../MyProfileScreen/loaders/BioLoader";

interface Props {
    id: number | undefined
    username: string | undefined
    following: boolean | undefined
    bio: string | null | undefined
}

const BioSection = ({ bio, username, id, following=false }: Props) => {

    const auth = useAuth(store => store.id)

    return (
        <View>
            <View style={styles.top}>
                { username ? 
                    <Chip 
                        icon={'account'} 
                        mode='outlined' 
                        style={styles.button}
                    >@{username}</Chip> :
                    <RectangleLoader width={150} height={36} borderRadius={8}/>
                }
                {( auth && auth !== id) && <FollowButton following={following} id={id}/> }
            </View>
            { bio !== null && <Text style={styles.title}>Bio</Text> }
            { bio ? 
                <View style={styles.box}>
                    <Text style={styles.text}>{bio}</Text>
                </View> :
                <BioLoader/>
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
    title: {
        fontWeight: '500',
        fontSize: 18,
        marginTop: 16,
        marginBottom: 8,
        marginLeft: 16
    },
    divider: {
        height: 1,
        backgroundColor: '#d9d9d9',
        marginHorizontal: 16
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
    button: {
        height: 36, 
        backgroundColor: theme.colors.secondaryContainer,
        borderColor: theme.colors.primary,
        borderWidth: 2
    },
});
