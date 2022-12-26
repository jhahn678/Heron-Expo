import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Title } from "react-native-paper";
import SelectableItem from "../../lists/shared/SelectableItem";
import Backdrop from "../Backdrop";
import { useMyLocationsModalStore } from "../../../store/modal/useMyLocationsModalStore";
import { Privacy } from "../../../types/Location";

const FilterPrivacyBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const setModalVisible = useMyLocationsModalStore(store => store.setPrivacyVisible)
    const setPrivacy = useMyLocationsModalStore(store => store.setPrivacy)
    const privacy = useMyLocationsModalStore(store => store.privacy)
    const modalVisible = useMyLocationsModalStore(store => store.privacyVisible)

    const handleBackdrop = () => { setModalVisible(false); if(ref.current) ref.current.close() }
    const handleClose = () => setModalVisible(false)

    useEffect(() => {
        if(ref.current && modalVisible) ref.current.expand()
    },[modalVisible])

    return (
        <BottomSheet
            ref={ref}
            snapPoints={['30%']}
            index={-1}
            containerStyle={{ zIndex: 100 }}
            enablePanDownToClose={true}
            onClose={handleClose}
            backdropComponent={modalVisible ? (
                () => <Backdrop onPress={handleBackdrop} />
            ) : null}
        >
            <Title style={styles.title}>Shared With</Title>
            <View style={styles.content}>
                <SelectableItem 
                    label={'Public'}
                    value={Privacy.Public} 
                    activeValues={privacy}
                    onPress={() => setPrivacy(Privacy.Public)}
                />
                <SelectableItem 
                    label={'Friends Only'}
                    value={Privacy.Friends}  
                    activeValues={privacy}
                    onPress={() => setPrivacy(Privacy.Friends)}
                />
                <SelectableItem 
                    label={'Private'}
                    value={Privacy.Private} 
                    activeValues={privacy}
                    onPress={() => setPrivacy(Privacy.Private)}
                />
            </View>

        </BottomSheet>
    );
};

export default FilterPrivacyBottomSheet;

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        paddingHorizontal: 24,
    },
    content: {
        paddingVertical: 16,
        paddingHorizontal: 8
    }
});

