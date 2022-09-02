import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-paper'

interface Props {
    /** Callback to navigate to list screen */
    onPress: () => void
}

const ListFooterSeeMore = ({ onPress }: Props) => {
    return (
        <View style={styles.container}>
            <Button icon='arrow-right'>See More</Button>
        </View>
    )
}

export default ListFooterSeeMore

const styles = StyleSheet.create({
    container: {

    }
})