import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Title } from "react-native-paper";
import SelectableItem from "../../lists/shared/SelectableItem";
import Backdrop from "../Backdrop";
import { useMyLocationsModalStore } from "../../../store/modal/useMyLocationsModalStore";
import { LocationSort } from "../../../types/Location";

const FilterSortBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const [backdrop, setBackdrop] = useState(false)
    const sort = useMyLocationsModalStore(store => store.sort)
    const setSort = useMyLocationsModalStore(store => store.setSort)
    const modalVisible = useMyLocationsModalStore(store => store.sortVisible)
    const setModalVisible = useMyLocationsModalStore(store => store.setSortVisible)

    const handleBackdrop = () => { setBackdrop(false); if(ref.current) ref.current.close() }
    const handleClose = () => { setBackdrop(false); setModalVisible(false) }

    useEffect(() => {
        if(ref.current && modalVisible) {
            setBackdrop(true)
            ref.current.expand()
        }
    },[modalVisible])

    return (
        <BottomSheet
            ref={ref}
            snapPoints={['30%']}
            index={-1}
            containerStyle={{ zIndex: 100 }}
            enablePanDownToClose={true}
            onClose={handleClose}
            backdropComponent={backdrop ? (
                () => <Backdrop onPress={handleBackdrop} />
            ) : null}
        >
            <Title style={styles.title}>Shared With</Title>
            <View style={styles.content}>
                <SelectableItem 
                    label={'Most Recent'}
                    activeValues={[sort]}
                    value={LocationSort.CreatedAtNewest} 
                    onPress={() => setSort(LocationSort.CreatedAtNewest)}
                />
                <SelectableItem 
                    label={'Oldest'}
                    activeValues={[sort]}
                    value={LocationSort.CreatedAtOldest}  
                    onPress={() => setSort(LocationSort.CreatedAtOldest)}
                />
                <SelectableItem 
                    label={'Most Recommended'}
                    activeValues={[sort]}
                    value={LocationSort.MostRecommended} 
                    onPress={() => setSort(LocationSort.MostRecommended)}
                />
            </View>

        </BottomSheet>
    );
};

export default FilterSortBottomSheet;

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

