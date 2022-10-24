import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TextInput as RNTextInput, View } from "react-native";
import { TextInput, Text, Button, Surface, TouchableRipple, ActivityIndicator } from "react-native-paper";
import LoadingBackdrop from "../../../components/loaders/LoadingBackdrop";
import { theme } from "../../../config/theme";
import { useReportProblem } from "../../../hooks/mutations/useReportProblem";
import { useGetMyAccount } from "../../../hooks/queries/useGetMyAccount";
import { useModalStore } from "../../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../../types/navigation";
import { ErrorType } from "../../../utils/mapErrorTypeToDetails";
const { width } = Dimensions.get('screen')

const ReportProblemScreen = ({ navigation }: RootStackScreenProps<'ReportProblemScreen'>) => {

    const { data, isLoading: accountLoading } = useGetMyAccount()
    const categoryRef = useRef<RNTextInput | null>(null)
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [categoriesVisible, setCategoriesVisible] = useState(false)
    const setError = useModalStore(store => store.setError)
    const setSnack = useModalStore(store => store.setSnack)
    const setLoading = useModalStore(store => store.setLoading)
    const { submitReport, loading } = useReportProblem({
        onSuccess: () => { setSnack('Report submitted'); navigation.goBack() },
        onError: () => setError(true, ErrorType.RequestError)
    })

    useEffect(() => {
        if(data && data.email) setEmail(data.email)
    },[data])

    const handleCategory = (value: string) => () => { 
        if(categoryRef.current) categoryRef.current.blur()
        setCategoriesVisible(false); 
        setCategory(value);
    }

    const handleSubmit = () => submitReport({ category, email, message })

    return (
        <View>
            <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
                <Text style={styles.label}>Select Category</Text>
                <TextInput 
                    ref={categoryRef}
                    mode={'outlined'}
                    autoFocus={true}
                    value={category}
                    onChangeText={setCategory}
                    style={styles.input}
                    placeholder={"What's the issue?"}
                    right={<TextInput.Icon 
                        icon={categoriesVisible ? 'close' : 'chevron-down'}
                        onPress={() => setCategoriesVisible(x => !x)}
                    />}
                    onFocus={() => setCategoriesVisible(true)}
                    onBlur={() => setCategoriesVisible(false)}
                />
                { categoriesVisible && 
                    <Surface style={styles.categories}>
                        <TouchableRipple onPress={handleCategory('Account')}>
                            <Text style={styles.category}>Account</Text>
                        </TouchableRipple>
                        <TouchableRipple onPress={handleCategory('Privacy')}>
                            <Text style={styles.category}>Privacy</Text>
                        </TouchableRipple>
                        <TouchableRipple onPress={handleCategory('Linked Accounts')}>
                            <Text style={styles.category}>Linked Accounts</Text>
                        </TouchableRipple>
                        <TouchableRipple onPress={handleCategory('Report a Bug')}>
                            <Text style={styles.category}>Report a bug</Text>
                        </TouchableRipple>
                        <TouchableRipple onPress={handleCategory('Other')}>
                            <Text style={styles.category}>Other</Text>
                        </TouchableRipple>
                    </Surface>
                }
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    value={email}
                    onChangeText={setEmail}
                    mode={'outlined'}
                    style={styles.input} 
                    right={<TextInput.Icon 
                        icon={() => <ActivityIndicator animating={accountLoading}/>}
                    />}
                    placeholder={'Preferred email'}
                />
                <Text style={styles.label}>Describe the issue</Text>
                <TextInput 
                    value={message} 
                    multiline={true}
                    mode={'outlined'}
                    numberOfLines={15}
                    disabled={!category}
                    onChangeText={setMessage}
                    style={styles.input}
                    placeholder={
                        `Give as a brief, descriptive explanation of what the problem you are experiencing is.
                        
                        
                        


                        
                        
                        
                    `}
                />
                <Button 
                    onPress={handleSubmit} 
                    mode='contained' 
                    theme={{ roundness: 2}}
                    disabled={
                        !category || 
                        message.length < 25 ||
                        !email.includes('@' && '.')
                    }
                >Submit</Button>
            </ScrollView> 
            {loading && <LoadingBackdrop loaderStyle={{ marginBottom: 300 }}/>}
        </View>
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
    label: {
        fontSize: 18,
        marginBottom: 8
    },
    input: {
        marginBottom: 24
    }
});
