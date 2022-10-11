import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { IContact } from '../../../types/User'
import ContactsListItem from './ContactsListItem'

interface Props<T> {
    data: T[],
    onNavigateToProfile: (id: number) => void
}

const ContactsListHorizontal = <T extends IContact>({
    data, onNavigateToProfile
}: Props<T>) => {


    return (
        <View style={{ height: 180 }}>
            <FlashList 
                data={data} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.content}
                estimatedItemSize={150}
                renderItem={({ item }) => (
                    <ContactsListItem 
                        key={item.id} 
                        data={item}
                        onPress={() => onNavigateToProfile(item.id)}
                    />
                )}
            />
        </View>
    )
}

export default ContactsListHorizontal

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20
    }
})