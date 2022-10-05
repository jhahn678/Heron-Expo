import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";

const { height, width } = Dimensions.get('screen')

interface Props {
    onDelete: () => void
    onCancel: () => void
}

const PromptDeletePoint = ({ onDelete, onCancel }: Props) => {
  return (
    <View style={styles.backdrop}>
        <Card style={styles.container}>
            <Text style={styles.text}>Delete Point?</Text>
            <Button mode="contained" style={styles.button} onPress={onDelete}>Delete</Button>
            <Button mode='contained-tonal' style={styles.button} onPress={onCancel}>Cancel</Button>
        </Card>
    </View>
  );
};

export default PromptDeletePoint;

const styles = StyleSheet.create({
    backdrop: {
        height,
        width,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,.2)'
    },
    container: {
        position: 'absolute',
        zIndex: 1000,
        bottom: height * .4,
        width: 280,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 24
    },
    button: {
        flex: 1,
        marginTop: 8
    }
});
