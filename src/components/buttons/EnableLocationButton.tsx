import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useCurrentLocation } from '../../hooks/utils/useCurrentLocation'
import { Text, Button, useTheme } from 'react-native-paper'

interface Props {
    for: 'waterbodies',
    style?: StyleProp<ViewStyle>
}

const EnableLocationButton = (props: Props) => {

    const { getCurrentLocation } = useCurrentLocation()
    const { colors } = useTheme()

    return (
        <View style={[styles.container, { shadowColor: colors.backdrop, }, props.style]}>
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
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 3,
        shadowOffset: { height: 2, width: 0 }, 
        shadowRadius: 2, 
        shadowOpacity: .2,
        borderRadius: 12,
        justifyContent: 'center',
        padding: 32
    },
    caption: {
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
    }
})