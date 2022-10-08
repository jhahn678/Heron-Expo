import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../../config/theme";
import BioLoader from "../../MyProfileScreen/loaders/BioLoader";

interface Props {
    bio: string | null | undefined
}

const BioSection = ({ bio }: Props) => {
  return (
    <View>
        <Text style={styles.title}>Bio</Text>
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
});
