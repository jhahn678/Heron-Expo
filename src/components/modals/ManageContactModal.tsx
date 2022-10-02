import React from "react";
import { Text } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { useModalStore } from "../../store/modal/useModalStore";
import { useUnfollowUser } from "../../hooks/mutations/useFollowUser";

interface Props {
    visible: boolean
    dismiss: () => void
}

const ManageContactModal = ({ visible, dismiss }: Props) => {

    const [unfollow] = useUnfollowUser()

    const store = useModalStore(store => ({ 
        id: store.manageContactUser,
        name: store.manageContactName, 
        username: store.manageContactUsername,
    }))

    const handleConfirm = async () => {
        if(!store.id) return;
        await unfollow({ variables: { id: store.id }})
        dismiss()
    }

    return (
        <Dialog visible={visible} onDismiss={dismiss} theme={{ roundness: 1 }}>
            <Dialog.Title>Manage User</Dialog.Title>
            <Dialog.Content>
                <Text>
                    Are you sure you want to unfollow
                    {store.username ? ` @${store.username}` : ` ${store.name}`}?
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={dismiss}>Cancel</Button>
                <Button onPress={handleConfirm}>Unfollow</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default ManageContactModal;
