import { StyleSheet } from "react-native";
import { Text } from 'react-native-paper'

interface Props {
    description: string | undefined
}

const Description = ({ description }: Props) => {

    if(!description) return null;

    return (
        <Text style={styles.desc}>{description}</Text>
    );
};

export default Description;

const styles = StyleSheet.create({
    desc: {
        paddingVertical: 40,
        paddingHorizontal: 16,
        fontSize: 15,
        lineHeight: 24,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    }
});
