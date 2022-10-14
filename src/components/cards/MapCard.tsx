import { Pressable, StyleSheet, Image, StyleProp, ViewStyle, Dimensions } from "react-native";
import React from "react";
import { Button, Surface } from "react-native-paper";
const { width } = Dimensions.get('screen')

interface Props {
    navigateToMap: () => void
    uri: string | undefined
    style?: StyleProp<ViewStyle>

}

const MapCard = ({ navigateToMap, uri, style }: Props) => {
  return (
    <Pressable onPress={navigateToMap} style={[styles.surface, style]}>
        <Surface style={{ borderRadius: 12 }}>
            <Image source={{ uri }} style={styles.image} />
            <Button 
                icon={'map'} 
                style={styles.button} 
                mode='contained-tonal'
                theme={{ roundness: 2 }}
                contentStyle={{ flexDirection: 'row-reverse' }}
            >View in Map</Button>
        </Surface>
    </Pressable>
  );
};

export default MapCard;

const styles = StyleSheet.create({
surface: {
    height: 230,
    width: width * .8
},
image: {
    height: '100%',
    width: '100%',
    backgroundColor: '#d9d9d9',
    borderRadius: 12
},
button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 16,
    borderRadius: 12,
    width: width * .65
}
});
