import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from 'react-native-paper'
import { GetMyProfileRes } from "../../../../hooks/queries/useGetMyProfile";
import { useEditProfileStore } from "../../../../store/auth/useEditProfileStore";

interface Props {
    data: GetMyProfileRes['me'] | undefined
}

const DetailsInputs = ({ data }: Props) => {

    const store = useEditProfileStore(store => ({
        setBio: store.setBio,
        setCity: store.setCity,
        setState: store.setState,
        setLastName: store.setLastName,
        setFirstName: store.setFirstName,
    }))

    const [bio, setBio] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')

    useEffect(() => store.setFirstName(firstName),[firstName])
    useEffect(() => store.setLastName(lastName),[lastName])
    useEffect(() => store.setState(state),[state])
    useEffect(() => store.setCity(city),[city])
    useEffect(() => store.setBio(bio),[bio])

    useEffect(() => {
        if(data?.bio) setBio(data.bio)
        if(data?.city) setCity(data.city)
        if(data?.state) setState(data.state)
        if(data?.lastname) setLastName(data.lastname)
        if(data?.firstname) setFirstName(data.firstname)
    },[data])

    return (
        <View style={styles.container}>
            <TextInput 
                value={firstName} 
                mode={"outlined"}
                label={'First Name'}
                style={[styles.margin]}
                placeholder={'First Name'}
                onChangeText={setFirstName} 
            />
            <TextInput 
                value={lastName} 
                mode={"outlined"}
                label={'Last Name'}
                style={[styles.margin]}
                placeholder={'Last Name'}
                onChangeText={setLastName} 
            />
            <View style={[styles.row, styles.margin]}>
                <TextInput 
                    value={city} 
                    label={'City'}
                    mode={"outlined"}
                    placeholder={'City'}
                    onChangeText={setCity} 
                    style={[styles.rowItem, { marginRight: 4 }]}
                />
                <TextInput 
                    value={state} 
                    label={'State'}
                    mode={"outlined"}
                    placeholder={'State'}
                    onChangeText={setState} 
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
