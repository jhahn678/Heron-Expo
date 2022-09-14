import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Button } from 'react-native-paper'

interface Props {
    /** Callback to navigate to list screen */
    onPress: () => void
    style?: StyleProp<ViewStyle>
}

const ListFooterSeeMore = ({ onPress, style }: Props) => {
    return (
        <View style={[styles.container, style]}>
            <Button 
                icon='arrow-right'
                onPress={onPress}
                contentStyle={styles.content}
            >See More</Button>
        </View>
    )
}

export default ListFooterSeeMore

const styles = StyleSheet.create({
    container: {
        height: '90%',
        justifyContent: 'center',
        marginRight: 50
    },
    content: { 
        flexDirection: 'row-reverse',
        alignSelf: 'center'
    }
})