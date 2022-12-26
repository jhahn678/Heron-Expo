import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { RadioButton, Title } from "react-native-paper";
import Backdrop from "../Backdrop";
import { useMyLocationsModalStore } from "../../../store/modal/useMyLocationsModalStore";
import { LocationSort } from "../../../types/Location";

const FilterSortBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const sort = useMyLocationsModalStore(store => store.sort)
    const setSort = useMyLocationsModalStore(store => store.setSort)
    const modalVisible = useMyLocationsModalStore(store => store.sortVisible)
    const setModalVisible = useMyLocationsModalStore(store => store.setSortVisible)

    const handleChange = (value: string) => setSort(value as unknown as LocationSort)
    const handleBackdrop = () => { setModalVisible(false); if(ref.current) ref.current.close() }
    const handleClose = () => setModalVisible(false)

    useEffect(() => {
        if(ref.current && modalVisible) ref.current.expand()
    },[modalVisible])

    return (
        <BottomSheet
            ref={ref}
            snapPoints={['32%']}
            index={-1}
            style={{ paddingHorizontal: 4 }}
            containerStyle={{ zIndex: 100 }}
            enablePanDownToClose={true}
            onClose={handleClose}
            backdropComponent={modalVisible ? (
                () => <Backdrop onPress={handleBackdrop} />
            ) : null}
        >
            <Title style={styles.title}>Shared With</Title>
            <RadioButton.Group value={sort} onValueChange={handleChange}>
                <RadioButton.Item
                    label={'Most Recent'}
                    value={LocationSort.CreatedAtNewest} 
                    labelVariant={'labelLarge'}
                    labelStyle={{ fontSize: 16}}
                />
                <RadioButton.Item
                    label={'Oldest'}
                    value={LocationSort.CreatedAtOldest} 
                    labelVariant={'labelLarge'}
                    labelStyle={{ fontSize: 16}}
                />
                <RadioButton.Item
                    label={'Most Recommended'}
                    value={LocationSort.MostRecommended} 
                    labelVariant={'labelLarge'}
                    labelStyle={{ fontSize: 16}}
                />
            </RadioButton.Group>

        </BottomSheet>
    );
};

export default FilterSortBottomSheet;

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        paddingHorizontal: 16,
        marginBottom: 12
    },
});

