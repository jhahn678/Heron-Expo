import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, RadioButton } from 'react-native-paper'
import BottomSheet from "@gorhom/bottom-sheet";
import { useNewLocationStore } from "../../../../store/mutations/useNewLocationStore";
import { Privacy } from "../../../../types/Location";
import Backdrop from "../../../../components/modals/Backdrop";

const SelectPrivacyBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const privacy = useNewLocationStore(store => store.privacy)
    const setPrivacy = useNewLocationStore(store => store.setPrivacy)
    const visible = useNewLocationStore(store => store.privacyVisible)
    const setVisible = useNewLocationStore(store => store.setPrivacyVisible)

    const handleValueChange = (value: string) => setPrivacy(value as unknown as Privacy)

    const handleClose = () => { 
        if(visible) setVisible(false)
    }

    const handleBackdrop = () => {
        setVisible(false)
        if(ref.current) ref.current.close()
    }

    useEffect(() => {
        if(ref.current){
            if(visible) ref.current.expand();
            if(!visible) ref.current.close();
        }
    },[visible])

    return (
        <BottomSheet 
            ref={ref} 
            index={-1}
            snapPoints={[430]}
            onClose={handleClose}
            enablePanDownToClose={true}
            containerStyle={{ zIndex: 100 }}
            backdropComponent={visible ? (
                () => <Backdrop onPress={handleBackdrop} />
            ) : null}
        >
            <RadioButton.Group value={privacy} onValueChange={handleValueChange}>
                <View>
                    <RadioButton.Item 
                        label={"Public"} 
                        labelVariant={'labelLarge'}
                        labelStyle={styles.label} 
                        value={Privacy.Public}
                    />
                    <Text style={styles.description}>
                        This location is visible to everyone. 
                        User's can bookmark, share, and view it on the map.
                        They can also add images and leave feedback about access and current conditions.
                        Public locations cannot be changed to Private or Friends-only
                    </Text>
                </View>
                <View>
                    <RadioButton.Item 
                        label={"Friends"} 
                        labelVariant={'labelLarge'}
                        labelStyle={styles.label} 
                        value={Privacy.Friends}
                    />
                    <Text style={styles.description}>
                        This location is only visible to the people that you follow.
                        They can bookmark, share, and view it on the map.
                    </Text>
                </View>
                <View>
                    <RadioButton.Item 
                        label={"Private"} 
                        labelVariant={'labelLarge'}
                        labelStyle={styles.label} 
                        value={Privacy.Private}
                    />
                    <Text style={styles.description}>
                        This location is only visible to you.
                        You can change this later if you wish.
                    </Text>
                </View>
            </RadioButton.Group>
        </BottomSheet>
    );
};

export default SelectPrivacyBottomSheet;

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
    },
    description: {
        paddingHorizontal: 16,
        fontSize: 15
    }
});
