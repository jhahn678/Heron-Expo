import React from "react";
import { Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { useModalStore } from "../../store/modal/useModalStore";
import { useRemoveContact } from "../../hooks/mutations/useRemoveContact";

interface Props {
    visible: boolean
    dismiss: () => void
}

const ManageContactModal = ({ visible, dismiss }: Props) => {

    const [removeContact] = useRemoveContact()

    const store = useModalStore(store => ({ 
        name: store.manageContactName, 
        id: store.manageContactUser
    }))

    const handleConfirm = async () => {
        if(!store.id) return;
        await removeContact({ variables: { id: store.id }})
        dismiss()
    }

    return (
        <Dialog visible={visible} onDismiss={dismiss} theme={{ roundness: 1 }}>
            <Dialog.Title>Manage Friend</Dialog.Title>
            <Dialog.Content>
                <Text>Are you sure you want to remove {store.name}?</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={dismiss}>Cancel</Button>
                <Button onPress={handleConfirm}>Remove</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default ManageContactModal;
