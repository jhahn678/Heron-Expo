import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList }  from "@gorhom/bottom-sheet";
import { Title } from "react-native-paper";
import SelectableItem from "../../lists/shared/SelectableItem";
import { useGetMyCatchWaterbodies } from "../../../hooks/queries/useGetUserCatchStatistics";
import Backdrop from "../Backdrop";
import { useMyLocationsModalStore } from "../../../store/modal/useMyLocationsModalStore";

const FilterWaterbodyBottomSheet = () => {

    const { data } = useGetMyCatchWaterbodies() // needs changed
    const ref = useRef<BottomSheet | null>(null)

    const setModalVisible = useMyLocationsModalStore(store => store.setWaterbodyVisible)
    const setWaterbody = useMyLocationsModalStore(store => store.setWaterbody)
    const waterbodies = useMyLocationsModalStore(store => store.waterbody)
    const modalVisible = useMyLocationsModalStore(store => store.waterbodyVisible)

    const handleBackdrop = () => { if(ref.current) ref.current.close() }
    const handleClose = () => setModalVisible(false)
    const handleSelect = (value: number) => () => setWaterbody(value)

    useEffect(() => {
        if(ref.current && modalVisible) ref.current.expand()
    },[modalVisible])

    return (
        <BottomSheet
            ref={ref}
            snapPoints={['30%']}
            index={-1}
            enablePanDownToClose={true}
            onClose={handleClose}
            backdropComponent={modalVisible ? (
                () => <Backdrop onPress={handleBackdrop}/>
            ) : null}
        >
            <Title style={styles.title}>Waterbodies</Title>
            { data && data.me.catch_statistics.waterbody_counts ?
                <BottomSheetFlatList
                    contentContainerStyle={styles.content}
                    data={data.me.catch_statistics.waterbody_counts}
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
            : null}

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
    }
});

