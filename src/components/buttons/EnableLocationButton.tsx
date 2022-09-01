import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useCurrentLocation } from '../../hooks/utils/useCurrentLocation'
import { Text, Button } from 'react-native-paper'

interface Props {
    for: 'waterbodies',
    style?: StyleProp<ViewStyle>
}

const EnableLocationButton = (props: Props) => {

    const { getCurrentLocation } = useCurrentLocation()

    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.caption}>
                { props.for === 'waterbodies' ?
                    'Turn on location to see nearby waterbodies':
                    'Turn on location to use this feature'
                } 
            </Text>
            <Button icon='navigation-variant'
                contentStyle={{ flexDirection: 'row-reverse'}}
                theme={{ roundness: 2 }}
                onPress={getCurrentLocation} 
                mode='contained-tonal'
            >Enable Location</Button>
        </View>
    )
}

export default EnableLocationButton

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    caption: {
        fontSize: 14,
        marginVertical: 12,
    }
})