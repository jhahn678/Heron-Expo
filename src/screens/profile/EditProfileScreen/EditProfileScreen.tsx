import { RootStackScreenProps } from "../../../types/navigation";
import { ScrollView, StyleSheet, View } from "react-native";
import { useAuth } from "../../../store/auth/useAuth";
import HeaderSection from "./sections/HeaderSection";
import { Text, Dialog } from 'react-native-paper'
import AvatarSection from "./sections/AvatarSection";
import { useGetMyProfile } from "../../../hooks/queries/useGetMyProfile";
import EditProfilePictureDialog from "../../../components/modals/EditProfilePictureDialog";
import { useState } from "react";
import DetailsInputs from "./sections/DetailsInputs";

const EditProfileScreen = ({ navigation }: RootStackScreenProps<'EditProfileScreen'>) => {

    const { id, avatar } = useAuth()
    const { data } = useGetMyProfile()
    const [showDialog, setShowDialog] = useState(false)
    const onAvatarPress = () => setShowDialog(true)

    return (
        <View style={styles.container}>
            <HeaderSection navigation={navigation}/>
            <ScrollView>
                <AvatarSection 
                    avatar={avatar} 
                    fullName={data?.me.fullname} 
                    onAvatarPress={onAvatarPress}
                />
                <DetailsInputs/>
            </ScrollView>
            <EditProfilePictureDialog 
                visible={showDialog} 
                setVisible={setShowDialog}
            />
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
