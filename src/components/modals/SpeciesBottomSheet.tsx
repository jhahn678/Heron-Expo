import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Backdrop from './Backdrop'
import { useBottomSheetStore } from '../../store/modal/useBottomSheetStore';
import { useLazyGetWaterbodySpecies } from '../../hooks/queries/useGetWaterbodySpecies';
import { Title, Text } from 'react-native-paper';
import IceFishing from '../svg/IceFishing';
import SpeciesBottomSheetLoader from '../loaders/SpeciesBottomSheetLoader';


const SpeciesBottomSheet = () => {

    const ref = useRef<BottomSheet | null>(null)
    const setSpeciesRef = useBottomSheetStore(state => state.setSpeciesRef)
    const isSpeciesOpen = useBottomSheetStore(state => state.isSpeciesOpen)
    const closeSpecies = useBottomSheetStore(state => state.closeSpecies)
    const waterbody = useBottomSheetStore(state => state.waterbody)
    const [fetchSpecies, { data }] = useLazyGetWaterbodySpecies()

    useEffect(() => {
        if(waterbody) fetchSpecies({ variables: { id: waterbody }})
    },[waterbody])

    useEffect(() => {
        setSpeciesRef(ref)
    },[ref])

    return (
        <BottomSheet 
            style={{ paddingHorizontal: 16 }}
            snapPoints={['40%']} index={-1} 
            ref={ref} onClose={closeSpecies}
            enablePanDownToClose={true}
            backdropComponent={isSpeciesOpen ? (
                () => <Backdrop onPress={closeSpecies}/>
            ) : null}
        >
        { 
            data ? 
            <>
                <Title style={styles.subtitle}>{data?.waterbody.all_species.length} species reported at</Title>
                <Title style={styles.title}>{data?.waterbody.name}</Title>
                <BottomSheetScrollView contentContainerStyle={{ paddingTop: 16, paddingBottom: 16}}>
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