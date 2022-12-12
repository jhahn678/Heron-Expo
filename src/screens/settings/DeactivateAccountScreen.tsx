import React from "react";
import { StyleSheet, View } from "react-native";
import { useDeleteAccount } from "../../hooks/mutations/useDeleteAccount";
import { useModalStore } from "../../store/modal/useModalStore";
import { RootStackScreenProps } from "../../types/navigation";

const DeactivateAccountScreen = ({ navigation }: RootStackScreenProps<"DeactivateAccountScreen">) => {

    const setSnack = useModalStore(store => store.setSnack)

    const { deleteAccount, loading: deleteAccountLoading } = useDeleteAccount({
        onSuccess: () => {
            setSnack('Account successfully deleted')
        },
        onError: (err) => {
            if(err.response?.status === 401){
                setSnack("Unable to authenticate. Please login and try again.")
            }else{
                setSnack("Something went wrong..")
            }
        }
    })

    
    return (
        <View style={styles.container}>
            
        </View>
    )
}

export default DeactivateAccountScreen;

const styles = StyleSheet.create({
    container: {
        
    }
})