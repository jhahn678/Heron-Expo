import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootStackScreenProps } from '../../types/navigation'

interface Props {
    navigation: RootStackScreenProps<'ViewLocationScreen'>['navigation']
}

const ViewLocationScreen = ({ navigation }: Props) => {
    
    return (
        <View>
            <Text>ViewLocaitonScreen</Text>
        </View>
    )
}

export default ViewLocationScreen

const styles = StyleSheet.create({})