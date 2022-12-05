import React from 'react'
import { Button, Text } from 'react-native-paper'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UseNavigateParams } from '../../types/navigation'

const DEFAULT_MESSAGE = "Add other users to see where they're fishing and what they're catching 🎣"

interface Props {
    label?: string
    style?: StyleProp<ViewStyle>
}

const NavigateToUserSearch = ({
    label, style
}: Props): JSX.Element => {

    const navigation = useNavigation<UseNavigateParams>()

    // @ts-ignore
    const handlePress = () => navigation.navigate('UserSearchScreen')

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label || DEFAULT_MESSAGE}</Text>
            <Button mode='text'
                icon='arrow-right'
                onPress={handlePress} 
                contentStyle={{ flexDirection: 'row-reverse' }}
            >Start connecting</Button>
        </View>
    )
}

export default NavigateToUserSearch

const styles = StyleSheet.create({
    container: {
        width: '85%',
        marginTop: 12,
        alignItems: 'center',
        paddingHorizontal: '3%',
        alignSelf: 'center'
    },
    label: {
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 4,
        lineHeight: 22
    },
})