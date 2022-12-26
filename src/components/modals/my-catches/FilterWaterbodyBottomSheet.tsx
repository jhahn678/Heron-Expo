import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList }  from "@gorhom/bottom-sheet";
import { useMyCatchesModalStore } from "../../../store/modal/useMyCatchesModalStore";
import { Title, Text } from "react-native-paper";
import SelectableItem from "../../lists/shared/SelectableItem";
import { useGetMyCatchWaterbodies } from "../../../hooks/queries/useGetUserCatchStatistics";
import Backdrop from "../Backdrop";

const FilterWaterbodyBottomSheet = () => {

    const { data } = useGetMyCatchWaterbodies()
    const ref = useRef<BottomSheet | null>(null)

    const setModalVisible = useMyCatchesModalStore(store => store.setWaterbodyVisible)
    const setWaterbody = useMyCatchesModalStore(store => store.setWaterbody)
    const waterbodies = useMyCatchesModalStore(store => store.waterbody)
    const modalVisible = useMyCatchesModalStore(store => store.waterbodyVisible)

    const handleClose = () => setModalVisible(false)
    const handleSelect = (value: number) => () => setWaterbody(value)
    const handleBackdrop = () => { setModalVisible(false); if(ref.current) ref.current.close() }

    useEffect(() => {
        if(ref.current && modalVisible) ref.current.expand()
    },[modalVisible])

    return (
        <BottomSheet
            ref={ref}
            snapPoints={['30%']}
            containerStyle={{ zIndex: 100 }}
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
                : <Text style={styles.empty}>No Waterbodies Available</Text>
            }

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

