import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton } from 'react-native-paper'
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { useChangeAvatar } from "../../../../hooks/mutations/useChangeAvatar";
import { EditProfileVars, useEditProfile } from "../../../../hooks/mutations/useEditProfile";
import { useUploadImages } from "../../../../hooks/mutations/useUploadImages";
import { useEditProfileStore } from "../../../../store/auth/useEditProfileStore";
import { useImageStore } from "../../../../store/image/useImageStore";
import { useModalStore } from "../../../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../../../types/navigation";
import { ErrorType } from "../../../../utils/conversions/mapErrorTypeToDetails";

interface Props {
    navigation: RootStackScreenProps<'EditProfileScreen'>['navigation']
}

const HeaderSection = ({ navigation }: Props) => {

    const showErrorModal = useModalStore(store => store.setError)
    const setSnack = useModalStore(store => store.setSnack)
    const clearImages = useImageStore(store => store.clearImages)
    const resetStore = useEditProfileStore(store => store.reset)

    const handleGoBack = () => { resetStore(); clearImages(); navigation.goBack() }

    const image = useImageStore(store => store.images[0])
    const firstname = useEditProfileStore(store => store.firstName)
    const lastname = useEditProfileStore(store => store.lastName)
    const state = useEditProfileStore(store => store.state)
    const city = useEditProfileStore(store => store.city)
    const bio = useEditProfileStore(store => store.bio)

    const { uploadToS3 } = useUploadImages();
    const [updateProfile] = useEditProfile();
    const [updateAvatar] = useChangeAvatar();

    const handleSave = async () => {
        if(image){
            const [avatar] = await uploadToS3([image])
            if(!avatar){
                showErrorModal(true, ErrorType.Upload)
            }else{
                await updateAvatar({ variables: { avatar } })
            }
        }
        const details: EditProfileVars['details'] = {};
        if(firstname) details.firstname = firstname;
        if(lastname) details.lastname = lastname;
        if(state) details.state = state;
        if(city) details.city = city;
        if(bio) details.bio = bio
        if(Object.keys(details).length > 0){
            await updateProfile({ variables: { details } });
            setSnack('Account updated successfully');
            handleGoBack();
        }
    }
  
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={globalStyles.frac}>
                    <IconButton icon={'arrow-left'} onPress={handleGoBack}/>
                    <Text style={styles.title}>Edit Profile</Text>
                </View>
                <IconButton 
                    size={28}
                    icon={"check"}
                    mode={"contained"} 
                    onPress={handleSave} 
                    style={styles.button}
                />
            </View>
        </View>
    );
};

export default HeaderSection;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        justifyContent: 'flex-end',
        backgroundColor: theme.colors.background,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
    },
    button: {
        marginRight: 16
    }
});

