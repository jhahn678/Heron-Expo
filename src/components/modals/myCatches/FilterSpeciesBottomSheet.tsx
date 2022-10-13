import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList }  from "@gorhom/bottom-sheet";
import { useMyCatchesModalStore } from "../../../store/modal/useMyCatchesModalStore";
import { Title } from "react-native-paper";
import SelectableItem from "../../lists/shared/SelectableItem";
import { useGetMyCatchStatistics } from "../../../hooks/queries/useGetUserCatchStatistics";
import Backdrop from "../Backdrop";

const FilterSpeciesBottomSheet = () => {

    const { data } = useGetMyCatchStatistics()
    const ref = useRef<BottomSheet | null>(null)
    const setModalVisible = useMyCatchesModalStore(store => store.setSpeciesVisible)
    const handleClose = () => setModalVisible(false)
    const handleBackdrop = () => { setModalVisible(false); if(ref.current) ref.current.close() }
    const setSpecies = useMyCatchesModalStore(store => store.setSpecies)
    const species = useMyCatchesModalStore(store => store.species)
    const handleSelect = (value: string) => () => setSpecies(value)
    const modalVisible = useMyCatchesModalStore(store => store.speciesVisible)

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
            <Title style={styles.title}>Species</Title>
            { data && data.me.catch_statistics.species_counts ?
                <BottomSheetFlatList
                    contentContainerStyle={styles.content}
                    data={data.me.catch_statistics.species_counts.map(x => x.species)}
                    renderItem={({ item }) => (
                        <SelectableItem 
                            key={item} 
                            value={item} 
                            activeValues={species}
                            onPress={handleSelect(item)}
                        />
                    )}
                />
            : null}

        </BottomSheet>
    );
};

export default FilterSpeciesBottomSheet;

const styles = StyleSheet.create({
    title: {
        marginLeft: 24,
        fontWeight: '600'
    },
    content: {
        paddingVertical: 16,
        paddingHorizontal: 8
    }
});
