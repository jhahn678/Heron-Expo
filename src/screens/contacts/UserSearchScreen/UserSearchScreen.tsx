import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Searchbar, Surface, Text } from 'react-native-paper'
import { theme } from '../../../config/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RootStackScreenProps } from '../../../types/navigation'
import { FlashList } from '@shopify/flash-list'
import { useSearchUsers } from '../../../hooks/queries/useSearchUsers'
import { useThrottleInputValue } from '../../../hooks/utils/useThrottleInputValue'
import ContactsListItem from '../../../components/lists/ContactsList/ContactsListItem'
import NoImagesUploaded from '../../../components/lists/shared/NoImagesUploaded'

const SearchUsersScreen = ({ navigation }: RootStackScreenProps<'UserSearchScreen'>) => {
    
    const [input, setInput] = useState('')
    const throttled = useThrottleInputValue({ input })
    const { data, isLoading, isError } = useSearchUsers(throttled)

    const navigateUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

    return (
        <View style={styles.container}>
            <Surface style={styles.header}>
                <Text style={styles.text}>Search Users</Text>
                <Searchbar 
                    value={input} 
                    autoFocus={true}
                    style={styles.search}
                    onChangeText={setInput} 
                    theme={{ roundness: 6 }}
                    placeholder={'Search by username'}
                    icon={(args) => (
                        <Icon 
                            {...args}
                            name="arrow-left"  
                            onPress={navigation.goBack}
                        />
                    )}
                />
            </Surface>
            { data ? data.length > 0 ?
                <FlashList 
                    data={data} 
                    estimatedItemSize={90}
                    renderItem={({ item }) => (
                        <ContactsListItem data={item} navigateUser={navigateUser(item.id)}/>
                    )} 
                />
                : input.length === 0 ?
                    <Text style={styles.caption}>Find a user by username</Text>
                :   <Text style={styles.caption}>No users found</Text>
                : isLoading ? 
                    <ActivityIndicator size={48} style={styles.loading}/> 
                : isError ? 
                    <NoImagesUploaded caption={'Error loading results'} style={styles.empty}/>
                : null
            }
        </View>
    )
}

export default SearchUsersScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    header: {
        height: 170,
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
        paddingBottom: 24
    },
    text: {
        fontWeight: '600',
        fontSize: 24,
        marginBottom: 16
    },
    back: {
        marginRight: 16
    },
    search: {
        backgroundColor: theme.colors.surfaceVariant,
    },
    loading: {
        marginTop: 64
    },
    empty: {
        position: 'relative',
        bottom: 150,
    },
    caption: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 24,
        marginLeft: 16
    }
})