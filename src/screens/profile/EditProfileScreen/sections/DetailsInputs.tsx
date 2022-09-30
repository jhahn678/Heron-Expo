import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from 'react-native-paper'
import { useEditProfileStore } from "../../../../store/auth/useEditProfileStore";

const DetailsInputs = () => {

    const store = useEditProfileStore(store => ({
        setFirstName: store.setFirstName,
        setLastName: store.setLastName,
        setState: store.setState,
        setCity: store.setCity,
        setBio: store.setBio,
    }))

    const [bio, setBio] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')

    const handleFirstNameBlur = () => store.setFirstName(firstName)
    const handleLastNameBlur = () => store.setLastName(lastName)
    const handleStateBlur = () => store.setState(state)
    const handleCityBlur = () => store.setCity(city)
    const handleBioBlur = () => store.setBio(bio)

    return (
        <View style={styles.container}>
            <TextInput 
                value={firstName} 
                onChangeText={setFirstName} 
                onBlur={handleFirstNameBlur}
                placeholder='First Name'
                mode="outlined"
                label={'First Name'}
                style={[styles.margin]}
            />
            <TextInput 
                value={lastName} 
                onChangeText={setLastName} 
                onBlur={handleLastNameBlur}
                placeholder='Last Name'
                mode="outlined"
                label={'Last Name'}
                style={[styles.margin]}
            />
            <View style={[styles.row, styles.margin]}>
                <TextInput 
                    value={city} 
                    onChangeText={setCity} 
                    onBlur={handleCityBlur}
                    placeholder='City'
                    mode="outlined"
                    label={'City'}
                    style={[styles.rowItem, { marginRight: 4 }]}
                />
                <TextInput 
                    value={state} 
                    label={'State'}
                    mode={"outlined"}
                    placeholder={'State'}
                    onChangeText={setState} 
                    onBlur={handleStateBlur}
                    autoCapitalize={"characters"}
                    style={[styles.rowItem, { marginLeft: 4 }]}
                />
            </View>
            <TextInput 
                value={bio} 
                label={'Bio'}
                multiline={true}
                mode={"outlined"}
                placeholder={'Bio'}
                onChangeText={setBio} 
                onBlur={handleBioBlur}
                style={[styles.margin]}
            />
        </View>
    );
};

export default DetailsInputs;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowItem: {
        flex: 1
    },
    margin: {
        marginBottom: 12
    }
});
