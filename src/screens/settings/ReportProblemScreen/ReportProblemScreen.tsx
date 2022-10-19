import React, { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TextInput as RNTextInput } from "react-native";
import { TextInput, Text, Button, Surface, TouchableRipple } from "react-native-paper";
import { theme } from "../../../config/theme";
import { RootStackScreenProps } from "../../../types/navigation";
const { width } = Dimensions.get('screen')

const ReportProblemScreen = ({ navigation }: RootStackScreenProps<'ReportProblemScreen'>) => {

    const categoryRef = useRef<RNTextInput | null>(null)
    const [category, setCategory] = useState('')
    const [input, setInput] = useState('')
    const [categoriesVisible, setCategoriesVisible] = useState(false)

    const handleCategory = (value: string) => () => { 
        if(categoryRef.current) categoryRef.current.blur()
        setCategoriesVisible(false); 
        setCategory(value);
    }

    const handleSubmit = async () => {

    }

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
            <Text style={styles.header}>Select Category</Text>
            <TextInput 
                ref={categoryRef}
                mode={'outlined'}
                autoFocus={true}
                value={category} 
                onChangeText={setCategory}
                style={styles.input}
                onFocus={() => setCategoriesVisible(true)}
            />
            { categoriesVisible && 
                <Surface style={styles.categories}>
                    <TouchableRipple onPress={handleCategory('Account')}>
                        <Text style={styles.category}>Account</Text>
                    </TouchableRipple>
                    <TouchableRipple onPress={handleCategory('Security')}>
                       <Text style={styles.category}>Security</Text>
                    </TouchableRipple>
                    <TouchableRipple onPress={handleCategory('Privacy')}>
                        <Text style={styles.category}>Privacy</Text>
                    </TouchableRipple>
                    <TouchableRipple onPress={handleCategory('Linked Account')}>
                        <Text style={styles.category}>Linked Account</Text>
                    </TouchableRipple>
                    <TouchableRipple onPress={handleCategory('Report a Bug')}>
                        <Text style={styles.category}>Report a bug</Text>
                    </TouchableRipple>
                    <TouchableRipple onPress={handleCategory('General Help')}>
                        <Text style={styles.category}>General Help</Text>
                    </TouchableRipple>
                </Surface>
            }
            <Text style={styles.header}>Describe the issue</Text>
            <TextInput 
                value={input} 
                multiline={true}
                mode={'outlined'}
                numberOfLines={15}
                disabled={!category}
                onChangeText={setInput}
                style={styles.input}
                placeholder={
                    'Give as a brief, descriptive explanation of what the problem you are experiencing is'
                }
            />
            <Button 
                onPress={handleSubmit} 
                mode='contained' 
                theme={{ roundness: 2}}
                disabled={!category || input.length < 25}
            >Submit</Button>
        </ScrollView> 
    );
};

export default ReportProblemScreen;

const styles = StyleSheet.create({
    container: {
        width,
        padding: 24
    },
    categories: {
        flex: 1,
        transform: [{ translateY: -24 }],
        backgroundColor: theme.colors.background
    },
    category: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
    },
    header: {
        fontSize: 18,
        marginBottom: 16
    },
    input: {
        marginBottom: 32
    }
});
