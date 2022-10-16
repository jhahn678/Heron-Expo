import { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Text, Title } from 'react-native-paper'
import { useMyCatchesModalStore } from "../../../store/modal/useMyCatchesModalStore";
import { useGetMyCatchStatistics } from "../../../hooks/queries/useGetUserCatchStatistics";
import Backdrop from "../Backdrop";

const WaterbodyTotalsBottomSheet = () => {

    const { data } = useGetMyCatchStatistics()
    const ref = useRef<BottomSheet | null>(null)
    const modalVisible = useMyCatchesModalStore(store => store.waterbodyTotalsVisible)
    const setModalVisible = useMyCatchesModalStore(store => store.setWaterbodyTotalsVisible)
    const handleClose = () => { if(modalVisible) setModalVisible(false) }
    const handleBackdrop = () => { handleClose(); if(ref.current) ref.current.close() }

    useEffect(() => {
        if(ref.current && modalVisible) ref.current.expand()
        if(ref.current && !modalVisible) ref.current.close()
    },[modalVisible])

    return (
        <BottomSheet
        ref={ref}
        snapPoints={['35%']}
        containerStyle={{ zIndex: 100 }}
        index={-1}
        enablePanDownToClose={true}
        onClose={handleClose}
        backdropComponent={modalVisible ? (
            () => <Backdrop onPress={handleBackdrop}/>
        ) : null}
        >
            <Title style={styles.title}>All Fisheries</Title>
            <BottomSheetFlatList
            data={data?.me.catch_statistics.waterbody_counts}
            contentContainerStyle={styles.content}
            renderItem={({ item }) => (
                <View style={styles.row} key={item.waterbody.id}>
                    <Text style={styles.waterbody} numberOfLines={1}>{item.waterbody.name}</Text>
                    <View style={styles.line}/>
                    <View style={styles.count}>
                        <Text style={styles.number}>{item.count}</Text>
                        <Text style={styles.label}>caught</Text>
                    </View>
                </View>
            )}
            />
        </BottomSheet>
    );
};

export default WaterbodyTotalsBottomSheet;

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        paddingHorizontal: 24,
        paddingTop: 8
    },
    content: {
        paddingVertical: 24,
        paddingHorizontal: 24,
        alignItems: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    waterbody: {
        fontWeight: '500',
        fontSize: 18,
        maxWidth: '70%'
    },
    count: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
    },
    number: {
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'left',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0,0,0,.2)',
        marginHorizontal: 16
    },
    label: {
        fontWeight: '400',
        fontSize: 12,
        paddingLeft: 4
    }
});
