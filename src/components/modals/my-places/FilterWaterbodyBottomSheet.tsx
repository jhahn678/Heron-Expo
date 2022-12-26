import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList }  from "@gorhom/bottom-sheet";
import { Title, Text } from "react-native-paper";
import SelectableItem from "../../lists/shared/SelectableItem";
import Backdrop from "../Backdrop";
import { useMyLocationsModalStore } from "../../../store/modal/useMyLocationsModalStore";
import { useGetMyLocationStatistics } from "../../../hooks/queries/useGetUserLocationsStatistics";

const FilterWaterbodyBottomSheet = () => {

    const { data } = useGetMyLocationStatistics()  
    const ref = useRef<BottomSheet | null>(null)
    const setModalVisible = useMyLocationsModalStore(store => store.setWaterbodyVisible)
    const setWaterbody = useMyLocationsModalStore(store => store.setWaterbody)
    const waterbodies = useMyLocationsModalStore(store => store.waterbody)
    const modalVisible = useMyLocationsModalStore(store => store.waterbodyVisible)

    const handleBackdrop = () => { setModalVisible(false); if(ref.current) ref.current.close() }
    const handleClose = () => setModalVisible(false)
    const handleSelect = (value: number) => () => setWaterbody(value)

    useEffect(() => {
        if(ref.current && modalVisible) ref.current.expand()
    },[modalVisible])

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={['35%']}
            onClose={handleClose}
            enablePanDownToClose={true}
            containerStyle={{ zIndex: 100 }}
            backdropComponent={modalVisible ? (
                () => <Backdrop onPress={handleBackdrop}/>
            ) : null}
        >
            <Title style={styles.title}>Waterbodies</Title>
            { data && data.me.location_statistics.waterbody_counts ?
                <BottomSheetFlatList
                    contentContainerStyle={styles.content}
                    data={data.me.location_statistics.waterbody_counts}
                    renderItem={({ item }) => (
                        <SelectableItem 
                            key={item.waterbody.id} 
                            label={item.waterbody.name}
                            value={item.waterbody.id} 
                            activeValues={waterbodies}
                            onPress={handleSelect(item.waterbody.id)}
                        />
                    )}
                />
            : <Text style={styles.empty}>No Saved Locations Available</Text>}

        </BottomSheet>
    );
};

export default FilterWaterbodyBottomSheet;

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        paddingHorizontal: 24,
    },
    content: {
        paddingVertical: 16,
        paddingHorizontal: 8
    },
    empty: {
        fontWeight: '500',
        fontStyle: 'italic',
        marginLeft: 24,
        marginTop: 16
    }
});

