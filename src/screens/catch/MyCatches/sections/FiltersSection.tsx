import { gql, useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import FishIcon from "../../../../components/icons/FishIcon";
import { useMyCatchesModalStore } from "../../../../store/modal/useMyCatchesModalStore"
import { dateRangeToLabel } from "../../../../utils/conversions/dateRangeToLabel";
import { lengthRangeToLabel } from "../../../../utils/conversions/lengthRangeToLabel";
import { weightRangeToLabel } from "../../../../utils/conversions/weightRangeToLabel";

const WATERBODY_NAME = gql`
    fragment WaterbodyName on Waterbody{
        name
    }
`

const FiltersSection = () => {

    const cache = useApolloClient()

    const minDate = useMyCatchesModalStore(store => store.minDate)
    const maxDate = useMyCatchesModalStore(store => store.maxDate)
    const minLength = useMyCatchesModalStore(store => store.minLength)
    const maxLength = useMyCatchesModalStore(store => store.maxLength)
    const minWeight = useMyCatchesModalStore(store => store.minWeight)
    const maxWeight = useMyCatchesModalStore(store => store.maxWeight)
    const species = useMyCatchesModalStore(store => store.species)
    const waterbody = useMyCatchesModalStore(store => store.waterbody)
    const setDateVisible = useMyCatchesModalStore(store => store.setDateVisible)
    const setWeightVisible  = useMyCatchesModalStore(store => store.setWeightVisible)
    const setLengthVisible = useMyCatchesModalStore(store => store.setLengthVisible)
    const setSpeciesVisible = useMyCatchesModalStore(store => store.setSpeciesVisible)
    const setWaterbodyVisible = useMyCatchesModalStore(store => store.setWaterbodyVisible)
    const reset = useMyCatchesModalStore(store => store.reset)

    const [dateLabel, setDateLabel] = useState('Date')
    useEffect(() => setDateLabel(dateRangeToLabel(minDate, maxDate)),[minDate, maxDate])
    const [speciesLabel, setSpeciesLabel] = useState('Species')
    useEffect(() => setSpeciesLabel(species ? species.join(', ') : 'Species'), [species])
    const [waterbodyLabel, setWaterbodyLabel] = useState('Waterbody')
    useEffect(() => {
        if(!waterbody) return setWaterbodyLabel('Waterbody')
        const names = waterbody.map(x => {
            return cache.readFragment({
                id: `Waterbody:${x}`,
                fragment: WATERBODY_NAME
            }).name;
        })
        setWaterbodyLabel(names.join(', '))
    }, [waterbody])
    const [weightLabel, setWeightLabel] = useState('Weight')
    useEffect(() => setWeightLabel(weightRangeToLabel(minWeight, maxWeight)),[minWeight, maxWeight])
    const [lengthLabel, setLengthLabel] = useState('Length')
    useEffect(() => setLengthLabel(lengthRangeToLabel(minLength, maxLength)), [minLength, maxLength])

    return (
        <ScrollView 
        horizontal 
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false} 
        >
            { (minLength || maxLength || minWeight || maxWeight || minDate || maxDate || waterbody || species) &&
                <Chip 
                    onPress={reset} 
                    style={styles.chip} 
                    icon='filter-variant-remove'
                >Clear All</Chip>
            }
            <Chip 
                onPress={setDateVisible} 
                style={styles.chip} 
                icon='calendar-range'
            >{dateLabel}</Chip>
            <Chip 
                onPress={setSpeciesVisible} 
                style={styles.chip} 
                icon={({ size, color }) => (
                    <FishIcon size={size+2} color={color}/>
                )}
            >{speciesLabel}</Chip>
            <Chip 
                onPress={setWaterbodyVisible} 
                style={styles.chip} 
                icon='map-marker'
            >{waterbodyLabel}</Chip>
            <Chip 
                onPress={setLengthVisible} 
                style={styles.chip} 
                icon='ruler'
            >{lengthLabel}</Chip>
            <Chip 
                onPress={setWeightVisible} 
                style={styles.chip} 
                icon='scale'
            >{weightLabel}</Chip>
        </ScrollView>
    );
};

export default FiltersSection;

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginBottom: 24,
        paddingLeft: 16,
        paddingRight: 4
    },
    chip: {
        height: 40,
        marginRight: 12,
        marginBottom: 0
    }
});
