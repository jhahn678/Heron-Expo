import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList }  from "@gorhom/bottom-sheet";
import { useMyCatchesModalStore } from "../../../store/modal/useMyCatchesModalStore";
import { Title } from "react-native-paper";
import SelectableItem from "../../lists/shared/SelectableItem";
import { useGetMyCatchWaterbodies } from "../../../hooks/queries/useGetUserCatchStatistics";

const FilterWaterbodyBottomSheet = () => {

    const { data, loading, error } = useGetMyCatchWaterbodies()
    const ref = useRef<BottomSheet | null>(null)
    const setModalVisible = useMyCatchesModalStore(store => store.setWaterbodyVisible)
    const handleClose = () => setModalVisible(false)
    const setWaterbody = useMyCatchesModalStore(store => store.setWaterbody)
    const handleSelect = (value: number) => () => setWaterbody(value)
    const modalVisible = useMyCatchesModalStore(store => store.waterbodyVisible)

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
        >
            <Title style={styles.title}>Waterbodies</Title>
            { data && data.me.catch_statistics.all_waterbodies ?
                <BottomSheetFlatList
                    contentContainerStyle={styles.content}
                    data={data.me.catch_statistics.all_waterbodies}
                    renderItem={({ item }) => (
                        <SelectableItem 
                            key={item.id} 
                            label={item.name}
                            value={item.id} 
                            onPress={handleSelect(item.id)}
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

