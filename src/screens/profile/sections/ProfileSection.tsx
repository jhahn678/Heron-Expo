import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
    icon: React.ReactNode
    label: string
    value: string | number | undefined
    onPress?: () => void
}

const ProfileSection = ({ icon, label, value, onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <View style={styles.left}>
            {icon}
            <View style={styles.text}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value || '–'}</Text>
            </View>
        </View>
        <Icon name='chevron-right' size={32} style={styles.chevron}/>
    </Pressable>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 16,
        marginHorizontal: 16,
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16
    },
    text: {
        marginLeft: 24
    },
    label: {
        fontSize: 16,
        fontWeight: '500'
    },
    value: {
        fontSize: 16,
    },
    chevron: {
        marginRight: 16
    }
});
