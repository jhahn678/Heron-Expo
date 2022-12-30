import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Card, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RectangleLoader from "../../../../components/loaders/RectangleLoader";
import globalStyles from "../../../../globalStyles";

interface Props {
    icon: React.ReactNode
    label: string
    value: string | number | undefined
    onPress?: () => void
    loading?: boolean
    style?: StyleProp<ViewStyle>
}

const ProfileSection = (props: Props) => {
  return (
    <Card style={[styles.container, props.style]} onPress={props.onPress}>
        <Card.Content style={styles.content}>
            <View style={globalStyles.frac}>
                {props.icon}
                <View style={styles.text}>
                    <Text variant={'titleMedium'}>{props.label}</Text>
                    { props.loading ? 
                        <RectangleLoader style={{ marginTop: 6 }} height={16} width={100}/>
                        : <Text style={styles.value}>{props.value}</Text>
                    }
                </View>
            </View>
            <Icon name='chevron-right' size={28}/>
        </Card.Content>
    </Card>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: 'white'
    },
    content:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    value: {
        fontSize: 16,
    },
    text: {
        marginLeft: 16
    }
});
