import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { MyPlacesTabsScreenProps } from "../../../types/navigation";
import SavedLocationsSection from "./sections/SavedLocationsSection";
import SavedWaterbodiesSections from "./sections/SavedWaterbodiesSections";

interface Props {
    navigation: MyPlacesTabsScreenProps<'MySavedPlaces'>['navigation']
}

const SavedPlacesTabView = ({ navigation }: Props) => {
  
    
  
    return (
        <ScrollView style={styles.container}>
            <SavedLocationsSection/>
            <SavedWaterbodiesSections/>
        </ScrollView>
    );
};

export default SavedPlacesTabView;

const styles = StyleSheet.create({
    container: {

    }
});
