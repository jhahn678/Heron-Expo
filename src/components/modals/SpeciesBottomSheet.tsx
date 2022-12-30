import Backdrop from './Backdrop'
import IceFishing from '../svg/IceFishing';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from "react-native";
import { Title, Text } from 'react-native-paper';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import SpeciesBottomSheetLoader from '../loaders/SpeciesBottomSheetLoader';
import { useBottomSheetStore } from '../../store/modal/useBottomSheetStore';
import { useLazyGetWaterbodySpecies } from '../../hooks/queries/useGetWaterbodySpecies';


const SpeciesBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const setSpeciesRef = useBottomSheetStore(state => state.setSpeciesRef)
    const visible = useBottomSheetStore(state => state.isSpeciesOpen)
    const handleClose = useBottomSheetStore(state => state.closeSpecies)
    const waterbody = useBottomSheetStore(state => state.waterbody)
    const [fetchSpecies, { data }] = useLazyGetWaterbodySpecies()

    useEffect(() => {
        if(waterbody) fetchSpecies({ variables: { id: waterbody }})
    },[waterbody])

    useEffect(() => {
        setSpeciesRef(ref)
    },[ref])

    if(!visible) return null;

    return (
        <BottomSheet 
            ref={ref} 
            snapPoints={[400]}
            onClose={handleClose}
            enablePanDownToClose={true}
            containerStyle={{ zIndex: 100 }}
            style={{ paddingHorizontal: 16 }}
            backdropComponent={visible ? (
                () => <Backdrop onPress={handleClose}/>
            ) : null}
        >
        { 
            data ? 
            <>
                <Title style={styles.subtitle}>{data?.waterbody.all_species.length} species reported at</Title>
                <Title style={styles.title}>{data?.waterbody.name}</Title>
                <BottomSheetScrollView contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}>
                { data.waterbody.all_species.length > 0 ?  
                        data.waterbody.all_species.map(x => (
                            <View style={styles.row} key={`${x.species}${x.count}`}>
                                <Text style={styles.species}>{x.species}</Text>
                                <View style={styles.line}/>
                                <View style={styles.count}>
                                    <Text style={styles.number}>{x.count}</Text>
                                    <Text style={styles.label}>caught</Text>
                                </View>
                            </View>
                        ))
                    : <IceFishing style={{ alignSelf: 'center', marginTop: 32 }}/>
                }
                </BottomSheetScrollView>
            </> 
            : <SpeciesBottomSheetLoader/>
        }
        </BottomSheet>
    )
}

export default SpeciesBottomSheet;

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: 28,
        marginBottom: 12
    },
    subtitle: {
        fontWeight: '400',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    species: {
        fontWeight: '500',
        fontSize: 18,
    },
    count: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        paddingRight: 24,
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
})