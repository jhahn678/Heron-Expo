import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ExploreStackScreenProps } from '../../types/navigation'

const WaterbodyScreen = (props: ExploreStackScreenProps<'WaterbodyScreen'>): JSX.Element => {
  
    return (
        <View style={styles.container}>
            <Text>WaterbodyScreen</Text>
        </View>
    )
}

export default WaterbodyScreen

const styles = StyleSheet.create({
    container: {

    }
})