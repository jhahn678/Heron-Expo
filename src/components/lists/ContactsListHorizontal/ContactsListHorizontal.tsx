import React from 'react'
import { StyleSheet } from 'react-native'
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
        <FlashList 
            data={data} 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.content}
            estimatedItemSize={100}
            renderItem={({ item }) => (
                <ContactsListItem 
                    key={item.id} 
                    data={item}
                    onPress={() => onNavigateToProfile(item.id)}
                />
            )}
        />
    )
}

export default ContactsListHorizontal

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 12
    }
})